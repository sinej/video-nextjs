'use client'

import React, {useState} from 'react';
import {SingleCommentsCompTypes} from "@/app/types/type";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {BiLoaderCircle} from "react-icons/bi";
import {BsTrash3} from "react-icons/bs";

const SingleComment = (props: SingleCommentsCompTypes) => {
    const { comment, params } = props;

    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const deleteComment = () => {
        let res = confirm('이 댓글을 삭제하시겠습니까?');
        if(!res) return;
    }

    return (
        <>
            <div id="SingleComment" className="flex items-center justify-between px-8 mt-4">
                <div className="flex items-center relative w-full">
                    <Link href={`/profile/${comment.profile.user_id}`}>
                        <img src={comment.profile.image}
                             alt={comment.profile.name}
                             width={40}
                             className="absolute top-0 rounded-full lg:mx-0 mx-auto"
                        />
                    </Link>
                    <div className="ml-14 pt-0.5 w-full">
                        <div className="text-[18px] font-semibold flex items-center justify-between">
                            <span className="flex items-center">
                                {comment?.profile?.name} -
                                <span className="text-[12px] text-gray-600 font-light ml-1">{comment?.created_at}</span>
                            </span>

                            {true ? <Button variant="link"
                                            size="icon"
                                            disabled={isDeleting}
                                            onClick={() => deleteComment()}
                            >
                                {isDeleting ? <BiLoaderCircle className="animate-spin" color="#E91E62" size={20} /> :
                                    <BsTrash3 className="cursor-pointer" size={25} />
                                }
                            </Button>
                                : null}
                        </div>
                        <p className="text-[15px] font-light">{comment?.text}</p>

                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleComment;