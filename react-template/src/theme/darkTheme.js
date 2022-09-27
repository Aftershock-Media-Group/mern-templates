import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '32em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
})

const colors = {
  sec: {
    100: '#373d4a',
    150: '#2f333d',
    200: '#22252b',
    300: '#17191D',
    400: '#0e1012',
  },
  grey: {
    100: '#fafafa',
    200: '#c7c7c7',
    300: '#a3a3a3',
  },
  input: {
    100: '#474747',
  },
  border: {
    25: '#323232',
    50: '#474747',
    75: '#505050',
    100: '#555',
  },
  pr: {
    100: '#ec8c10',
    200: '#e85900',
  },
  blue: {
    100: '#4694ff',
    200: '#2367cc',
  },
  green: {
    50: '#5bd91c',
    100: '#00a300',
  },
  red: {
    50: '#d05f5f',
    100: '#d64141',
  },
  gold: {
    100: '#fee3ae',
  },
}

const sizes = {}

export const darkTheme = extendTheme({
  colors,
  sizes,
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
  shadows: { outline: '0 !important' },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  breakpoints,
})
