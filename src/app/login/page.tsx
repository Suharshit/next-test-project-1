'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onLogin = async() => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      console.log("Login success", response.data);
      toast.success("Login success")
      router.push("/profile")
    } catch (error: any) {
      setLoading(false)
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Processing" : "Sign Up"}</h1>
        <br />
        <label htmlFor='email' className='font-semibold text-lg'>Email</label>
        <input 
          type="email" 
          id='email' 
          value={user.email} 
          onChange={(e) => setUser({...user, email: e.target.value})}
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          placeholder='sample@example.com'
        />
        <label htmlFor='password' className='font-semibold text-lg'>Password</label>
        <input 
          type="password"
          id='password' 
          value={user.password} 
          onChange={(e) => setUser({...user, password: e.target.value})}
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          placeholder='password'
        />
        <button onClick={onLogin} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
          {buttonDisabled ? "Please fill the form" : "Log In"}
        </button>
        <Link href={"/Signup"}>Visit Sign Up</Link>
      </div>
    </>
  )
}