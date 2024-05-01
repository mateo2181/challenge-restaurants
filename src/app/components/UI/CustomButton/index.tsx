import React from 'react'
import Loading from '@/app/components/UI/Loading';

type CustomButtonProps = {
    loading?: boolean;
    disabled?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
    children: React.ReactNode;
};

export default function CustomButton({ loading, disabled, type, children, ...rest }: CustomButtonProps & React.InputHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            disabled={disabled}
            type={type}
            className={`flex gap-2 items-center text-lg text-white px-6 py-3 border border-white rounded-2xl enabled:hover:text-primary enabled:hover:bg-white transition-all duration-300 ${disabled && 'cursor-not-allowed'}`}
            {...rest}
        >
            {loading && <Loading />}
            {children}
        </button>
    )
}
