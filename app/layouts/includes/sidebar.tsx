import React, {useEffect, useState} from 'react';
import {usePathname} from "next/navigation";
import Link from "next/link";
import MenuItem from "@/app/layouts/includes/menuItem";
import {AiOutlineHome} from "react-icons/ai";
import {RiGroupLine} from "react-icons/ri";
import {BsCameraVideo} from "react-icons/bs";
import ClientOnly from "@/app/components/clientOnly";
import FollowItemMenu from "@/app/layouts/includes/followItem";
import {Button} from "@/components/ui/button";
import {useGeneralStore} from "@/app/stores/general";
import {UseUser} from "@/app/context/user";

const Sidebar = () => {
    const pathname = usePathname();
    let { setRandomUsers, randomUsers } = useGeneralStore();
    const contextUser = UseUser();

    useEffect(() => {
        setRandomUsers()
    }, []);

    return (
        <>
            <div id="sidebarMain"
                className={`fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto ${pathname === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'}`}
            >
                <div className="lg:w-full w-[55px] mx-auto">
                    <Link href="/">
                        <MenuItem iconString="추천"
                                  icons={<AiOutlineHome size={25} color={pathname === `/` ? `#F02C56` : ``}/>}
                                  colorString={pathname === `/` ? `#F02C56` : ``}
                        />
                    </Link>
                    <MenuItem iconString="팔로잉"
                              icons={<RiGroupLine size={25} color={pathname === `/` ? `#F02C56` : ``}/>}
                              colorString={pathname === `/` ? `#F02C56` : ``}
                    />
                    <MenuItem iconString="라이브"
                              icons={<BsCameraVideo size={25} color={pathname === `/` ? `#F02C56` : ``}/>}
                              colorString={pathname === `/` ? `#F02C56` : ``}
                    />
                    {randomUsers?.length > 0 ? <div className="border-t lg:ml-2 mt-2">
                        <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                            추천 계정
                        </h3>
                        <div className="lg:hidden block pt-3"/>
                        <ClientOnly>
                            <div className="cursor-pointer">
                                {randomUsers.map((user, index) =>
                                    <FollowItemMenu user={user} key={index}/>
                                )}
                            </div>
                        </ClientOnly>
                        <Button variant="link"
                                className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]"
                        >
                            모두보기
                        </Button>
                    </div> : null}
                    {contextUser?.user?.id ? (
                        <div className="border-t lg:ml-2 mt-2">
                            <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                                팔로잉 계정
                            </h3>
                            <div className="lg:hidden block pt-3"/>
                            <ClientOnly>
                                <div className="cursor-pointer">
                                    {randomUsers.map((user, index) =>
                                        <FollowItemMenu user={user} key={index} />
                                    )}
                                </div>
                            </ClientOnly>
                            <Button variant="link"
                                    className="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]"
                            >
                                더보기
                            </Button>
                        </div>
                    ) : null}

                    <div className="lg:block hidden border-t lg:ml-2 mt-2" />

                    <div className="lg:block hidden text-[11px] text-gray-500">
                        <p className="pt-4 px-2">정보 | 뉴스룸 | 연락처 | 커리어</p>
                        <p className="pt-4 px-2">TikTok for Good광고</p>
                        <p className="pt-4 px-2">TikTok LIVE Creator Networks</p>
                        <p className="pt-4 px-2">Developers투명성TikTok 리워드</p>
                        <p className="pt-4 px-2">© 2024 TikTok</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;