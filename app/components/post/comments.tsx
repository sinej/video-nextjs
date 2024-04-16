'use client'

import React, {useState} from 'react';
import {CommentsCompTypes} from "@/app/types/type";
import {useRouter} from "next/navigation";
import ClientOnly from "@/app/components/clientOnly";
import SingleComment from "@/app/components/post/singleComment";
import {BiLoaderCircle} from "react-icons/bi";
import {Button} from "@/components/ui/button";

const Comments = (props: CommentsCompTypes) => {
    const { post, params } = props;
    const { push } = useRouter();

    const [comment, setComment] = useState<string>('');
    const [inputFocused, setInputFocused] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const commentsByPost = [{
        id: '123',
        user_id: '456',
        post_id: '987',
        text: 'this is some text',
        created_at: 'date here',
        profile: {
            user_id: '456',
            name: 'User 1',
            image: 'https://placeholder.co/100',
        }
    }]

    const handleComment = () => {

    }

    return (
        <>
            <div id="Comments"
                 className="relative bg-[#F8F8F8] z-0 w-full h-[calc(100vh-273px)] border-t-2 overflow-auto">
                <div className="pt-2" />
                <ClientOnly>
                    {commentsByPost.length < 1 ? (
                        <div className="text-center mt-6 text-xl text-gray-500">No Comments...</div>
                    ) : (
                        <div className="w-full h-full">
                            {commentsByPost.map((comment, index: number) => (
                                <SingleComment key={index} comment={comment} params={params} />
                            ))}
                        </div>
                    )}
                </ClientOnly>

                <div className="mb-28" />
            </div>

            <div id="CreateComment"
                 className="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
            >
                <div className={`bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]
                ${inputFocused ? 'border-2 border-gray-400' : 'border-2 border-[#F1F1F2]'}
                `}>
                    <input type="text"
                           onFocus={() => setInputFocused(true)}
                           onBlur={() => setInputFocused(false)}
                           onChange={(e) => setComment(e.target.value)}
                           value={comment || ''}
                           placeholder="댓글 추가.."
                           className="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
                    />
                </div>
                {!isUploading ? (
                    <Button variant="link"
                            className={`font-semibold text-sm ml-5 pr-1 ${comment ? `text-[#F02C56] cursor-pointer` : `text-gray-400`}`}
                            disabled={!comment}
                            onClick={() => handleComment()}
                    >게시</Button>
                ) : (
                    <BiLoaderCircle size={25} className="animate-spin"/>
                )}
            </div>
        </>
    );
}

export default Comments;