'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const PrivateRoute = ({ children }) => {
    const router = useRouter()
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('firstLogin')

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/login')
        }
    }, [isAuthenticated, router])

    if (!isAuthenticated) return null
    return children
}

export default PrivateRoute;