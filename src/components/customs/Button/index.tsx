import React from 'react'
import { motion } from 'framer-motion'

type ButtonProps = {
    className?: string,
    children: React.ReactNode,
    type?: 'button' | 'submit' | 'reset'
}

const Button = ({ className, children, type = 'button' }: ButtonProps) => {
    return (
        <motion.button
            className={`bg-black text-white px-4 py-2 rounded-md ${className}`}
            whileTap={{ scale: 0.9 }}
            type={type}
        >
            {children}
        </motion.button>
    )
}

export default Button