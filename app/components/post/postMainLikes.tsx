import React, {useState} from 'react';
import {Like, PostMainLikesCompTypes, Comment} from "@/app/types/type";
import {AiFillHeart} from "react-icons/ai";
import {BiLoaderCircle} from "react-icons/bi";
import { useRouter } from "next/navigation";
import {FaCommentDots, FaShare} from "react-icons/fa";

const PostMainLikes = (props: PostMainLikesCompTypes) => {
    const { post } = props;
    const { push } = useRouter();
    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);
    const handleLike = (id: string) => {
        console.log("like");
        setUserLiked(!userLiked);
        // setLikes(likes.push(id))
    }

    return (
        <>
            <div id={`postMainLikes-${post.id}`}
                 className="relative mr-[75px]"
            >
                <div className="absolute bottom-0 pl-2">
                    <div className="pb-4 text-center">
                        <button disabled={hasClickedLike}
                                onClick={() => handleLike(post?.id)}
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