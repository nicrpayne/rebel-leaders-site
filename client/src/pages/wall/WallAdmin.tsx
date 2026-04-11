import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle,
  XCircle,
  Eye,
  LogOut,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/lib/trpc";
import ZoomableImage from "@/components/wall/ZoomableImage";
import RichTextDisplay from "@/components/wall/RichTextDisplay";
import WallCreationForm from "@/components/wall/WallCreationForm";

// Local types (replaces Supabase Wall / Submission / Entry)
interface Wall {
  id: string;
  title: string;
  description: string | null;
  wallCode: string;
  isActive: boolean;
  headerImageUrl: string | null;
  createdAt: Date | null;
}

interface Submission {
  id: string;
  wallId: string;
  imageUrl: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: Date | null;
}

const AdminDashboard = () => {
  const [secret, setSecret] = useState(() => sessionStorage.getItem("wall_admin_secret") ?? "");
  const [authenticated, setAuthenticated] = useState(() => Boolean(sessionStorage.getItem("wall_admin_secret")));
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState("walls");
  const [isCreateWallDialogOpen, setIsCreateWallDialogOpen] = useState(false);
  const [pendingWallCode, setPendingWallCode] = useState(() => Math.random().toString(36).slice(2, 8).toUpperCase());
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [selectedWallForEdit, setSelectedWallForEdit] = useState<Wall | null>(
    null,
  );
  const [wallToDelete, setWallToDelete] = useState<Wall | null>(null);
  const { toast } = useToast();
  const [previousSubmissionCount, setPreviousSubmissionCount] = useState(0);


  // Bulk selection state
  const [selectedSubmissionIds, setSelectedSubmissionIds] = useState<
    Set<string>
  >(new Set());
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  // tRPC
  const verify = trpc.wall.adminVerify.useMutation();
  const { data: walls = [], refetch: refetchWalls } =
    trpc.wall.adminGetWalls.useQuery({ secret }, { enabled: authenticated });
  const { data: allSubmissions = [], refetch: refetchSubmissions } =
    trpc.wall.adminGetSubmissions.useQuery({ secret }, { enabled: authenticated });
  const approveMutation = trpc.wall.adminApproveSubmission.useMutation({
    onSuccess: () => { refetchSubmissions(); refetchWalls(); },
  });
  const rejectMutation = trpc.wall.adminRejectSubmission.useMutation({
    onSuccess: () => refetchSubmissions(),
  });
  const createWallMutation = trpc.wall.adminCreateWall.useMutation({
    onSuccess: () => refetchWalls(),
  });
  const updateWallMutation = trpc.wall.adminUpdateWall.useMutation({
    onSuccess: () => { refetchWalls(); setSelectedWallForEdit(null); },
  });
  const deleteWallMutation = trpc.wall.adminDeleteWall.useMutation({
    onSuccess: () => { refetchWalls(); refetchSubmissions(); },
  });
  const uploadHeaderMutation = trpc.wall.adminUploadHeaderImage.useMutation();

  const submissions = allSubmissions as Submission[];
  const pendingSubmissions = submissions.filter((s) => s.status === "pending");

  // Helper functions to calculate entry counts dynamically
  const getTotalEntryCount = (wallId: string) => {
    return submissions.filter(
      (s) => s.wallId === wallId && s.status === "approved",
    ).length;
  };

  const getPendingCount = (wallId: string) => {
    return submissions.filter(
      (s) => s.wallId === wallId && s.status === "pending",
    ).length;
  };

  // Show toast notification for new submissions
  useEffect(() => {
    if (
      submissions.length > previousSubmissionCount &&
      previousSubmissionCount > 0
    ) {
      const newSubmissionsCount = submissions.length - previousSubmissionCount;
      toast({
        title: "New Submission!",
        description: `${newSubmissionsCount} new journal ${newSubmissionsCount === 1 ? "entry" : "entries"} submitted for review.`,
      });
    }
    setPreviousSubmissionCount(submissions.length);
  }, [submissions.length, previousSubmissionCount, toast]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError(false);
    try {
      await verify.mutateAsync({ secret });
      sessionStorage.setItem("wall_admin_secret", secret);
      setAuthenticated(true);
    } catch {
      setAuthError(true);
    }
  }

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const makeUploadHeaderHandler = (wallCode: string) => async (file: File) => {
    const imageBase64 = await fileToBase64(file);
    const { url } = await uploadHeaderMutation.mutateAsync({
      secret,
      wallCode,
      imageBase64,
      contentType: file.type,
    });
    return url;
  };

  const handleCreateWall = async (wallData: {
    title: string;
    description: string;
    isPrivate: boolean;
    headerImageUrl?: string;
  }) => {
    try {
      const result = await createWallMutation.mutateAsync({
        secret,
        title: wallData.title,
        description: wallData.description || undefined,
        headerImageUrl: wallData.headerImageUrl || undefined,
        wallCode: pendingWallCode,
      });
      setIsCreateWallDialogOpen(false);
      setPendingWallCode(Math.random().toString(36).slice(2, 8).toUpperCase());
      return { success: true, wallCode: result.wallCode, shareableLink: `${window.location.origin}/wall/${result.wallCode}` };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message ?? "Failed to create wall. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const handleEditWall = async (wallData: {
    title: string;
    description: string;
    isPrivate: boolean;
    headerImageUrl?: string;
  }) => {
    if (!selectedWallForEdit) return { success: false };
    try {
      await updateWallMutation.mutateAsync({
        secret,
        wallId: selectedWallForEdit.id,
        title: wallData.title,
        description: wallData.description || undefined,
        headerImageUrl: wallData.headerImageUrl || undefined,
      });
      toast({ title: "Success", description: "Wall updated successfully." });
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message ?? "Failed to update wall.",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const handleDeleteWall = async (wall: Wall) => {
    try {
      await deleteWallMutation.mutateAsync({ secret, wallId: wall.id });
      toast({ title: "Success", description: `"${wall.title}" deleted.` });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message ?? "Failed to delete wall.",
        variant: "destructive",
      });
    }
    setWallToDelete(null);
  };

  const handleApproveSubmission = async (id: string) => {
    try {
      await approveMutation.mutateAsync({ secret, submissionId: id });
      toast({
        title: "Success",
        description: "Submission approved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve submission. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRejectSubmission = async (id: string) => {
    try {
      await rejectMutation.mutateAsync({ secret, submissionId: id });
      toast({
        title: "Success",
        description: "Submission rejected.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject submission. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Bulk selection functions
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubmissionIds(new Set(pendingSubmissions.map((s) => s.id)));
    } else {
      setSelectedSubmissionIds(new Set());
    }
  };

  const handleSelectSubmission = (submissionId: string, checked: boolean) => {
    const newSelected = new Set(selectedSubmissionIds);
    if (checked) {
      newSelected.add(submissionId);
    } else {
      newSelected.delete(submissionId);
    }
    setSelectedSubmissionIds(newSelected);
  };

  // Bulk approval function
  const handleBulkApprove = async () => {
    if (selectedSubmissionIds.size === 0) return;

    setIsBulkProcessing(true);
    const selectedIds = Array.from(selectedSubmissionIds);

    try {
      const approvalPromises = selectedIds.map(async (id) => {
        try {
          await approveMutation.mutateAsync({ secret, submissionId: id });
          return { id, success: true };
        } catch (error) {
          return { id, success: false, error };
        }
      });

      const results = await Promise.all(approvalPromises);
      const successful = results.filter((r) => r.success);
      const failed = results.filter((r) => !r.success);

      setSelectedSubmissionIds(new Set());

      if (failed.length === 0) {
        toast({
          title: "Success",
          description: `${successful.length} submission${successful.length === 1 ? "" : "s"} approved successfully.`,
        });
      } else if (successful.length > 0) {
        toast({
          title: "Partial Success",
          description: `${successful.length} approved, ${failed.length} failed. Please try again for the failed ones.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to approve submissions. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve submissions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBulkProcessing(false);
    }
  };

  // Bulk rejection function
  const handleBulkReject = async () => {
    if (selectedSubmissionIds.size === 0) return;

    setIsBulkProcessing(true);
    const selectedIds = Array.from(selectedSubmissionIds);

    try {
      const rejectionPromises = selectedIds.map(async (id) => {
        try {
          await rejectMutation.mutateAsync({ secret, submissionId: id });
          return { id, success: true };
        } catch (error) {
          return { id, success: false, error };
        }
      });

      const results = await Promise.all(rejectionPromises);
      const successful = results.filter((r) => r.success);
      const failed = results.filter((r) => !r.success);

      setSelectedSubmissionIds(new Set());

      if (failed.length === 0) {
        toast({
          title: "Success",
          description: `${successful.length} submission${successful.length === 1 ? "" : "s"} rejected.`,
        });
      } else if (successful.length > 0) {
        toast({
          title: "Partial Success",
          description: `${successful.length} rejected, ${failed.length} failed. Please try again for the failed ones.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to reject submissions. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject submissions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setSecret("");
  };

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <form onSubmit={handleLogin} className="flex flex-col gap-3 w-72">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Admin secret"
            className="border px-3 py-2 text-sm rounded"
            autoFocus
          />
          {authError && <p className="text-red-500 text-xs">Invalid secret</p>}
          <Button type="submit" disabled={verify.isPending}>
            {verify.isPending ? "Verifying..." : "Login"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-background">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your community walls and review submissions
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex justify-between items-center mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="walls">Walls</TabsTrigger>
            <TabsTrigger value="submissions">
              Submissions
              {pendingSubmissions.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {pendingSubmissions.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="walls" className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Community Walls</h2>
                <Dialog
                  open={isCreateWallDialogOpen}
                  onOpenChange={setIsCreateWallDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Wall
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 max-w-md">
                    <WallCreationForm
                      onSubmit={handleCreateWall}
                      onUploadHeaderImage={makeUploadHeaderHandler(pendingWallCode)}
                      shouldResetScroll={isCreateWallDialogOpen}
                      onCancel={() => setIsCreateWallDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(walls as Wall[]).map((wall) => (
                  <Card key={wall.id}>
                    {wall.headerImageUrl && (
                      <div className="w-full h-32 overflow-hidden">
                        <img
                          src={wall.headerImageUrl}
                          alt={`${wall.title} header`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex-1">{wall.title}</CardTitle>
                        {!wall.isActive && (
                          <Badge variant="secondary" className="ml-2">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <CardDescription>
                        <RichTextDisplay
                          content={wall.description ?? ""}
                          className="text-sm"
                        />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Wall Code
                          </span>
                          <span className="font-mono font-semibold">
                            {wall.wallCode}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Created
                          </span>
                          <span>
                            {wall.createdAt
                              ? new Date(wall.createdAt).toLocaleDateString()
                              : "—"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Total Entries
                          </span>
                          <span>{getTotalEntryCount(wall.id)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Pending
                          </span>
                          <span>
                            {getPendingCount(wall.id) > 0 ? (
                              <Badge variant="destructive">
                                {getPendingCount(wall.id)}
                              </Badge>
                            ) : (
                              getPendingCount(wall.id)
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedWallForEdit(wall)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            window.open(`/wall/${wall.wallCode}?admin=true`, "_blank");
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                          onClick={() => setWallToDelete(wall)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/wall/${wall.wallCode}`,
                          );
                          toast({
                            title: "Success",
                            description: "Wall link copied to clipboard!",
                          });
                        }}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Copy Link
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {walls.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No walls created yet</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    Create your first community wall to get started
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="submissions">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pending Submissions</h2>
                {pendingSubmissions.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedSubmissionIds.size} of{" "}
                      {pendingSubmissions.length} selected
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkApprove()}
                      disabled={
                        selectedSubmissionIds.size === 0 || isBulkProcessing
                      }
                    >
                      {isBulkProcessing ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Approve Selected ({selectedSubmissionIds.size})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkReject()}
                      disabled={
                        selectedSubmissionIds.size === 0 || isBulkProcessing
                      }
                      className="text-destructive"
                    >
                      {isBulkProcessing ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-2" />
                      )}
                      Reject Selected ({selectedSubmissionIds.size})
                    </Button>
                  </div>
                )}
              </div>

              {pendingSubmissions.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={
                              selectedSubmissionIds.size ===
                                pendingSubmissions.length &&
                              pendingSubmissions.length > 0
                            }
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all submissions"
                          />
                        </TableHead>
                        <TableHead>Preview</TableHead>
                        <TableHead>Wall</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedSubmissionIds.has(submission.id)}
                              onCheckedChange={(checked) =>
                                handleSelectSubmission(
                                  submission.id,
                                  checked as boolean,
                                )
                              }
                              aria-label={`Select submission`}
                            />
                          </TableCell>
                          <TableCell>
                            <div
                              className="w-16 h-16 relative overflow-hidden rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <img
                                src={submission.imageUrl}
                                alt="Journal submission"
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                                <Eye className="h-4 w-4 text-white opacity-0 hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {(walls as Wall[]).find((w) => w.id === submission.wallId)?.title ?? submission.wallId}
                          </TableCell>
                          <TableCell>
                            {submission.submittedAt
                              ? new Date(submission.submittedAt).toLocaleDateString()
                              : "—"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setSelectedSubmission(submission)
                                }
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600"
                                onClick={() =>
                                  handleApproveSubmission(submission.id)
                                }
                                disabled={isBulkProcessing}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive"
                                onClick={() =>
                                  handleRejectSubmission(submission.id)
                                }
                                disabled={isBulkProcessing}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">
                    No pending submissions
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    All submissions have been reviewed
                  </p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Submission Review Dialog */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={(open) => !open && setSelectedSubmission(null)}
      >
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Review Journal Submission</DialogTitle>
            <DialogDescription>
              {selectedSubmission && (
                <span>
                  Submitted on{" "}
                  {selectedSubmission.submittedAt
                    ? new Date(selectedSubmission.submittedAt).toLocaleDateString()
                    : "—"}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="mt-4">
              <div className="h-[60vh] mb-4">
                <ZoomableImage
                  src={selectedSubmission.imageUrl}
                  alt="Journal submission for review"
                  className="w-full h-full"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSubmission(null)}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="text-destructive"
                  onClick={() => {
                    handleRejectSubmission(selectedSubmission.id);
                    setSelectedSubmission(null);
                  }}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Reject
                </Button>
                <Button
                  className="text-green-600 bg-green-50 hover:bg-green-100"
                  onClick={() => {
                    handleApproveSubmission(selectedSubmission.id);
                    setSelectedSubmission(null);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Wall Dialog */}
      <Dialog
        open={!!selectedWallForEdit}
        onOpenChange={(open) => !open && setSelectedWallForEdit(null)}
      >
        <DialogContent className="p-0 max-w-md">
          {selectedWallForEdit && (
            <WallCreationForm
              onSubmit={handleEditWall}
              onUploadHeaderImage={makeUploadHeaderHandler(selectedWallForEdit.wallCode)}
              initialData={{
                title: selectedWallForEdit.title,
                description: selectedWallForEdit.description ?? "",
                isPrivate: false,
                headerImageUrl: selectedWallForEdit.headerImageUrl ?? undefined,
              }}
              isEditMode={true}
              onCancel={() => setSelectedWallForEdit(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!wallToDelete}
        onOpenChange={(open) => !open && setWallToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Wall
            </AlertDialogTitle>
            <AlertDialogDescription>
              {wallToDelete && (
                <div className="space-y-2">
                  <p>
                    Are you sure you want to delete &quot;
                    <strong>{wallToDelete.title}</strong>&quot;?
                  </p>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <p>
                      <strong>Wall Code:</strong> {wallToDelete.wallCode}
                    </p>
                    <p>
                      <strong>Total Entries:</strong>{" "}
                      {getTotalEntryCount(wallToDelete.id)}
                    </p>
                    <p>
                      <strong>Pending Submissions:</strong>{" "}
                      {getPendingCount(wallToDelete.id)}
                    </p>
                  </div>
                  <p className="text-destructive font-medium">
                    This action cannot be undone. All associated submissions and
                    entries will also be deleted.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => wallToDelete && handleDeleteWall(wallToDelete)}
            >
              Delete Wall
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
