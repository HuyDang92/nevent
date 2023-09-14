import { useState, ChangeEvent } from "react"
import IonIcon from "@reacticons/ionicons"

type InputProps = {
    icon: string // require props icon
    border?: 'rounded-md' | 'rounded-full',
    placeholder?: string,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string,
    className?: string,
}

const InputV2 = ({icon, value, onChange, placeholder, className , type = 'text', border = 'rounded-md'}: InputProps) => {
    const [isFocus, setIsFocus] = useState(false)
    const handleFocus = () => {
        setIsFocus(true);
    }
    const handleBlur = () => {
        setIsFocus(false);
    }
    return (
        <div className="relative inline-block">
            <IonIcon name={icon} className={`absolute left-3 top-2 text-cs_gray text-2xl ${isFocus ? 'text-cs_purple' : ''}`}/>
            <input  placeholder={placeholder}
                        className={`bg-cs_light border-2 text-cs_purple border-cs_gray w-64 h-10 px-10 py-3.5 focus:outline-none focus:border-cs_purple focus:placeholder-cs_purple ${border} ${className}`}
                        type={type}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={value}
                        onChange={onChange}
            />
        </div>
    )
    
}
export default InputV2