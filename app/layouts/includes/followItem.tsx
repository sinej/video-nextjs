import React from 'react';
import {FollowItemCompTypes} from "@/app/types/type";
import Link from 'next/link';
import {AiOutlineCheck} from "react-icons/ai";

const FollowItemMenu = (props: FollowItemCompTypes) => {
    const { user } = props;
    return (
        <>
            <Link href={`/profile/${user?.id}`}
                  className="flex items-center hover:bg-gray-100 rounded-md w-full py-1.5 px-2"
            >
                <img src={user?.image}
                     alt={user?.name}
                     width={"35"}
                     className="rounded-full lg:mx-0 mx-auto"
                />
                <div className="lg:pl-2.5 lg:block hidden">
                    <div className="flex items-center">
                        <p className="font-bold text-[14px] truncate">
                            {user?.name}
                        </p>
                        <p className="ml-1 rounded-full bg-[#58D5EC] h-[14px] relative">
                            <AiOutlineCheck className="relative p-[3px]" color="#FFF" size="15" />
                        </p>
                    </div>

                    <p className="font-light text-sm text-gray-600">
                        {user?.name}
                    </p>
                </div>

            </Link>
        </>
    );
}

export default FollowItemMenu;