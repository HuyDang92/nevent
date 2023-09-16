export const theme = {
  navbar: {
    styles: {
      base: {
        navbar: {
          initial: {
            display: 'block',
            width: 'w-full',
            maxWidth: 'w-full',
            borderRadius: 'rounded-xl',
            py: 'py-2',
            px: 'px-6',
          },
          shadow: {
            boxShadow: 'shadow-md',
          },
          blurred: {
            backdropFilter: 'backdrop-saturate-200 backdrop-blur-2xl',
            bgOpacity: 'bg-opacity-80',
            borderWidth: 'border',
            borderColor: 'border-white/80',
          },
          fullWidth: {
            width: 'w-full',
            maxWidth: 'max-w-full',
            rounded: 'rounded-none',
            px: 'px-0',
          },
        },
        mobileNav: {
          display: 'block',
          width: 'w-full',
          basis: 'basis-full',
          overflow: 'overflow-hidden',
        },
      },
      variants: {
        filled: {
          transparent: {
            backgroud: 'bg-transparent',
            color: 'text-white',
            boxShadow: 'shadow-none',
          },
          white: {
            backgroud: 'bg-white',
            color: 'text-white',
          },
          'blue-gray': {
            backgroud: 'bg-blue-gray-500',
            color: 'text-white',
          },
          gray: {
            backgroud: 'bg-gray-500',
            color: 'text-white',
          },
          brown: {
            backgroud: 'bg-brown-500',
            color: 'text-white',
          },
          'deep-orange': {
            backgroud: 'bg-deep-orange-500',
            color: 'text-white',
          },
          orange: {
            backgroud: 'bg-orange-500',
            color: 'text-white',
          },
          amber: {
            backgroud: 'bg-amber-500',
            color: 'text-black',
          },
          yellow: {
            backgroud: 'bg-yellow-500',
            color: 'text-black',
          },
          lime: {
            backgroud: 'bg-lime-500',
            color: 'text-black',
          },
          'light-green': {
            backgroud: 'bg-light-green-500',
            color: 'text-white',
          },
          green: {
            backgroud: 'bg-green-500',
            color: 'text-white',
          },
          teal: {
            backgroud: 'bg-teal-500',
            color: 'text-white',
          },
          cyan: {
            backgroud: 'bg-cyan-500',
            color: 'text-white',
          },
          'light-blue': {
            backgroud: 'bg-light-blue-500',
            color: 'text-white',
          },
          blue: {
            backgroud: 'bg-blue-500',
            color: 'text-white',
          },
          indigo: {
            backgroud: 'bg-indigo-500',
            color: 'text-white',
          },
          'deep-purple': {
            backgroud: 'bg-deep-purple-500',
            color: 'text-white',
          },
          purple: {
            backgroud: 'bg-purple-500',
            color: 'text-white',
          },
          pink: {
            backgroud: 'bg-pink-500',
            color: 'text-white',
          },
          red: {
            backgroud: 'bg-red-500',
            color: 'text-white',
          },
        },
        gradient: {
          transparent: {
            backgroud: 'bg-transparent',
            color: 'text-blue-gray-900',
            boxShadow: 'shadow-none',
          },
          white: {
            backgroud: 'bg-white',
            color: 'text-blue-gray-900',
          },
          'blue-gray': {
            backgroud: 'bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400',
            color: 'text-white',
          },
          gray: {
            backgroud: 'bg-gradient-to-tr from-gray-600 to-gray-400',
            color: 'text-white',
          },
          brown: {
            backgroud: 'bg-gradient-to-tr from-brown-600 to-brown-400',
            color: 'text-white',
          },
          'deep-orange': {
            backgroud: 'bg-gradient-to-tr from-deep-orange-600 to-deep-orange-400',
            color: 'text-white',
          },
          orange: {
            backgroud: 'bg-gradient-to-tr from-orange-600 to-orange-400',
            color: 'text-white',
          },
          amber: {
            backgroud: 'bg-gradient-to-tr from-amber-600 to-amber-400',
            color: 'text-black',
          },
          yellow: {
            backgroud: 'bg-gradient-to-tr from-yellow-600 to-yellow-400',
            color: 'text-black',
          },
          lime: {
            backgroud: 'bg-gradient-to-tr from-lime-600 to-lime-400',
            color: 'text-black',
          },
          'light-green': {
            backgroud: 'bg-gradient-to-tr from-light-green-600 to-light-green-400',
            color: 'text-white',
          },
          green: {
            backgroud: 'bg-gradient-to-tr from-green-600 to-green-400',
            color: 'text-white',
          },
          teal: {
            backgroud: 'bg-gradient-to-tr from-teal-600 to-teal-400',
            color: 'text-white',
          },
          cyan: {
            backgroud: 'bg-gradient-to-tr from-cyan-600 to-cyan-400',
            color: 'text-white',
          },
          'light-blue': {
            backgroud: 'bg-gradient-to-tr from-light-blue-600 to-light-blue-400',
            color: 'text-white',
          },
          blue: {
            backgroud: 'bg-gradient-to-tr from-blue-600 to-blue-400',
            color: 'text-white',
          },
          indigo: {
            backgroud: 'bg-gradient-to-tr from-indigo-600 to-indigo-400',
            color: 'text-white',
          },
          'deep-purple': {
            backgroud: 'bg-gradient-to-tr from-deep-purple-600 to-deep-purple-400',
            color: 'text-white',
          },
          purple: {
            backgroud: 'bg-gradient-to-tr from-purple-600 to-purple-400',
            color: 'text-white',
          },
          pink: {
            backgroud: 'bg-gradient-to-tr from-pink-600 to-pink-400',
            color: 'text-white',
          },
          red: {
            backgroud: 'bg-gradient-to-tr from-red-600 to-red-400',
            color: 'text-white',
          },
        },
      },
    },
  },
  menu: {
    defaultProps: {
      placement: 'bottom',
      offset: 5,
      dismiss: {
        itemPress: true,
      },
      animate: {
        unmount: {},
        mount: {},
      },
      lockScroll: false,
    },
    styles: {
      base: {
        menu: {
          bg: 'bg-white',
          minWidth: 'min-w-[180px]',
          p: 'p-3',
          border: 'border border-blue-gray-50',
          borderRadius: 'rounded-md',
          boxShadow: 'shadow-lg shadow-blue-gray-500/10',
          fontFamily: 'font-sans',
          fontSize: 'text-sm',
          fontWeight: 'font-normal',
          color: 'text-blue-gray-500',
          overflow: 'overflow-auto',
          outline: 'focus:outline-none',
          zIndex: 'z-[999]',
          transform: 'translate-x-1/2',
        },
        item: {
          initial: {
            display: 'block',
            width: 'w-full',
            pt: 'pt-[9px]',
            pb: 'pb-2',
            px: 'px-3',
            borderRadius: 'rounded-md',
            textAlign: 'text-start',
            lightHeight: 'leading-tight',
            cursor: 'cursor-pointer',
            userSelect: 'select-none',
            transition: 'transition-all',
            bg: 'hover:bg-cs_purple hover:bg-opacity-80 focus:bg-cs_purple focus:bg-opacity-80 active:bg-cs_purple active:bg-opacity-80',
            color: 'hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900',
            outline: 'outline-none',
          },
          disabled: {
            opacity: 'opacity-50',
            cursor: 'cursor-not-allowed',
            pointerEvents: 'pointer-events-none',
            userSelect: 'select-none',
            bg: 'hover:bg-transparent focus:bg-transparent active:bg-transparent',
            color: 'hover:text-blue-gray-500 focus:text-blue-gray-500 active:text-blue-gray-500',
          },
        },
      },
    },
  },
};
