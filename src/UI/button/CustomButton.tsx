import style from './CustomButton.module.scss'
import {ButtonHTMLAttributes, ReactNode} from "react";
import cn from 'classnames';


export enum CustomButtonTheme {
    NORMAL = 'normal',
    DISABLED = 'disabled',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    theme?: CustomButtonTheme
    className?: string
    children: ReactNode
    type?: "button" | "submit" | "reset"
}

const CustomButton = (props: ButtonProps) => {
const {theme = CustomButtonTheme.NORMAL,
    children,
    className,
    onClick,
    type = "button",
    disabled= false,
    } = props


    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={cn(style.Button,style[theme], className)} >
            {children}
        </button>
    );
};

export default CustomButton;