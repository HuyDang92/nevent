import React from 'react'
import { motion } from 'framer-motion'

type ButtonProps = {
    className?: string,
    value: React.ReactNode,
    type?: 'button' | 'submit' | 'reset'
}

const Button = ({ className, value, type = 'button' }: ButtonProps) => {
    return (
        <motion.button
            className={`px-4 py-2 ${className}`}
            whileTap={{ scale: 0.9 }}
            type={type}
        >
            {value}
        </motion.button>
    )
}

export default Button