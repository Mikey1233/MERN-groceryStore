import MobileNav from "@/components/dashboard/MobileNav";
import SideNav from "@/components/dashboard/SideNav";
import ProtectedRoute from "@/contexts/ProtectRoute";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
 <div className=" bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row">
        {/* side nav for desktop screen */}
        <SideNav />
        {/* top nav fro mobile screen */}
        <MobileNav />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
    </ProtectedRoute>
   
  );
}
