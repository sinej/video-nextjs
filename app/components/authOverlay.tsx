'use client'

import React, {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {Button} from "@/components/ui/button";
import Register from "@/app/components/auth/register";
import Login from "@/app/components/auth/login";
import {useGeneralStore} from "@/app/stores/general";

const AuthOverlay = () => {
    const [isRegister, setIsRegister] = useState(false);
    let { setIsLoginOpen } = useGeneralStore();

    return (
        <>
            <div id="AuthOverlay"
                 className="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
            >
                <div className="relative bg-white w-full max-w-[470px] h-[70%] rounded-lg">
                    <div className="w-full flex justify-end">
                        <Button size="icon"
                                onClick={() => setIsLoginOpen(false)}
                                className="p-1.5 rounded-full bg-gray-100"
                        >
                            <AiOutlineClose size={26} color="black" />
                        </Button>
                    </div>

                    {isRegister ? <Register /> : <Login />}

                    <div className="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full">
                        <span className="text-[14px] text-gray-400">{!isRegister ? '계정이 없으세요?' : '이미 계정이 있으신가요?'}</span>
                        <Button variant="link"
                                className="text-[#F02C56]"
                                onClick={() => setIsRegister(!isRegister)}
                        >
                            <span>{!isRegister ? '회원가입' : '로그인'}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthOverlay;