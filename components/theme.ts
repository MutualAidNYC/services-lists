import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    darkTeal: '#283F44',
    darkPurple: '#3C113C',
    lightPink: '#FFEEFF',
    lightGray: '#F1F1F1',
    black: '#000000',
    white: '#FFFFFF',
    Primary: {
      50: '#E3FCF5',
      500: '#20A1A8',
      600: '#178090',
      700: '#106178',
      800: '#0A4761',
    },
    Gray: {
      500: '#667085',
      900: '#101828',
    },
  },
  fonts: {
    body: 'Neue Haas Grotesk Display Pro',
    heading: 'Neue Haas Grotesk Display Pro',
  },
  fontSizes: {
    heading1: '48px',
    heading2: '40px',
    subheading1: '28px',
    subheading2: '20px',
    subheading3: '16px',
  },
  styles: {
    global: {
      body: {
        color: 'Gray.500',
      },
    },
  },
  components: {
    Text: {
      variants: {
        clickable: {
          cursor: 'pointer',
          _hover: {
            fontWeight: 'bold',
            textDecoration: 'underline',
          },
        },
      },
    },
    Divider: {
      variants: {
        thick: {
          border: '2px solid gray.300',
          borderRadius: 10,
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'Gray.900',
      },
    },
  },
})
