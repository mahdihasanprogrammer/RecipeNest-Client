import { getUserSession } from "@/lib/session";
import { redirect } from "next/navigation";


const AdminDashboardLayout =async ({children}:{children:React.ReactNode}) => {

    const user = await getUserSession();
    if(user?.userRole !== "admin"){
        redirect('/forbidden')
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default AdminDashboardLayout;