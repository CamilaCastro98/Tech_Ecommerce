import Link from "next/link"
import { IoChevronBack } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

const GoHomeIcon = () => {
    return (
        <Link href="/" className="flex m-6 items-center">
            <IoChevronBack className="w-6 h-auto text-gray-50" /><FaHome className="w-6 h-auto text-gray-50"/>
        </Link>
    )
}

export default GoHomeIcon