import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {CropperDimensions, ShowErrorObject} from "@/app/types/type";
import {Cropper} from "react-advanced-cropper";
import 'react-advanced-cropper/dist/style.css';
import {Button} from "@/components/ui/button";
import {AiOutlineClose} from "react-icons/ai";
import Image from "next/image";
import {BsPencil} from "react-icons/bs";
import TextInput from "@/app/components/form/textInput";
import Textarea from "@/app/components/form/textarea";
import {BiLoaderCircle} from "react-icons/bi";
import {useProfileStore} from "@/app/stores/profile";
import {useGeneralStore} from "@/app/stores/general";
import {UseUser} from "@/app/context/user";
import UseUpdateProfile from "@/app/hooks/useUpdateProfile";
import UseChangeUserImage from "@/app/hooks/useChangeUserImage";
import UseUpdateProfileImage from "@/app/hooks/useUpdateProfileImage";
import UseCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
//
// interface Props {
//     handleEditProfileClose: () => void;
// };

const EditProfileOverlay = () => {

    let { currentProfile, setCurrentProfile } = useProfileStore()
    let { setIsEditProfileOpen } = useGeneralStore();
    const contextUser = UseUser();
    const { refresh } = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [cropper, setCropper] = useState<CropperDimensions | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [userImage,setUserImage ] = useState<string | ''>('');
    const [userName,setUserName ] = useState<string | ''>('');
    const [userBio, setUserBio] = useState<string | ''>('');
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [error, setError] = useState<ShowErrorObject | null>(null);

    useEffect(() => {
        setUserName(currentProfile?.name || '');
        setUserBio(currentProfile?.bio || '');
        setUserImage(currentProfile?.image || '');
    }, []);
    const handleUploadedProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setUploadedImage(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setUploadedImage(null);
        }
    }

    const updateUserInfo = async () => {
        let isError = validate();
        if(isError) return;
        if(!contextUser?.user) return;

        try {
            setIsUpdating(true);
            await UseUpdateProfile(currentProfile?.id || '', userName, userBio);
            setCurrentProfile(contextUser?.user?.id)
            setIsEditProfileOpen(false)
            refresh();
        } catch (error) {
            console.log("error", error);
            throw error;
        }
    }

    const validate = () => {
        setError(null)
        let isError = false;

        if(!userName) {
            setError({ type: 'email', message: '이름은 필수사항입니다.'})
            isError = true;
        }
        return isError;
    }

    const showError = (type: string) => {
        if(error && Object.entries(error).length > 0 && error?.type === type) {
            return error.message
        }
        return "";
    }

    const cropUpdateImage = async () => {
        let isError = validate();
        if(isError) return;
        if(!contextUser?.user) return

        try {
            if(!file) return alert("파일이 없습니다.");
            if(!cropper) return alert("파일이 없습니다.");
            setIsUpdating(true);
            const newImageId = await UseChangeUserImage(file, cropper, userImage);
            await UseUpdateProfileImage(currentProfile?.id || '', newImageId);

            await contextUser.checkUser();
            setCurrentProfile(contextUser?.user?.id);
            setIsEditProfileOpen(false);
            setIsUpdating(false);
        } catch (error) {
            console.log("error", error)
            setIsUpdating(false);
            alert(error);
        }
    }

    return (
        <>
            <div id="EditProfileOverlay"
                 className="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto"
            >
                <div className={`relative bg-white w-full max-w-[700px] sm:h-[655px] h-[655px] mx-3 p-4 rounded-lg mb-10
                ${!uploadedImage ? `h-[655px]` : `h-[580px]`}
                `}>
                    <div className="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300">
                        <h1 className="text-[22px] font-medium">
                            프로필 편집
                        </h1>
                        <Button variant="link"
                                size="icon"
                                disabled={isUpdating}
                                onClick={() => setIsEditProfileOpen(false)}
                        >
                            <AiOutlineClose size={25} />
                        </Button>
                    </div>

                    <div className={`h-[calc(500px-200px)] ${!uploadedImage ? `mt-16` : `mt-[58px]`}`}>
                        {!uploadedImage ? (
                            <div>
                                <div id="ProfilePhotoSection"
                                     className="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full"
                                >
                                    <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-center">
                                        프로필 사진
                                    </h3>

                                    <div className="flex items-center justify-center sm:mt-6">
                                        <label htmlFor="image"
                                               className="relative cursor-pointer"
                                        >
                                            <Image src={UseCreateBucketUrl(userImage)}
                                                   alt={userName}
                                                   className="rounded-full w-[95px] h-[95px]"
                                                   width={95}
                                                   height={95}
                                            />
                                            <Button variant="link"
                                                    size="icon"
                                                    className="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px] h-[32px]">
                                                <BsPencil size={17} className="ml-0.5" />
                                            </Button>
                                        </label>
                                        <input type="file"
                                               className="hidden"
                                               id="image"
                                               onChange={handleUploadedProfileImage}
                                               accept="image/png, image/jpg, image/jpeg"
                                        />
                                    </div>
                                    <div id="UserNameSection"
                                         className="flex flex-col border-b sm:h-[118px] px-1.5 py-2 mt-1.5 w-full"
                                    >
                                        <h3 className="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                                            이름
                                        </h3>
                                        <div className="flex items-center justify-center sm:-mt-6">
                                            <div className="sm:w-[60%] w-full max-w-md">
                                                <TextInput string={userName}
                                                           placeholder="Username"
                                                           onUpdate={setUserName}
                                                           inputType="text"
                                                           error={showError('userName')}
                                                />

                                                <p className={`relative text-[11px] text-gray-500 ${error ? 'mt-1' : 'mt-4'}`}>
                                                    사용자 이름에는 문자, 숫자, 밑줄, 마침표만 포함할 수 있습니다. 사용자 이름을 변경하면 프로필 링크도 변경됩니다.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="UserBioSection"
                                         className="flex flex-col sm:h-[120px] px-1.5 py-2 mt-2 w-full"
                                    >
                                        <h3 className="font-semibold text-[15px] sm:mb-0 text-gray-700 sm:w-[160px] sm:text-left text-center">
                                            설명
                                        </h3>
                                        <div className="flex items-center justify-center sm:-mt-6">
                                            <div className="sm:w-[60%] w-full max-w-md">
                                                <Textarea id="bioTextarea"
                                                          name="bio"
                                                          cols={30}
                                                          rows={4}
                                                          onChange={e => setUserBio(e.target.value)}
                                                          value={userBio || ""}
                                                          maxLength={80}
                                                          className="resize-none w-full bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full max-h-[420px] mx-auto bg-black circle-stencil">
                                <Cropper stencilProps={{ aspectRatio: 1 }}
                                         className="h-[400px]"
                                         onChange={(cropper) => setCropper(cropper.getCoordinates())}
                                         src={uploadedImage}
                                />
                            </div>
                        )}

                    </div>
                    <div id="buttonSelection" className="absolute p-5 left-0 bottom-0 border-t border-t-gray-300 w-full">
                        {!uploadedImage ? (
                            <div id="UpdateInfoButtons"
                                 className="flex items-center justify-end w-full"
                            >
                                <Button variant="outline"
                                        disabled={isUpdating}
                                        onClick={() => setIsEditProfileOpen(false)}
                                        className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
                                >
                                    <span className="px-2 font-medium text-[15px]">취소</span>
                                </Button>

                                <Button disabled={isUpdating}
                                        onClick={() => updateUserInfo()}
                                        className="flex items-center border rounded-sm px-3 py-[6px] ml-3"
                                >
                                    <span className="px-2 font-medium text-[15px]">
                                        {isUpdating ? <BiLoaderCircle color="#FFF" className="my-1 mx-2.5 animate-spin" /> : "저장"}
                                    </span>
                                </Button>


                            </div>
                        ) : (
                            <div id="CropperButtons"
                                 className="flex items-center justify-end w-full"
                            >
                                <Button variant="outline"
                                        onClick={() => setUploadedImage(null)}
                                        disabled={isUpdating}
                                        className="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100"
                                >
                                    <span className="px-2 font-medium text-[15px]">취소</span>
                                </Button>

                                <Button disabled={isUpdating}
                                        onClick={() => cropUpdateImage()}
                                        className="flex items-center border rounded-sm px-3 py-[6px] ml-3"
                                >
                                    <span className="px-2 font-medium text-[15px]">
                                        {isUpdating ?
                                            <BiLoaderCircle color="#FFF" className="my-1 mx-2.5 animate-spin"/> : "적용"}
                                    </span>
                                </Button>


                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProfileOverlay;