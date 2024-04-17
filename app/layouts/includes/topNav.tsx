'use client'

import React, {useContext, useEffect, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {BiSearch, BiUser} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";
import {BsThreeDotsVertical} from "react-icons/bs";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {FiLogOut} from "react-icons/fi";
import Image from "next/image";
import {useUser} from "@/app/components/context/user";
import {useGeneralStore} from "@/app/stores/general";

const TopNav = () => {
    const contextUser = useUser();
    const { push } = useRouter();
    const pathname = usePathname();
    const [searchProfiles, setSearchProfiles] = useState<boolean>(false);
    let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore();

    useEffect(() => {
        setIsEditProfileOpen(false);
    }, []);

    console.log("contextUser", contextUser)
    const handleSearch = (e: React.MouseEvent<HTMLDivElement>) => console.log("e.currentTarget.value", e.currentTarget);
    const handleGo = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!contextUser?.user) return setIsLoginOpen(true);
        push('/upload')
    }
    return (
        <>
            <div id="TopNav" className="fixed bg-white z-30 flex items-center w-full border-b h-[60px]">
                <div className={`flex items-center justify-between gap-6 w-full px-4 mx-auto ${pathname === '/' ? `max-w-[1150px]` : ``}`}>
                    {/* logo */}
                    <Link href="/">
                        <Image src="/images/logo_b.svg"
                               alt="logo"
                               className="min-w-[115px] w-[115px]"
                               width={115}
                               height={52}
                        />
                    </Link>
                    {/**/}
                    <div className="w-full flex items-center justify-end relative max-w-[430px]">
                        <div
                            className="relative hidden md:flex items-center justify-end bg-[#161823]/5 p-1 rounded-full max-w-[430px] w-full hover:border hover:border-neutral-300">
                            <input type="text"
                                   placeholder="검색"
                                   className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
                            />
                            <div className="px-3 py-1 flex items-center border-l border-l-gray-300"
                                 onClick={handleSearch}
                            >
                                <BiSearch size={22} color={"#A1A2A7"}/>
                            </div>
                        </div>
                        {/*<div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">*/}
                        {/*    <div className="p-1">*/}
                        {/*    <Link href={`/profile/1`}*/}
                        {/*              className="flex items-center justify-between w-full cursor-pointer hover:bg-[#F12B56] p-1 px-2"*/}
                        {/*        >*/}
                        {/*            <div className="flex items-center">*/}
                        {/*                <img src="https://placehold.co/40"*/}
                        {/*                     alt=""*/}
                        {/*                     className="rounded-md"*/}
                        {/*                     width={40}*/}
                        {/*                />*/}
                        {/*                <div className="truncate ml-2">John Weeks Dev</div>*/}
                        {/*            </div>*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline"
                                className="flex items-center border rounded-sm py-[6px] hover:bg-gray-100 pl-1.5"
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleGo(e)}
                        >
                            <AiOutlinePlus color="#000" size={22}/>
                            <span className="px-2 font-medium text-[15px]">업로드</span>
                        </Button>

                        {!contextUser?.user?.id ? (
                            <div className="flex items-center">
                                <Button variant="destructive"
                                        className="whitespace-nowrap font-medium text-[15px] bg-[#F02C56] text-white border rounded-md px-8 py-[6px] flex items-center"
                                        color="#F02C56"
                                        onClick={() => setIsLoginOpen(true)}
                                >로그인</Button>
                                <BsThreeDotsVertical size={25} color="#161724" />
                            </div>
                        ) : (
                            <div className="relative">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="flex itmems-center">
                                            <BiUser size={20}/>
                                            <span className="pl-2 font-semibold text-sm">프로필</span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={async () => {
                                            await contextUser?.logout();
                                        }}
                                        >
                                            <FiLogOut size={20}/>
                                            <span className="pl-2 text-sm">로그아웃</span></DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TopNav;