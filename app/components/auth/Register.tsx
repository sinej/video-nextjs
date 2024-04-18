import { useGeneralStore } from "@/app/stores/general";
import TextInput from "../TextInput";
import { useState } from "react";
import { ShowErrorObject } from "@/app/types";
import { useUser } from "@/app/context/user";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function Register() {
    let { setIsLoginOpen } = useGeneralStore();

    const contextUser = useUser()
    const router = useRouter()

    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string | ''>('');
    const [email, setEmail] = useState<string | ''>('');
    const [password, setPassword] = useState<string | ''>('');
    const [confirmPassword, setConfirmPassword] = useState<string | ''>('');
    const [error, setError] = useState<ShowErrorObject | null>(null)

    const showError = (type: string) => {
        if (error && Object.entries(error).length > 0 && error?.type == type) {
            return error.message
        }
        return ''
    }

    const validate = () => {
        setError(null)
        let isError = false

        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!name) {
            setError({ type: 'name', message: '이름이 필수사항입니다.'})
            isError = true
        } else if (!email) {
            setError({ type: 'email', message: '이메일이 필수사항입니다.'})
            isError = true
        } else if (!reg.test(email)) {
            setError({ type: 'email', message: '이메일이 유효하지 않습니다.'})
            isError = true
        } else if (!password) {
            setError({ type: 'password', message: '비밀번호는 필수사항입니다.'})
            isError = true
        } else if (password.length < 8) {
            setError({ type: 'password', message: '비밀번호는 유효하지 않습니다.'})
            isError = true
        } else if (password != confirmPassword) {
            setError({ type: 'password', message: '비밀번호가 일치하지 않습니다.'})
            isError = true
        }
        return isError
    }

    const register = async () => {
        let isError = validate()
        if (isError) return
        if (!contextUser) return

        try {
            setLoading(true)
            await contextUser.register(name, email, password)
            setLoading(false)
            setIsLoginOpen(false)
            router.refresh()
        } catch (error) {
            console.log(error)
            setLoading(false)
            alert(error)
        }
    }

    return (
        <>
            <div>
                <h1 className="text-center text-[28px] mb-4 font-bold">회원가입</h1>

                <div className="px-6 pb-2">

                    <TextInput 
                        string={name}
                        placeholder={"이름"}
                        onUpdate={setName}
                        inputType="text"
                        error={showError('name')}
                    />
                    
                </div>

                <div className="px-6 pb-2">

                    <TextInput 
                        string={email}
                        placeholder={"이메일 주소"}
                        onUpdate={setEmail}
                        inputType="email"
                        error={showError('email')}
                    />
                    
                </div>

                <div className="px-6 pb-2">
                    <TextInput 
                        string={password}
                        placeholder={"패스워드"}
                        onUpdate={setPassword}
                        inputType="password"
                        error={showError('password')}
                    />
                </div>

                <div className="px-6 pb-2">
                    <TextInput 
                        string={confirmPassword}
                        placeholder={"패스워드 확인"}
                        onUpdate={setConfirmPassword}
                        inputType="password"
                        error={showError('confirmPassword')}
                    />
                </div>

                <div className="px-6 pb-2 mt-6">
                    <button 
                        disabled={loading}
                        onClick={() => register()} 
                        className={`
                            flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                            ${(!name || !email || !password || !confirmPassword) ? 'bg-gray-200' : 'bg-[#F02C56]'}
                        `}
                    >
                        {loading ? <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} /> : '회원가입 완료'}
                    </button>
                </div>
            </div>
        </>
    )
}
