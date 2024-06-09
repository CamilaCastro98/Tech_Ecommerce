"use server"

import { cookies } from 'next/headers'
 
const removeServerCookie = async() => {

cookies().delete('tokenCookie')

}

export default removeServerCookie