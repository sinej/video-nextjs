'use client'

import React, {useState} from 'react';
import {ShowErrorObject} from "@/app/types/type";
import TextInput from "@/app/components/form/textInput";
import {BiLoaderCircle} from "react-icons/bi";
import {useUser} from "@/app/context/user";
import {useRouter} from "next/navigation";
import {useGeneralStore} from "@/app/stores/general";

const Login = () => {

    let { setIsLoginOpen } = useGeneralStore();
    const contextUser = useUser();
    const { refresh } = useRouter();

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | ''>('');
    const [password, setPassword] = useState<string | ''>('');
    const [error, setError] = useState<ShowErrorObject | null>(null);

    const showError = (type: string) => {
        if(error && Object.entries(error).length > 0 && error?.type === type) {
            return error.message
        }
        return "";
    }

    const validate = () => {
        setError(null)
        let isError = false;

       if(!email) {
            setError({ type: 'email', message: '이메일이 필수사항입니다.'})
            isError = true;
        } else if(!password) {
            setError({ type: 'password', message: '비밀번호는 필수사항입니다'})
            isError = true;
        } else if(password.length < 8) {
            setError({ type: 'password', message: '비밀번호는 유효하지 않습니다.'})
            isError = true;
        }
        return isError;
    }


    const login = async () => {
        let isError = validate();
        if(isError)  return;
        if(!contextUser) return;

        try {
            setLoading(true);
            await contextUser.login(email, password);
            setLoading(false);
            setIsLoginOpen(false);
            refresh()
        } catch (error) {
            setLoading(false);
            alert(error);
        }
    }

    return (
        <>
            <div>
                <h1 className="text-center text-[28px] mb-4 font-bold">로그인</h1>

                <div className="px-6 pb-2">
                    <TextInput string={email}
                               inputType={"email"}
                               placeholder={"이메일"}
                               error={showError('email')}
                               onUpdate={setEmail}
                    />
                </div>

                <div className="px-6 pb-2">
                    <TextInput string={password}
                               inputType={"password"}
                               placeholder={"패스워드"}
                               error={showError('password')}
                               onUpdate={setPassword}
                    />
                </div>
                <div className="px-6 pb-2 mt-6">
                    <button disabled={loading}
                            onClick={() => login()}
                            className={`
                            flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                            ${(!email || !password) ? `bg-gray-200` : 'bg-[#F02C56]'}
                            `}
                    >
                        {loading ? <BiLoaderCircle className="animate-spin" color='#FFF' size={25} /> : "로그인"}
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login;