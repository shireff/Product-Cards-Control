import { HTMLAttributes } from "react"

/* eslint-disable no-empty-pattern */
interface Iprops extends HTMLAttributes<HTMLSpanElement> {
    color: string
    // onClick: () => void
}

const CircleColor = ({ color, ...rest }: Iprops) => {
    
    return (
        <span className={`block rounded-full w-[25px] h-[25px] cursor-pointer`} style={{ backgroundColor: color }} {...rest} />
    )
}

export default CircleColor