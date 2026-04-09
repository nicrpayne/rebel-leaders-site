import { useState } from "react";
import { trpc } from "@/lib/trpc";
import RichTextEditor from "@/components/wall/RichTextEditor";
import ZoomableImage from "@/components/wall/ZoomableImage";

type Tab = "submissions" | "walls";

export default function WallAdmin() {
  const [secret, setSecret] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("submissions");
  const [selectedWallId, setSelectedWallId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWall, setNewWall] = useState({ title: "", promptText: "", description: "" });
  const [createResult, setCreateResult] = useState<{ wallCode: string; shareableUrl: string } | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  const verify = trpc.wall.adminVerify.useMutation();
  const { data: walls = [], refetch: refetchWalls } = trpc.wall.adminGetWalls.useQuery(
    { secret },
    { enabled: authenticated }
  );
  const { data: submissions = [], refetch: refetchSubmissions } = trpc.wall.adminGetSubmissions.useQuery(
    { secret, wallId: selectedWallId ?? undefined, status: "pending" },
    { enabled: authenticated }
  );
  const approve = trpc.wall.adminApproveSubmission.useMutation({ onSuccess: () => refetchSubmissions() });
  const reject = trpc.wall.adminRejectSubmission.useMutation({ onSuccess: () => refetchSubmissions() });
  const createWall = trpc.wall.adminCreateWall.useMutation({
    onSuccess: (data) => {
      setCreateResult(data);
      setNewWall({ title: "", promptText: "", description: "" });
      setShowCreateForm(false);
      refetchWalls();
    },
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(false);
    try {
      await verify.mutateAsync({ secret });
      setAuthenticated(true);
    } catch {
      setAuthError(true);
    }
  }

  function handleCreateSubmit(e: React.FormEvent) {
    e.preventDefault();
    createWall.mutate({
      secret,
      title: newWall.title,
      promptText: newWall.promptText || undefined,
      description: newWall.description || undefined,
    });
  }

  async function handleBulkApprove() {
    setIsBulkProcessing(true);
    for (const id of Array.from(selectedIds)) {
      await approve.mutateAsync({ secret, submissionId: id });
    }
    setSelectedIds(new Set());
    setIsBulkProcessing(false);
    refetchSubmissions();
  }

  async function handleBulkReject() {
    setIsBulkProcessing(true);
    for (const id of Array.from(selectedIds)) {
      await reject.mutateAsync({ secret, submissionId: id });
    }
    setSelectedIds(new Set());
    setIsBulkProcessing(false);
    refetchSubmissions();
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
          <p className="text-white font-mono text-sm font-bold">WALL ADMIN</p>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className="bg-gray-800 text-white px-3 py-2 text-sm font-mono border border-gray-600 focus:outline-none focus:border-white"
            autoFocus
          />
          {authError && <p className="text-red-400 text-xs font-mono">Invalid secret</p>}
          <button
            type="submit"
            disabled={verify.isPending}
            className="bg-white text-black px-4 py-2 text-sm font-mono font-bold hover:bg-gray-200 disabled:opacity-50"
          >
            {verify.isPending ? "VERIFYING..." : "LOGIN"}
          </button>
        </form>
      </div>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  const pendingCount = submissions.length;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-mono">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
        <p className="text-sm font-bold">WALL ADMIN</p>
        <button
          onClick={() => setAuthenticated(false)}
          className="text-xs text-gray-400 hover:text-white"
        >
          LOGOUT
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-6 py-3 text-sm ${activeTab === "submissions" ? "border-b-2 border-white text-white" : "text-gray-500 hover:text-white"}`}
        >
          SUBMISSIONS {pendingCount > 0 && `(${pendingCount})`}
        </button>
        <button
          onClick={() => setActiveTab("walls")}
          className={`px-6 py-3 text-sm ${activeTab === "walls" ? "border-b-2 border-white text-white" : "text-gray-500 hover:text-white"}`}
        >
          WALLS ({walls.length})
        </button>
      </div>

      <div className="px-6 py-6">
        {/* ── Submissions tab ── */}
        {activeTab === "submissions" && (
          <div>
            {/* Wall filter */}
            <div className="flex gap-2 mb-4 flex-wrap">
              <button
                onClick={() => { setSelectedWallId(null); setSelectedIds(new Set()); }}
                className={`px-3 py-1 text-xs border ${selectedWallId === null ? "border-white text-white" : "border-gray-600 text-gray-400 hover:border-white hover:text-white"}`}
              >
                ALL
              </button>
              {walls.map((w) => (
                <button
                  key={w.id}
                  onClick={() => { setSelectedWallId(w.id); setSelectedIds(new Set()); }}
                  className={`px-3 py-1 text-xs border ${selectedWallId === w.id ? "border-white text-white" : "border-gray-600 text-gray-400 hover:border-white hover:text-white"}`}
                >
                  {w.wallCode}
                </button>
              ))}
            </div>

            {submissions.length === 0 ? (
              <p className="text-gray-500 text-sm">No pending submissions.</p>
            ) : (
              <>
                {/* Bulk controls */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-800">
                  <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === submissions.length}
                      onChange={(e) =>
                        setSelectedIds(e.target.checked ? new Set(submissions.map((s) => s.id)) : new Set())
                      }
                      className="accent-white"
                    />
                    SELECT ALL
                  </label>
                  {selectedIds.size > 0 && (
                    <>
                      <button
                        onClick={handleBulkApprove}
                        disabled={isBulkProcessing}
                        className="px-3 py-1 text-xs bg-green-800 hover:bg-green-700 disabled:opacity-50"
                      >
                        APPROVE SELECTED ({selectedIds.size})
                      </button>
                      <button
                        onClick={handleBulkReject}
                        disabled={isBulkProcessing}
                        className="px-3 py-1 text-xs bg-red-900 hover:bg-red-800 disabled:opacity-50"
                      >
                        REJECT SELECTED ({selectedIds.size})
                      </button>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`border p-3 flex flex-col gap-2 ${selectedIds.has(sub.id) ? "border-white" : "border-gray-700"}`}
                    >
                      <div className="relative w-full aspect-square bg-gray-900">
                        <ZoomableImage
                          src={sub.imageUrl}
                          alt=""
                          className="w-full h-full"
                        />
                        <input
                          type="checkbox"
                          checked={selectedIds.has(sub.id)}
                          onChange={() => toggleSelect(sub.id)}
                          className="absolute top-1 left-1 accent-white w-4 h-4 z-20"
                        />
                      </div>
                      <p className="text-xs text-gray-400">
                        {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : "—"}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approve.mutate({ secret, submissionId: sub.id })}
                          disabled={approve.isPending || isBulkProcessing}
                          className="flex-1 py-1 text-xs bg-green-800 hover:bg-green-700 disabled:opacity-50"
                        >
                          APPROVE
                        </button>
                        <button
                          onClick={() => reject.mutate({ secret, submissionId: sub.id })}
                          disabled={reject.isPending || isBulkProcessing}
                          className="flex-1 py-1 text-xs bg-red-900 hover:bg-red-800 disabled:opacity-50"
                        >
                          REJECT
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* ── Walls tab ── */}
        {activeTab === "walls" && (
          <div>
            <button
              onClick={() => { setShowCreateForm(!showCreateForm); setCreateResult(null); }}
              className="mb-6 px-4 py-2 text-sm border border-white hover:bg-white hover:text-black"
            >
              {showCreateForm ? "CANCEL" : "CREATE NEW WALL"}
            </button>

            {/* Create form */}
            {showCreateForm && (
              <form onSubmit={handleCreateSubmit} className="mb-8 flex flex-col gap-3 max-w-lg border border-gray-700 p-4">
                <p className="text-sm font-bold">NEW WALL</p>
                <input
                  type="text"
                  placeholder="Title (required)"
                  required
                  value={newWall.title}
                  onChange={(e) => setNewWall({ ...newWall, title: e.target.value })}
                  className="bg-gray-800 text-white px-3 py-2 text-sm border border-gray-600 focus:outline-none focus:border-white"
                />
                <textarea
                  placeholder="Prompt text (the reflection question shown to users)"
                  rows={3}
                  value={newWall.promptText}
                  onChange={(e) => setNewWall({ ...newWall, promptText: e.target.value })}
                  className="bg-gray-800 text-white px-3 py-2 text-sm border border-gray-600 focus:outline-none focus:border-white resize-none"
                />
                <RichTextEditor
                  content={newWall.description}
                  onChange={(val) => setNewWall({ ...newWall, description: val })}
                  placeholder="Description (optional)"
                  className="min-h-[120px]"
                />
                <button
                  type="submit"
                  disabled={createWall.isPending}
                  className="px-4 py-2 text-sm bg-white text-black font-bold hover:bg-gray-200 disabled:opacity-50"
                >
                  {createWall.isPending ? "CREATING..." : "CREATE WALL"}
                </button>
              </form>
            )}

            {/* Create success */}
            {createResult && (
              <div className="mb-6 border border-green-700 p-4 max-w-lg">
                <p className="text-green-400 text-sm font-bold mb-1">Wall created!</p>
                <p className="text-xs text-gray-300">Code: <span className="text-white">{createResult.wallCode}</span></p>
                <p className="text-xs text-gray-300">URL: <span className="text-white">rebel-leader.com{createResult.shareableUrl}</span></p>
              </div>
            )}

            {/* Wall list */}
            {walls.length === 0 ? (
              <p className="text-gray-500 text-sm">No walls yet.</p>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400 text-left">
                    <th className="py-2 pr-6">TITLE</th>
                    <th className="py-2 pr-6">CODE</th>
                    <th className="py-2 pr-6">CREATED</th>
                    <th className="py-2">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {walls.map((w) => (
                    <tr key={w.id} className="border-b border-gray-800">
                      <td className="py-3 pr-6">{w.title}</td>
                      <td className="py-3 pr-6 text-gray-400">{w.wallCode}</td>
                      <td className="py-3 pr-6 text-gray-400 text-xs">
                        {w.createdAt ? new Date(w.createdAt).toLocaleDateString() : "—"}
                      </td>
                      <td className="py-3 flex gap-3">
                        <a
                          href={`/wall/${w.wallCode}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300"
                        >
                          VIEW
                        </a>
                        <button
                          onClick={() => navigator.clipboard.writeText(`rebel-leader.com/wall/${w.wallCode}`)}
                          className="text-xs text-gray-400 hover:text-white"
                        >
                          COPY LINK
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
