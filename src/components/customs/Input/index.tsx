import { ChangeEvent } from "react"

type InputProps = {
    border?: 'rounded-md' | 'rounded-full',
    placeholder?: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string,
    className?: string
}

const Input = ({value, onChange, placeholder, className , type = 'text', border = 'rounded-md'}: InputProps) => {
    return (
        <input  placeholder={placeholder}
                    className={`bg-cs_light border-2 text-cs_purple border-cs_gray w-96 h-10 px-4 py-3.5 focus:outline-none focus:border-cs_purple focus:placeholder-cs_purple ${border} ${className}`}
                    type={type}
                    value={value}
                    onChange={onChange}
        />
    )
    
}
export default Input