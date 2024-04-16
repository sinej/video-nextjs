'use client'

import React from 'react';
import {MenuItemsTypes} from "@/app/types/type";

const MenuItem = (props: MenuItemsTypes) => {
    const { iconString,  icons, colorString } = props;

    return (
        <>
            <div className="flex w-full items-center hover:bg-gray-100 p-2.5 rounded-md">
                <div className="flex items-center lg:mx-0 mx-auto">
                    {icons}
                    <span className={`lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px] text-[${colorString}]`}>
                        {iconString}
                    </span>
                </div>
            </div>
        </>
    );
}

export default MenuItem;