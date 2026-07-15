"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input, Avatar, AlertDialog } from "@heroui/react";
import { FiCheck, FiRefreshCw, FiAlertCircle, FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ProfileFormProps {
  initialUser: {
    name: string;
    email: string;
    image: string;
  };
}

export default function ProfileForm({ initialUser }: ProfileFormProps) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // header-e দেখানোর জন্য লাইভ ডেটা
  const [displayName, setDisplayName] = useState(initialUser.name);
  const [displayImage, setDisplayImage] = useState(initialUser.image);

  // মোডাল ফর্মের ইনপুট স্টেট
  const [name, setName] = useState(initialUser.name);
  const [imageUrl, setImageUrl] = useState(initialUser.image);

  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = () => {
    setName(displayName);
    setImageUrl(displayImage);
    setErrorMsg("");
    setIsOpen(true);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Name is required.");
      return;
    }

    try {
      setIsUpdating(true);
      setErrorMsg("");

      await authClient.updateUser({
        name: name.trim(),
        image: imageUrl.trim() || undefined,
      });

      // Better Auth cookie cache bypass — na hole reload-e purono data ferot ashe
      await authClient.getSession({ query: { disableCookieCache: true } });

      setDisplayName(name.trim());
      setDisplayImage(imageUrl.trim());

      router.refresh();
      setIsOpen(false);
    } catch (error: any) {
      console.error("Update failed:", error);
      setErrorMsg(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative w-full bg-white/2 border border-white/10 backdrop-blur-3xl rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-black/50 overflow-hidden">
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <Avatar
          key={displayImage}
          className="w-24 h-24 rounded-3xl border border-white/10 bg-white/5 text-xl font-bold text-white shadow-xl"
        >
          {displayImage && (
            <Avatar.Image
              src={displayImage}
              alt={displayName}
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          )}
          <Avatar.Fallback className="bg-linear-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center w-full h-full uppercase">
            {displayName ? displayName[0] : "U"}
          </Avatar.Fallback>
        </Avatar>

        <div className="text-center">
          <h2 className="text-xl font-bold text-white">{displayName}</h2>
          <p className="text-sm text-white/40">{initialUser.email}</p>
        </div>

        <Button
          onClick={handleOpenModal}
          size="sm"
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-xl text-xs h-8 font-medium transition-all active:scale-[0.95] cursor-pointer flex items-center gap-1.5 px-3"
        >
          <FiEdit2 className="w-3 h-3" /> Edit Profile
        </Button>
      </div>

      {isOpen && (
        <AlertDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <AlertDialog.Backdrop className="backdrop-blur-md bg-black/60 fixed inset-0 z-[9998]" />
          <AlertDialog.Container className="fixed inset-0 flex items-center justify-center p-4 z-[9999] mx-auto">
            <AlertDialog.Dialog className="w-full sm:min-w-sm bg-[#0f0a24] border border-white/10 rounded-2xl overflow-hidden p-6 relative shadow-2xl">
              <AlertDialog.CloseTrigger
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white absolute top-4 right-4 cursor-pointer"
              />

              <AlertDialog.Header>
                <AlertDialog.Heading className="text-xl font-bold text-white tracking-tight">
                  Update Profile
                </AlertDialog.Heading>
                <p className="text-xs text-white/40 mt-1">Modify your public identifier settings</p>
              </AlertDialog.Header>

              <form onSubmit={handleUpdateProfile} className="space-y-4 py-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                    Your Culinary Name
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">
                    Profile Image URL
                  </label>
                  <Input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/your-photo.jpg"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg">
                    <FiAlertCircle className="w-4 h-4" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <AlertDialog.Footer className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <Button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    disabled={isUpdating}
                    className="bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 rounded-xl text-xs h-9 px-4 font-medium transition-all disabled:opacity-40 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-linear-to-r from-orange-500 to-amber-500 text-white text-xs font-bold h-9 px-5 rounded-xl shadow-lg shadow-orange-600/20 active:scale-[0.97] transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isUpdating ? (
                      <>
                        <FiRefreshCw className="animate-spin w-3.5 h-3.5" /> Updating...
                      </>
                    ) : (
                      <>
                        <FiCheck className="w-3.5 h-3.5" /> Save Changes
                      </>
                    )}
                  </Button>
                </AlertDialog.Footer>
              </form>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog>
      )}
    </div>
  );
}