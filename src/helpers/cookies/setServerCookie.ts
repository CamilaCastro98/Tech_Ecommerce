"use server"

import { cookies } from 'next/headers'
 
const setServerCookie = async(value:string) => {

  cookies().set({
    name: 'tokenCookie',
    value: value,
    httpOnly: true,
    path: '/',
  })
}

export default setServerCookie