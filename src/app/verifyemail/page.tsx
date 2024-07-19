'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function VerifyEmailpage() {
  // const router = useRouter()
  const [token, setToken] = useState("")
  const [verifyied, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async() => {
    try {
      await axios.post("/api/users/verifyemail", {token})
      setVerified(true)
    } catch (error: any) {
      console.log(error.response.data);
      setError(true)
    }
  }

  useEffect(() => {
    const urltoken = window.location.search.split("=")[1]
    setToken(urltoken || "")
    // const { query } = router
    // const urlToken = query.token
  }, [])

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black'>
          {token ? `${token}` : "no token"}
        </h2>
        {
          verifyied && (
            <div>
              <h2 className='p-2 bg-green-500 text-black'>Email verified</h2>
              <Link href={"/login"}>Login</Link>
            </div>
          )
        }
        {
          error && (
            <div>
              <h2 className='p-2 bg-green-500 text-black'>Error</h2>
            </div>
          )
        }
      </div>
    </>
  )
}