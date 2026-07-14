import ProfileForm from "@/components/dashboard/user/profile/ProfileForm";
import { getUserSession } from "@/lib/session";
import { TUser } from "@/types/interface";


const UserProfilePage = async () => {
  const user: TUser | null = await getUserSession();

  // যদি ইউজার সেশন না থাকে তবে সেফটি চেক
  const initialUserData = {
    name: user?.name || "",
    email: user?.email || "",
    image: user?.image || "",
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {/* হেডার সেকশন */}
      <div className="border-b border-white/5 pb-6 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Culinary Profile
        </h1>
        <p className="text-sm text-white/50 mt-1.5">
          Personalize your Recipe Nest identity and credentials.
        </p>
      </div>

      {/* ক্লায়েন্ট ফর্ম কম্পোনেন্ট */}
      <ProfileForm initialUser={initialUserData} />
    </div>
  );
};

export default UserProfilePage;