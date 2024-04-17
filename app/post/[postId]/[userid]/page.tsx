'use client'
import React, {useEffect} from 'react';
import {PostPageTypes} from "@/app/types/type";
import Link from "next/link";
import {AiOutlineClose} from "react-icons/ai";
import {Button} from "@/components/ui/button";
import {BiChevronDown, BiChevronUp} from "react-icons/bi";
import {useRouter} from "next/navigation";
import ClientOnly from "@/app/components/clientOnly";
import CommentsHeader from "@/app/components/post/commentsHeader";
import Comments from "@/app/components/post/comments";
import {usePostStore} from "@/app/stores/post";
import {useLikeStore} from "@/app/stores/like";
import {useCommentStore} from "@/app/stores/comment";
import UseCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";


const Post = (props: PostPageTypes) => {
    const { params } = props;
    let { postById, postsByUser, setPostById, setPostsByUser } = usePostStore();
    let { setLikesByPost } = useLikeStore();
    let { setCommentsByPost } = useCommentStore();
    const { push } = useRouter();

    useEffect(() => {
        setPostById(params.postId);
        setCommentsByPost(params.postId);
        setLikesByPost(params.postId);
        setPostsByUser(params.userId);
    }, []);


    const handleLoopThroughPostsUp = () => {
        postsByUser.forEach(post => {
            if(post.id > params.postId) {
                push(`/post/${post.id}/${params.userId}`);
            }
        })
    }

    const handleLoopThroughPostsDown = () => {
        postsByUser.forEach(post => {
            if(post.id < params.postId) {
                push(`/post/${post.id}/${params.userId}`)
            }
        })
    }

    return (
        <>
            <div id="PostPage"
                 className="lg:flex justify-between w-full h-screen bg-black overflow-auto"
            >
                <div className="lg:w-[calc(100%-540px)] h-full relative">
                    <Link href={`/profile/${params?.userId}`}
                          className="absolute text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
                    >
                        <AiOutlineClose size={27}/>
                    </Link>

                    <div>
                        <Button variant="outline"
                                size="icon"
                                className="absolute right-4 top-4 text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800 border-none"
                                onClick={() => handleLoopThroughPostsUp()}
                        >
                            <BiChevronUp size={30} color="#FFF" />
                        </Button>
                        <Button variant="outline"
                                size="icon"
                                className="absolute top-20 right-4 text-white z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800 border-none"
                                onClick={() => handleLoopThroughPostsDown()}
                        >
                            <BiChevronDown size={30} color="#FFF" />
                        </Button>
                    </div>

                    <img src="/images/logo-small.png"
                         alt="logo"
                         width={45}
                         height={45}
                         className="absolute z-20 top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto w-[45px] h-[45px]"
                    />

                    <ClientOnly>
                        {postById?.video_url ? (
                            <video src={UseCreateBucketUrl(postById?.video_url)}
                                   className="fixed object-cover w-full my-auto z-0 h-screen"
                            />
                        ) : null}

                        <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
                            {postById?.video_url ? (
                                <video autoPlay
                                       controls
                                       loop
                                       muted
                                       src={UseCreateBucketUrl(postById?.video_url)}
                                       className="h-screen mx-auto"
                                />
                            ) : null}
                        </div>
                    </ClientOnly>
                </div>

                <div id="InfoSection"
                     className="lg:max-w-[550px] relative bg-white w-full h-full">
                    <div className="py-7">
                        <ClientOnly>
                            {postById?.video_url ? (
                                <CommentsHeader post={postById} params={params} />
                            ) : null}
                        </ClientOnly>
                        <Comments params={params} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;