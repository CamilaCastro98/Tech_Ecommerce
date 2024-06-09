import ButtonFull from '@/components/secondary/ButtonFull'
import Link from 'next/link'
import { MdLogout } from "react-icons/md";
 
export default function NotFound() {
  return (
    <div>
       <div className="min-h-screen flex flex-col items-center text-p-color justify-center bg-gray-50">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl mb-4">Page Not Found</h2>
            <p className="mb-8 text-center">
                Sorry, the page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <Link className="w-64" href="/"><ButtonFull content="Return Home"><MdLogout className="w-5 h-auto mr-1"/></ButtonFull></Link>
        </div>
    </div>
  )
}