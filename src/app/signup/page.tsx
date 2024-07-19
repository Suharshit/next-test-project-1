'use client'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-hot-toast'
import { log } from 'console'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignUp = async() => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data);
      toast.success("Signup success")
      router.push("/login")
    } catch (error: any) {
      setLoading(false)
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
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
        <label htmlFor='username' className='font-semibold text-lg'>Username</label>
        <input 
          type="text" 
          id='username' 
          value={user.username} 
          onChange={(e) => setUser({...user, username: e.target.value})}
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          placeholder='Username...'
        />
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
        <button onClick={onSignUp} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>
          {buttonDisabled ? "Please fill the form" : "Sign Up"}
        </button>
        <Link href={"/login"}>Visit Login</Link>
      </div>
    </>
  )
}