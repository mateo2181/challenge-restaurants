import React from 'react'

type CustomInputProps = {
  type: string,
  name: string,
  label?: string,
  inputStyle?: 'black' | 'white';
};

export default function CustomInput({ inputStyle = 'white', type, name, label, ...rest }: CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>) {


  return (
    <div>
      {label &&
        <label htmlFor={name} className={`${inputStyle === 'white' ? 'text-white' : 'text-black'} font-semibold text-lg block mb-2`}>{label}</label>
      }
      <input
        className={`bg-transparent text-lg border rounded-3xl block w-full px-6 py-3 
                  ${inputStyle === 'white' ? 'focus:outline-white text-white border-white' : 'focus:outline-black text-black border-black'}`}
        type={type}
        name={name}
        {...rest}
      />
    </div>
  )
}
