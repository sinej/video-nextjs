'use client'

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {UploadError} from "@/app/types/type";
import UploadLayout from "@/app/layouts/uploadLayout";
import {BiLoaderCircle, BiSolidCloudUpload} from "react-icons/bi";

const Upload = () => {
    const { push } = useRouter();

    const [fileDisplay, setFileDisplay] = useState<string>('');
    const [caption, setCaption] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<UploadError | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const files = event.target.files;

        if(files && files.length > 0) {
            const file = files[0];
            const fileUrl = URL.createObjectURL(file);
            setFileDisplay(fileUrl);
            setFile(file);
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
                                <label htmlFor="file"
                                       className="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center
                                       w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed
                                       border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
                                >
                                    <BiSolidCloudUpload size={40} color="b3b3b1" />
                                    <p className="mt-4 text-[17px]">업로드할 비디오 선택</p>
                                    <p className="mt-1.5 text-gray-500 text-[13px]">또는 파일을 드래그 앤 드롭하세요.</p>
                                    <p className="mt-12 text-gray-400 text-sm">MP4</p>
                                    <p className="mt-2 text-gray-400 text-[13px]">최대 30분</p>
                                    <p className="mt-2 text-gray-400 text-[13px]">2GB 미만</p>
                                    <label htmlFor="file"
                                           className="px-2 py-1.5 mt-8 text-white text-[15px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer"
                                    >
                                        파일 선택
                                    </label>
                                    <input type="file"
                                           id="file"
                                           onChange={handleChange}
                                           hidden
                                           accept=".mp4"
                                    />
                                </label>
                            ) : (
                                <div className="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center
                                w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative">
                                    {!isUploading ? (
                                            <div className="absolute flex items-center justify-center z-20 bg-black w-full h-full rounded-[50px] bg-opacity-50">
                                                <div className="mx-auto flex items-center justify-center gap-1">
                                                    <BiLoaderCircle className="animate-spin" color="#F12B56" size={30} />
                                                    <div className="text-white font-bold">Uploading...</div>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </UploadLayout>
        </>
    );
}

export default Upload;