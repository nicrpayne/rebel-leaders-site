/**
 * Admin Dashboard — Minimal user list with Gravitas result counts
 *
 * Protected by role === 'admin' on the server side.
 * Client-side: redirects unauthenticated users to login.
 */

import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

export default function Admin() {
  const { user, isAuthenticated, loading: authLoading } = useAuth({
    redirectOnUnauthenticated: true,
  });

  const usersQuery = trpc.admin.users.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
    retry: false,
  });

  // ─── Loading state ─────────────────────────────────────────────

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[10px] font-pixel tracking-widest text-[#2a2a32] uppercase animate-pulse">
          Authenticating...
        </p>
      </div>
    );
  }

  // ─── Not admin ─────────────────────────────────────────────────

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[10px] font-pixel tracking-widest text-red-500/60 uppercase">
          Access Denied
        </p>
      </div>
    );
  }

  // ─── Error state ───────────────────────────────────────────────

  if (usersQuery.error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[10px] font-pixel tracking-widest text-red-500/60 uppercase">
          Failed to load users: {usersQuery.error.message}
        </p>
      </div>
    );
  }

  // ─── Loading users ─────────────────────────────────────────────

  if (usersQuery.isLoading || !usersQuery.data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[10px] font-pixel tracking-widest text-[#2a2a32] uppercase animate-pulse">
          Loading users...
        </p>
      </div>
    );
  }

  const users = usersQuery.data;

  // ─── Render ────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-4">
          <div>
            <h1 className="text-sm font-pixel tracking-[0.3em] text-green-400/80 uppercase">
              Admin Dashboard
            </h1>
            <p className="text-[9px] font-mono text-[#4a4a52] mt-1">
              {users.length} registered user{users.length !== 1 ? "s" : ""}
            </p>
          </div>
          <a
            href="/workbench"
            className="text-[8px] font-pixel tracking-widest text-[#2a2a32] hover:text-[#4a4a52] uppercase transition-colors"
          >
            Back to Workbench
          </a>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#1a1a1a]">
                <th className="text-[8px] font-pixel tracking-[0.2em] text-[#4a4a52] uppercase py-2 pr-4">
                  ID
                </th>
                <th className="text-[8px] font-pixel tracking-[0.2em] text-[#4a4a52] uppercase py-2 pr-4">
                  Name
                </th>
                <th className="text-[8px] font-pixel tracking-[0.2em] text-[#4a4a52] uppercase py-2 pr-4">
                  Email
                </th>
                <th className="text-[8px] font-pixel tracking-[0.2em] text-[#4a4a52] uppercase py-2 pr-4">
                  Role
                </th>
                <th className="text-[8px] font-pixel tracking-[0.2em] text-[#4a4a52] uppercase py-2 pr-4">
                  Gravitas Scans
                </th>
                <th className="text-[8px] font-pixel tracking-[0.2em] text-[#4a4a52] uppercase py-2 pr-4">
                  Joined
                </th>
                <th className="text-[8px] font-pixel tracking-[0.2em] text-[#4a4a52] uppercase py-2">
                  Last Seen
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-[#111114] hover:bg-[#0e0e12] transition-colors"
                >
                  <td className="text-[10px] font-mono text-[#3a3a42] py-2 pr-4">
                    {u.id}
                  </td>
                  <td className="text-[10px] font-mono text-[#8a8a96] py-2 pr-4">
                    {u.name || "—"}
                  </td>
                  <td className="text-[10px] font-mono text-[#8a8a96] py-2 pr-4">
                    {u.email || "—"}
                  </td>
                  <td className="text-[10px] font-mono py-2 pr-4">
                    <span
                      className={
                        u.role === "admin"
                          ? "text-amber-500/80"
                          : "text-[#4a4a52]"
                      }
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="text-[10px] font-mono text-center py-2 pr-4">
                    <span
                      className={
                        Number(u.gravitasCount) > 0
                          ? "text-green-400/70"
                          : "text-[#2a2a32]"
                      }
                    >
                      {Number(u.gravitasCount)}
                    </span>
                  </td>
                  <td className="text-[10px] font-mono text-[#4a4a52] py-2 pr-4">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="text-[10px] font-mono text-[#4a4a52] py-2">
                    {u.lastSignedIn
                      ? new Date(u.lastSignedIn).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[10px] font-pixel tracking-widest text-[#2a2a32] uppercase">
              No users yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
