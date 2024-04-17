'use client'

import React, {useEffect, useState} from 'react';
import {CommentsHeaderCompTypes} from "@/app/types/type";
import {useRouter} from "next/navigation";
import Link from 'next/link';
import {BiLoaderCircle} from "react-icons/bi";
import {Button} from "@/components/ui/button";
import {BsChatDots, BsTrash, BsTrash3} from "react-icons/bs";
import {ImMusic} from "react-icons/im";
import ClientOnly from "@/app/components/clientOnly";
import {AiFillHeart} from "react-icons/ai";
import {useLikeStore} from "@/app/stores/like";
import {useCommentStore} from "@/app/stores/comment";
import {useGeneralStore} from "@/app/stores/general";
import {UseUser} from "@/app/context/user";
import UseIsLiked from "@/app/hooks/useIsLiked";
import UseCreateLike from "@/app/hooks/useCreateLike";
import UseDeleteLike from "@/app/hooks/useDeleteLike";
import UseDeletePostById from "@/app/hooks/useDeletePostById";
import UseCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import moment from "moment";

const CommentsHeader = (props: CommentsHeaderCompTypes) => {
    const { post, params } = props;
    let { setLikesByPost, likesByPost } = useLikeStore();
    let { commentsByPost, setCommentsByPost } = useCommentStore();
    let { setIsLoginOpen } = useGeneralStore();

    const { push } = useRouter();
    const contextUser = UseUser();

    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(false);

    useEffect(() => {
        setCommentsByPost(params?.postId);
        setLikesByPost(params?.postId);
    }, [post]);

    useEffect(() => {
        hasUserLikedPost()
    }, [likesByPost]);

    const hasUserLikedPost = () => {
        if (likesByPost.length < 1 || !contextUser?.user?.id) {
            setUserLiked(false);
            return
        }
        let res = UseIsLiked(contextUser?.user?.id, params?.postId, likesByPost);
        setUserLiked(res ? true : false)
    }

    const like = async () => {
        try {
            setHasClickedLike(true);
            await UseCreateLike(contextUser?.user?.id || "", params.postId);
            setLikesByPost(params.postId);
            setHasClickedLike(false);
        } catch (error) {
            console.log("error", error)
            alert(error)
            setHasClickedLike(false);
        }
    }
    const unlike = async (id: string) => {
        try {
            setHasClickedLike(true);
            await UseDeleteLike(id);
            setLikesByPost(params.postId);
            setHasClickedLike(false);
        } catch (error) {
            console.log("error", error)
            alert(error)
            setHasClickedLike(false);
        }
    }

    const deletePost = async () => {
        let res = confirm("정말로 이 게시물을 삭제하시겠습니까?")
        if(!res) return

        setIsDeleting(true);
        try {
            await UseDeletePostById(params?.postId, post?.video_url);
            push(`/profile/${params?.userId}`);
            setIsDeleting(false);
        } catch (error) {
            console.log("error", error)
            setIsDeleting(false);
            alert(error);
        }


    }
    const hasClickLike = () => {
        if(!contextUser?.user) return setIsLoginOpen(true);

        let res = UseIsLiked(contextUser?.user?.id, params?.postId, likesByPost);
        if (!res) {
           like()
        } else {
            likesByPost.forEach(like => {
                if(contextUser?.user?.id && contextUser?.user?.id === like?.user_id && like?.post_id === params?.postId) {
                    unlike(like?.id);
                }
            })
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-8">
                <div className="flex items-center">
                    <Link href={`/profile/${post?.user_id}`}>
                        {
                            post?.profile.image ? (
                                <img src={UseCreateBucketUrl(post?.profile.image)}
                                     alt={post.profile.name}
                                     className="rounded-full lg:mx-0 mx-auto"
                                     width={40}
                                />
                            ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            )
                        }
                    </Link>


                    <div className="ml-3 pt-0.5">
                        <Link href={`/profile/${post?.user_id}`}
                              className="relative z-10 text-[17px] font-semibold hover:underline"
                        >{post?.profile?.name}</Link>
                        <div className="relative z-0 text-[13px] -mt-5 font-light">
                            {post?.profile?.name}
                            <span className="relative -top-[2px] text-[30px] pl-1 pr-0.5">.</span>
                            <span className="font-medium">{moment(post?.created_at).calendar()}</span>
                        </div>
                    </div>
                </div>

                {contextUser?.user?.id === post?.user_id ? (
                    <div>
                        {isDeleting ? (
                            <BiLoaderCircle className="animate-spin" size={25} />
                        ) : (
                            <Button variant="link"
                                    size="icon"
                                    disabled={isDeleting}
                                    onClick={() => deletePost()}
                            >
                                <BsTrash3 className="cursor-pointer" size={25}/>
                            </Button>
                        )}
                    </div>
                ) : null}
            </div>

            <p className="px-8 mt-4 text-sm">{post?.text}</p>

            <p className="flex items-center gap-2 px-8 mt-4 text-sm font-bold">
                <ImMusic size={17} />
                original sound - {post?.profile.name}
            </p>

            <div className="flex items-center px-8 mt-8">
                <ClientOnly>
                    <div className="pb-4 text-center flex items-center">
                        <button className="rounded-full bg-gray-200 p-2 cursor-pointer"
                                disabled={hasClickedLike}
                                onClick={() => hasClickLike()}
                        >
                            {!hasClickedLike ? (
                                <AiFillHeart color={likesByPost.length > 0 && userLiked ? '#FF2626' : ''} size={20}/>
                            ) : (
                                <BiLoaderCircle className="animate-spin" size={20}/>
                            )}
                        </button>
                        <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">
                            {likesByPost.length}
                        </span>
                    </div>
                </ClientOnly>

                <div className="pb-4 text-center flex items-center">
                    <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                        <BsChatDots size={20}/>
                    </div>
                    <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">
                        {commentsByPost?.length}
                    </span>
                </div>
            </div>
        </>
    );
}

export default CommentsHeader;