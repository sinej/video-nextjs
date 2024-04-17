'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {UploadError} from "@/app/types/type";
import UploadLayout from "@/app/layouts/uploadLayout";
import {BiLoaderCircle, BiSolidCloudUpload} from "react-icons/bi";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {AiOutlineCheckCircle} from "react-icons/ai";
import {PiKnifeLight} from "react-icons/pi";
import {Button} from "@/components/ui/button";
import {useUser} from "@/app/context/user";
import {validate} from "json-schema";
import UseCreatePost from "@/app/hooks/useCreatePost";
const Upload = () => {
    const contextUser = useUser();
    const { push } = useRouter();

    const [fileDisplay, setFileDisplay] = useState<string>('');
    const [caption, setCaption] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<UploadError | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
        if(!contextUser?.user) push('/');
    }, [contextUser]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if(files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setFileDisplay(fileUrl);
            setFile(file);
        }
    }

    const changeVideo = () => {
        setFileDisplay('');
        setFile(null);
    }

    const discard = () => {
        setFileDisplay('');
        setFile(null);
        setCaption('')
    }

    const validate = () => {
        setError(null);
        let isError = false;

        if(!file) {
            setError({ type: 'File', message: '동영상이 필요합니다.' });
            isError = true;
        } else if(!caption) {
            setError({ type: 'caption', message: '동영상이 필요합니다.' });
            isError = true;
        }
        return isError;
    }

    const createNewPost = async () => {
        let isError = validate();
        if(isError) return;
        if(!file || !contextUser?.user) return;

        setIsUploading(true);

        try {
            await UseCreatePost(file, contextUser?.user?.id, caption)
            push(`/profile/${contextUser?.user?.id}`)
            setIsUploading(false);
        } catch (error) {
            console.log("error", error);
            setIsUploading(false);
            alert(error);
        }
    }

    return (
        <>
            <UploadLayout>
                <div className="w-full mt-20 mb-10 bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
                    <div>
                        <h1 className="text-[23px] font-semibold">업로드 동영상</h1>
                        <h2 className="text-gray-400 mt-1">계정에 동영상 게시</h2>
                    </div>
                    <div className="mt-8 md:flex gap-6">
                        {
                            !fileDisplay ? (
                                <label htmlFor="fileInput12"
                                       className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center
                                       w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed
                                       border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                                >
                                    <BiSolidCloudUpload size={40} color="b3b3b1"/>
                                    <p className="mt-4 text-[17px]">업로드할 비디오 선택</p>
                                    <p className="mt-1.5 text-gray-500 text-[13px]">또는 파일을 드래그 앤 드롭하세요.</p>
                                    <p className="mt-12 text-gray-400 text-sm">MP4</p>
                                    <p className="mt-2 text-gray-400 text-[13px]">최대 30분</p>
                                    <p className="mt-2 text-gray-400 text-[13px]">2GB 미만</p>
                                    <label htmlFor="fileInput"
                                           className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer"
                                    >
                                        파일 선택
                                    </label>
                                    <input type="file"
                                           id="fileInput12"
                                           hidden
                                           onChange={handleChange}
                                           accept=".mp4"
                                    />
                                </label>
                            ) : (
                                <div className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center
                                w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative">
                                    {isUploading ? (
                                        <div
                                            className="absolute flex items-center justify-center z-20 bg-black w-full h-full rounded-[50px] bg-opacity-50">
                                            <div className="mx-auto flex items-center justify-center gap-1">
                                                <BiLoaderCircle className="animate-spin" color="#F12B56" size={30}/>
                                                <div className="text-white font-bold">Uploading...</div>
                                            </div>
                                        </div>
                                    ) : null}
                                    <img src="/images/mobile-case.png"
                                         alt="mobile"
                                         className="absolute z-20 pointer-events-none"
                                    />

                                    <img src="/images/logo_b.svg"
                                         alt="logo"
                                         width="90"
                                         className="absolute right-6 bottom-8 z-20 pointer-events-none"
                                    />
                                    <video src={fileDisplay}
                                           autoPlay
                                           loop
                                           muted
                                           className="absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                                    />

                                    <div className="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300">
                                        <div className="flex items-center truncate">
                                            <AiOutlineCheckCircle size={16} className="min-w-4" />
                                            <p className="text-[11px] pl-1 truncate text-ellipsis w-[calc(100%-20px)]">
                                                {file ? `${file.name}${file.name}` : ''}
                                            </p>
                                        </div>
                                        <Button variant="ghost" onClick={() => changeVideo()} className="text-[11px] ml-2 font-semibold text-nowrap py-0 h-auto">
                                            변경
                                        </Button>
                                    </div>
                                </div>
                            )
                        }
                        <div className="mt-4 mb-6">
                            <div className="flex bg-[#F8F8F8] py-4 px-6">
                                <div>
                                    <PiKnifeLight size={20} className="mr-4" />
                                </div>
                                <div>
                                    <div className="font-semibold text-[15px] mb-1.5">영상 분할 및 편집</div>
                                    <div className="font-semibold text-[13px] text-gray-400">
                                        비디오를 여러 부분으로 빠르게 나누고, 중복된 부분을 제거하고, 가로 비디오를 세로 비디오로 바꿀 수 있습니다.
                                    </div>
                                </div>
                                <div className="flex justify-end max-w-[130px] w-full h-full text-center my-auto">
                                    <Button variant="outline" className="px-8 py-1.5 rounded-sm">
                                        수정
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <div className="mb-1 text-[15px]">설명</div>
                                    <div className="text-gray-400 text-[12px]">{caption.length}/150자</div>
                                </div>
                                <input type="text"
                                       maxLength={150}
                                       className="w-full border p-2.5 rounded-md focus:outline-none"
                                       value={caption}
                                       onChange={(event) => setCaption(event.target.value)}
                                />
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline"
                                        disabled={isUploading}
                                        onClick={() => discard()}
                                        className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
                                >
                                    지우기
                                </Button>

                                <Button disabled={isUploading}
                                        onClick={() => createNewPost()}
                                        className="px-10 py-2.5 mt-8 bg-[#F02C56] hover:bg-[#F02C56] text-[16px] rounded-sm"
                                >
                                    {isUploading ? <BiLoaderCircle className="animate-spin" color="#FFF" size={25} /> : '게시'}
                                </Button>
                            </div>

                            {error ? (
                                <div className="text-red-600 mt-4">
                                    {error.message}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </UploadLayout>
        </>
    );
}

export default Upload;