'use client'

import React, { useEffect } from 'react';
import {PostMainCompTypes} from "@/app/types/type";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ImMusic} from "react-icons/im";
import {AiFillHeart} from "react-icons/ai";
import PostMainLikes from "@/app/components/post/postMainLikes";
import Image from "next/image";
import UseCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";

const PostMain = (props: PostMainCompTypes) => {
    const { post } = props;

    useEffect(() => {
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement
        const postMainElement = document.getElementById(`PostMain-${post.id}`);

        if (postMainElement) {
            let observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? video.play() : video.pause()
            }, { threshold: [0.6] });

            observer.observe(postMainElement);
        }
    }, [])

    return (
        <>
            <div id={`postMain-${post?.id}`}
                 className="flex border-b py-6 flex-col lg:flex-row"
            >
                <div className="cursor-pointer">
                    <img src={UseCreateBucketUrl(post?.profile?.image)}
                           alt={post?.profile?.name}
                           className="rounded-full max-h-[60px]"
                           width={60}
                           height={60}
                    />
                </div>
                <div className="pl-3 w-full px-4">
                    <div className="flex items-center justify-between pb-0.5">
                        <Link href={`/profile/${post?.profile?.user_id}`}>
                            <span className="font-bold hover:underline cursor-pointer">{post?.profile?.name}</span>
                        </Link>
                        <Button variant="outline"
                                className="text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#FFEEF2] font-semibold rounded-md"
                        >
                            팔로우
                        </Button>
                    </div>
                    <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post?.text}</p>
                    <div className="flex items-center pb-0.5 md:max-w-[400px] max-w-[300px]">
                    {/*{post?.tags.map((tag: any, index: number) =>*/}
                    {/*    <p className="text-[15px] break-words"*/}
                    {/*       key={index}*/}
                    {/*    >{tag}</p>*/}
                    {/*)}*/}
                    </div>
                    <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px] flex items-center">
                        <ImMusic size={17} />
                        <span className="px-1">original sound  - AWESOME</span>
                        <AiFillHeart size={20} />
                    </p>

                    <div className="mt-2.5 flex flex-col lg:flex-row">
                        <div className="relative min-h-[480px] max-w-full lg:max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer">
                            <video id={`video-${post.id}`}
                                   loop
                                   controls
                                   muted
                                   className="rounded-xl object-cover mx-auto h-full"
                                   src={UseCreateBucketUrl(post?.video_url)}
                            />
                            <Image src={"/images/logo_b.svg"}
                                   className="absolute right-3 bottom-4"
                                   alt="logo"
                                   color="black"
                                   width={100}
                                   height={52}
                            />
                        </div>

                        <PostMainLikes post={post} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostMain;