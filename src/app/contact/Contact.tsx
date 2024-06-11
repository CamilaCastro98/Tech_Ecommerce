import { FaLocationDot } from "react-icons/fa6"
import { FaPhoneAlt,FaFacebook } from "react-icons/fa"
import { IoMdMail } from "react-icons/io";
import GoHomeIcon from "@/components/secondary/GoHomeIcon";

const Contact = () => {
    return(
        <>
        <GoHomeIcon/>
        <div className="flex justify-center">
        <div className=" m-8 pb-4 border border-gray-50 rounded-md">
            <div className="bg-gray-50 w-full p-8">
                <h1 className="text-lg text-p-color font-semibold mb-2">Contact Us!</h1>
                <p className="text-p-color text-base mb-2">Reach out anytime. We are always here to assist with your tech solutions and inquiries</p>
            </div>
            <ul className="text-gray-50 flex flex-col gap-5 p-6">
                <li className="flex gap-4 item-center">
                    <FaLocationDot className="text-gray-50 w-5 h-auto"/>
                    <div>
                        <p className="font-bold">HiWorld Tech</p>
                        <p>
                        1234 Innovation Drive,
                        Suite 567,
                        Tech City,
                        United States
                        </p>
                    </div>
                </li>
                <li className="flex gap-4 item-center">
                    <FaPhoneAlt className="text-gray-50 w-5 h-auto"/>
                    <p>+123-456-7890</p>
                </li>
                <li className="flex gap-4 item-center">
                    <IoMdMail className="text-gray-50 w-5 h-auto"/>
                    <p>hiword@amazingtech.com</p>
                </li>
                <li className="flex gap-4 item-center">
                    <FaFacebook className="text-gray-50 w-5 h-auto"/>
                    <p className="mt-1">HiWorld Tech</p>
                </li>
            </ul>
        </div>
    </div>
        </>
    )
}

export default Contact