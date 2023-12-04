import { authModalState } from '@/atoms/authModelAtom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const handleClick = (type:"login" | "register" | "forgotPassword") => {
        setAuthModalState((prev) => ({ ...prev, type}))
    };
    const [inputs,setInputs] = useState({email:"",password:""});
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
      }
      const router = useRouter();
    // async per roba che deve aspettare api o db calls
      const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return alert("Inserisci sia email che password!");
        try {
            const newUser = await signInWithEmailAndPassword(inputs.email,inputs.password);
            if (!newUser) return;
            router.push("/")
         } catch(error:any){
            toast.error(error.message, { position: "top-center", autoClose:3000, theme:"dark"});
            }
        }

        useEffect(() => {
            if(error) toast.error(error.message, { position: "top-center", autoClose:3000, theme:"dark"});
        })
    
    return <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
        <h3 className="text-x1 font-medium text-white"> Login </h3>

        <div>
            <label htmlFor='email' className="text-sm font-medium block mb-2 text-gray-300">
            Email
            </label>
            <input onChange={handleInputChange} type="email" name="email" id="UEmail"  className="border-2 rounded outline-none sm:text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
        </div>

        <div>
            <label htmlFor='password' className="text-sm font-medium block mb-2 text-gray-300">
            Password
            </label>
            <input onChange={handleInputChange} type="password" name="password" id="UPassword"  className="border-2 rounded outline-none sm:text-sm rounder-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
        </div>

        <button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounder-lg text-sm px5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s rounded">
            {loading ? "Logging..."  : "Login"}</button>
        
        <button className="flex w-ful justify-end" onClick={() => handleClick("forgotPassword")}>
            <a href="#" className="text-sm block text-brand-orange hover:underline w-full text-right">
                Password Dimenticata?
            </a>
        </button>
        
        <button>
            <div className="text-sm font-medium text-gray-500"> Non sei Registrato? <a href="#"  onClick={ () => handleClick("register")} className="text-blue-700 hover:underline"> Crea Account</a></div>

        </button>
        
        </form>
}
export default Login;