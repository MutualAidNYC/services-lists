import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    darkTeal: '#283F44',
    darkPurple: '#3C113C',
    lightPink: '#FFEEFF',
    black: '#000000',
    white: '#FFFFFF',
  },
  fonts: {
    body: 'Neue Haas Grotesk Display Pro',
    heading: 'Neue Haas Grotesk Display Pro',
  },
  fontSizes: {
    'heading1': '48px',
    'heading2': '40px',
    'subheading1': '28px',
    'subheading2': '20px',
  },
})
