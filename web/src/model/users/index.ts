import React from 'react'


export interface User {
    id: number,
    email: string,
    last_name?: string,
    first_name?: string,
}