'use client'

import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default function Time({ date }) {
    const [timeAgo, setTimeAgo] = useState('')

    useEffect(() => {
        const formatted = formatDistanceToNow(new Date(date)) + ' ago'
        setTimeAgo(formatted)
    }, [date])

    if (!timeAgo) return null // or fallback UI

    return <span>{timeAgo}</span>
}
