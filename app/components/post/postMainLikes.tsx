import React, {useEffect, useState} from 'react';
import {Like, PostMainLikesCompTypes, Comment} from "@/app/types/type";
import {AiFillHeart} from "react-icons/ai";
import {BiLoaderCircle} from "react-icons/bi";
import { useRouter } from "next/navigation";
import {FaCommentDots, FaShare} from "react-icons/fa";
import {useGeneralStore} from "@/app/stores/general";
import {UseUser} from "@/app/context/user";
import UseGetCommentsByPostId from "@/app/hooks/useGetCommentsByPostId";
import UseGetLikesByPostId from "@/app/hooks/useGetLikesByPostId";
import UseCreateLike from "@/app/hooks/useCreateLike";
import UseDeleteLike from "@/app/hooks/useDeleteLike";
import UseIsLiked from "@/app/hooks/useIsLiked";

const PostMainLikes = (props: PostMainLikesCompTypes) => {
    const { post } = props;

    let { setIsLoginOpen } = useGeneralStore();
    const { push } = useRouter();
    const contextUser = UseUser();
    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);

    useEffect(() => {
        getAllLikesByPost();
        getAllCommentsByPost();
    }, [post]);

    useEffect(() => {
        hasUserLikedPost()
    }, [likes, contextUser]);

    const getAllCommentsByPost = async () => {
        let result = await UseGetCommentsByPostId(post?.id);
        setComments(result);
    }
    const getAllLikesByPost = async () => {
        let result = await UseGetLikesByPostId(post?.id);
        setLikes(result);
    }

    const hasUserLikedPost = () => {
        if(!contextUser) return;
        if(likes?.length < 1 || !contextUser?.user?.id) {
            setUserLiked(false);
            return;
        }
        let res = UseIsLiked(contextUser?.user?.id, post?.id, likes)
        setUserLiked(res ? true : false);
    }

    const like = async () => {
        try {
            setHasClickedLike(true);
            await UseCreateLike(contextUser?.user?.id || "", post?.id);
            await getAllLikesByPost();
            hasUserLikedPost();
            setHasClickedLike(false);
        } catch (error) {
            alert(error);
        }
    }

    const unlike = async (id: string) => {
        try {
            setHasClickedLike(true);
            await UseDeleteLike(id);
            await getAllLikesByPost();
            hasUserLikedPost();
            setHasClickedLike(false);
        } catch (error) {
            alert(error);
        }
    }

    const hasClickLike = () => {
        if(!contextUser?.user) return setIsLoginOpen(true);

        let res = UseIsLiked(contextUser?.user?.id, post?.id, likes);
        if (!res) {
            like()
        } else {
            likes.forEach(like => {
                if(contextUser?.user?.id && contextUser?.user?.id === like?.user_id && like?.post_id === post?.id) {
                    unlike(like?.id);
                }
            })
        }
    }

    return (
        <>
            <div id={`postMainLikes-${post.id}`}
                 className="relative mr-[75px]"
            >
                <div className="absolute bottom-0 pl-2">
                    <div className="pb-4 text-center">
                        <button disabled={hasClickedLike}
                                onClick={() => hasClickLike()}
                                className="rounded-full bg-gray-200 p-2 cursor-pointer"
                        >
                            {!hasClickedLike ? (
                                <AiFillHeart color={likes?.length > 0 && userLiked ? `#FF2626` : ``} size={25}/>
                            ) : (
                                <BiLoaderCircle size={25} className="animate-spin"/>
                            )}
                        </button>
                        <span className="text-xs text-gray-800 font-semibold">{likes.length}</span>
                    </div>
                    {/* 댓글 */}
                    <button onClick={() => push(`/post/${post?.id}/${post?.profile?.user_id}`)}
                            className="pb-4 text-center"
                    >
                        <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                            <FaCommentDots size={25}/>
                        </div>
                        <span className="text-xs text-gray-800 font-semibold">
                            {comments?.length}
                        </span>
                    </button>
                    {/* 공유하기 */}
                    <button onClick={() => push(`/post/${post?.id}/${post?.profile?.user_id}`)}
                            className="pb-4 text-center"
                    >
                        <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                            <FaShare size={25}/>
                        </div>
                        <span className="text-xs text-gray-800 font-semibold">
                            {55}
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default PostMainLikes;