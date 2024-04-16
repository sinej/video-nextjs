import React from 'react';
import {usePathname} from "next/navigation";

type Props = {

};

const Sidebar = (props: Props) => {
    const {} = props;
    const pathname = usePathname();

    return (
        <>
            <div id="sidebarMain"
                className={`fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto ${pathname === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'}`}
            ></div>
        </>
    );
}

export default Sidebar;