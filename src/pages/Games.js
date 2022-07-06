import { useEffect } from 'react';

import React from 'react'

const Games = () => {

    const fetchData = async () => {
        try {
            const response = await fetch('/api/v1')
            const data = await response.json()
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>Games</div>
    )
}

export default Games;