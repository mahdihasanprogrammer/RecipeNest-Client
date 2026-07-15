import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";


const UserDashboardLayout = async ({ children }:{children: React.ReactNode}) => {
    const user = await getUserSession();
    if (user.userRole !== 'user') {
        redirect('/forbidden')
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default UserDashboardLayout;