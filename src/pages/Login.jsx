import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase/client.jsx'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await supabase.auth.signInWithOtp({ email,
             options: {
                redirectTo: import.meta.env.VITE_URL || 'http://localhost:5173'
             }
             })
            setEmail('')
            alert('Check your email for the login link!')
        } catch (error) {
            console.log('Error logging in', error.message)
        }
    }

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                navigate('/')
            }
        }
        checkUser()
    }, [navigate])

  return (
    <div className='row pt-4'>
        <div className="col-md-4 offset-md-4">
            <form onSubmit={handleSubmit} className='card card-body'>
                <input type="text" name='email' placeholder='youremail@site.com'
                onChange={(e) => setEmail(e.target.value)} value={email}
                className='form-control mb-2'/>
                <button type='submit' className='btn btn-primary btn-sm'>Login</button>
            </form>
        </div>
    </div>
  )
}
