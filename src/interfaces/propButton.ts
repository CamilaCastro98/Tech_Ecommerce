import React, { ReactNode } from 'react'

interface IPropButton {
    content?: string,
    onClick?: ()=> void
    type?: "button" | "submit" | "reset"
    name?: string
    disabled?: boolean
    tooltipContent?: string
    children?: ReactNode
}
 export default IPropButton