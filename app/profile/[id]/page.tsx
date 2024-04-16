'use client'

import React, {useState} from 'react';
import {ProfilePageTypes} from "@/app/types/type";
import MainLayout from "@/app/layouts/mainLayout";
import ClientOnly from "@/app/components/clientOnly";
import {Button} from "@/components/ui/button";
import {BsPencil} from "react-icons/bs";
import PostUser from "@/app/components/profile/postUser";
import EditProfileOverlay from "@/app/components/profile/editProfileOverlay";

const Profile = (props: ProfilePageTypes) => {
    const { params } = props;

    const [editOverlay, setEditOverlay] = useState<boolean>(false);
    const currentProfile = {
        id: '123',
        user_id: '123',
        name: 'shin eunji',
        image: 'https://placeholder.co/200',
        bio: 'this is the bio section!!'
    }

    const handleEditProfileClose = () => {
        setEditOverlay(false);
    }

    return (
        <>
            <MainLayout>

                {editOverlay &&
                    <ClientOnly>
                        <EditProfileOverlay handleEditProfileClose={handleEditProfileClose} />
                    </ClientOnly>
                }
                <div className="pt-[90px] ml-[90px] 2xl:pl-[185px] lg:pl-[160px] lg:pr-0 w-[calc(100%-90px)] pr-3 max-w-[1800px] 2xl:mx-auto">
                    <div className="flex w-[calc(100vw-230px)]">
                        <ClientOnly>
                            {true ? (
                                <img src={currentProfile?.image}
                                         alt={currentProfile?.name}
                                         className="w-[120px] min-w-[120px] rounded-full"
                            />
                            ) : (
                                <div className="min-w-[150px] h-[120px] bg-gray-200 rounded-full"></div>
                            )}
                        </ClientOnly>

                        <div className="ml-5 w-full">
                            <ClientOnly>
                                {currentProfile?.name ? (
                                    <div>
                                        <p className="text-[30px] font-bold truncate">{currentProfile?.name}</p>
                                        <p className="text-[18px] truncate">{currentProfile?.name}</p>
                                    </div>
                                ) : (<div className="h-[60px]" />)}
                            </ClientOnly>

                            {true ? (
                                <Button variant="outline"
                                        className="flex items-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
                                        onClick={() => setEditOverlay(true)}
                                >
                                    <BsPencil className="mt-0.5 mr-1" size={18} />
                                    <span>프로필 수정</span>
                                </Button>
                            ) : (
                                <Button className="flex items-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]">
                                    팔로우
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center pt-4">
                        <div className="mr-4">
                            <span className="font-bold">10K</span>
                            <span className="text-gray-500 font-light text-[15px] pl-1.5">팔로잉</span>
                        </div>
                        <div className="mr-4">
                            <span className="font-bold">44K</span>
                            <span className="text-gray-500 font-light text-[15px] pl-1.5">팔로워</span>
                        </div>
                    </div>

                    <ClientOnly>
                        <p className="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
                            {currentProfile?.bio}
                        </p>
                    </ClientOnly>

                    <ul className="w-full flex items-center pt-4 border-b">
                        <li className="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">Videos</li>
                        <li className="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">Likes</li>
                    </ul>

                    <ClientOnly>
                        <div className="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                            <PostUser post={{
                                id: '123',
                                user_id: '456',
                                video_url: '/184734-873923034_tiny.mp4',
                                text: 'this is some text',
                                created_at: 'date here',
                            }} />
                        </div>
                    </ClientOnly>
                </div>
            </MainLayout>
        </>
    );
}

export default Profile;