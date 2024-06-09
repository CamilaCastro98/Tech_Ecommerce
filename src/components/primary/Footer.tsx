const Footer: React.FC = () => {
    return (
<footer className="m-2 border rounded-md shadow-2xl">
    <div className="mt-10 w-full max-w-screen-xl p-4 mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 space-x-3 sm:mb-0 rtl:space-x-reverse">
                <img src="/HiWorldLogo.png" className="h-6" alt="Flowbite Logo" />
                <span className="self-center text-sm whitespace-nowrap text-gray-50">HiWorld</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-sm sm:mb-0">
                <li>
                    <a href="#" className="hover:underline text-gray-50 me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline text-gray-50  me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline text-gray-50 me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline text-gray-50">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="/" className="hover:underline text-t-color">HiWorld</a>. All Rights Reserved.</span>
    </div>
</footer>
    )
}

export default Footer