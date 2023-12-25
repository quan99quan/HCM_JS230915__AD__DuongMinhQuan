import React, { useEffect } from 'react'
export default function BackHome() {
    useEffect(() => {
        window.location.href = 'authen'
    }, [])
    return (
        <div>BackHome</div>
    )
}
