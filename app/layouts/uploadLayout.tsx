'use client'

import {usePathname} from "next/navigation";
import TopNav from "@/app/layouts/includes/topNav";

const UploadLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <>
            <div className={"bg-[#F8F8F8] h-screen"}>
                <TopNav />
                <div className="flex justify-between mx-auto w-full px-2 max-w-[1140]">
                    {children}
                </div>
            </div>
        </>
    )
}

export default UploadLayout;