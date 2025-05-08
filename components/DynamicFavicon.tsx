// components/DynamicFavicon.tsx
'use client'

import { useEffect } from 'react'
import { useAppSelector } from '@/lib/hooks'

export default function DynamicFavicon() {
    const { theme } = useAppSelector((state) => state.weather)

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

        // Type the link element properly
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link') as HTMLLinkElement
        link.type = 'image/x-icon'
        link.rel = 'shortcut icon'
        link.href = getFaviconPath()

        document.head.appendChild(link)
    }, [theme])

    return null
}