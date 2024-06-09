"use client";
import isAuthenticated from "@/utils/isAuth";
import { useEffect, useState } from "react";
import IPropButton from "@/interfaces/propButton";

const ButtonFull: React.FC<IPropButton> = ({ content, type, name, onClick, disabled,tooltipContent,children }) => {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        setIsAuth(isAuthenticated())
    }, [])

    return (
        name === "cart" && !isAuth ? null :
            <div>
                <button
                    {...(disabled ? { "data-tooltip-target": "tooltip-light" } : {})}
                    data-tooltip-style="light"
                    onClick={onClick}
                    name={name}
                    type={type}
                    className={`bg-t-color flex items-center justify-center w-full text-sm rounded-sm border-p-color text-p-color sm:text-base font-normal px-2 p-1 hover:bg-green-800 ${disabled ? "bg-gray-400 cursor-not-allowed" : ""}`}
                >
                    {children}
                    <p>{content}</p>
                    
                </button>
                {disabled && 
                <> 
                 <div id="tooltip-light" role="tooltip" className="absolute text-sm z-10 invisible inline-block px-3 py-2 sm:text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip">
                    {tooltipContent}
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                </>}
              
            </div>
    );
};

export default ButtonFull;
