import React from "react";
import {usePathname} from "next/navigation";
import TopNav from "@/app/layouts/includes/topNav";
import Sidebar from "@/app/layouts/includes/sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <>
            <TopNav />
            <div className={`flex justify-between mx-auto w-full lg:px-2.5 px-0 ${pathname === '/' ? `max-w-[1140px]` : ``}`}>
                <Sidebar />
                {children}
            </div>
        </>
    )
}

export default MainLayout;