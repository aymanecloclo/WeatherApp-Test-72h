// components/DynamicFavicon.tsx
'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../src/redux/store' 

export default function DynamicFavicon() {
    const { theme } = useSelector((state: RootState) => state.weather)

    useEffect(() => {
        const getFaviconPath = () => {
            switch (theme) {
                case 'sunny': return '/favicon/sunny.png'
                case 'rainy': return '/favicon/rainy.png'
                case 'snowy': return '/favicon/snow.png'
                case 'cloudy': return '/favicon/cloudy.png'
                default: return '/favicon/sunny.png'
            }
        }

        const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
        link.type = 'image/x-icon'
        link.rel = 'shortcut icon'
        link.href = getFaviconPath()

        document.head.appendChild(link)
    }, [theme])

    return null
}