import IonIcon from "@reacticons/ionicons"
import { useState, ChangeEvent } from "react"

type SearchBarProps = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    className?: string
}

const SearchBar = ({value, onChange, className}: SearchBarProps) => {
    const [isFocus, setIsFocus] = useState(false)
    const handleFocus = () => {
        setIsFocus(true);
    }
    const handleBlur = () => {
        setIsFocus(false);
    }
    return(
        <>
            <div className="relative inline-block">
                <input  placeholder="Tìm kiếm sự kiện" 
                        className={`bg-cs_light border-2 text-cs_purple border-cs_gray rounded-full w-96 h-10 px-4 py-3.5 focus:outline-none focus:border-cs_purple focus:placeholder-cs_purple ${className}`}
                        type="text"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={value}
                        onChange={onChange}
                />
                <IonIcon name="search-outline" className={`absolute right-3 top-1.5 text-cs_gray text-2xl ${isFocus ? 'text-cs_purple' : ''}`}/>
            </div>
        </>
    )
}

export default SearchBar
