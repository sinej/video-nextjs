'use client'

import React, {useEffect} from "react";
import MainLayout from "@/app/layouts/mainLayout";
import ClientOnly from "@/app/components/clientOnly";
import PostMain from "@/app/components/post/postMain";
import {usePostStore} from "@/app/stores/post";
import {PostWithProfile} from "@/app/types/type";

export default function Home() {
    let { allPosts, setAllPosts } = usePostStore();

    useEffect(() => {
        setAllPosts()
    }, [])


    return (
    <MainLayout>
        <div className="mt-20 w-[calc(100%-90px)] max-w-[690px] ml-auto">
            <ClientOnly>
                {allPosts.map((post: PostWithProfile, index: number) => (
                    <PostMain post={post} key={index} />
                ))}
            </ClientOnly>
        </div>
    </MainLayout>
  );
}
