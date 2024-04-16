'use client'

import React, {useState} from 'react';
import {CommentsHeaderCompTypes} from "@/app/types/type";
import {useRouter} from "next/navigation";
import Link from 'next/link';
import {BiLoaderCircle} from "react-icons/bi";
import {Button} from "@/components/ui/button";
import {BsChatDots, BsTrash, BsTrash3} from "react-icons/bs";
import {ImMusic} from "react-icons/im";
import ClientOnly from "@/app/components/clientOnly";
import {AiFillHeart} from "react-icons/ai";

const CommentsHeader = (props: CommentsHeaderCompTypes) => {
    const { post, params } = props;
    const { push } = useRouter();

    const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [userLiked, setUserLiked] = useState<boolean>(false);

    const deletePost = () => {

    }
    const hasClickLike = () => {

    }

    return (
        <>
            <div className="flex items-center justify-between px-8">
                <div className="flex items-center">
                    <Link href={`/profile/${post?.user_id}`}>
                        {
                            post?.profile.image ? (
                                <img src={post.profile.image}
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
                            <span className="font-medium">{post?.created_at}</span>
                        </div>
                    </div>
                </div>

                {true ? (
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
                ) : (
                    null
                )}
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
                                <AiFillHeart size={20}/>
                            ) : (
                                <BiLoaderCircle className="animate-spin" size={20}/>
                            )}
                        </button>
                        <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">
                            123
                        </span>
                    </div>
                </ClientOnly>

                <div className="pb-4 text-center flex items-center">
                    <div className="rounded-full bg-gray-200 p-2 cursor-pointer">
                        <BsChatDots size={20}/>
                    </div>
                    <span className="text-xs pl-2 pr-4 text-gray-800 font-semibold">
                        10
                    </span>
                </div>
            </div>
        </>
    );
}

export default CommentsHeader;