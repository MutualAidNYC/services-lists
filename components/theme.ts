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
      50: '#F9FAFB',
      300: '#D0D5DD',
      500: '#667085',
      900: '#101828',
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  fontSizes: {
    heading1: '48px',
    heading2: '40px',
    subheading1: '28px',
    subheading2: '20px',
    subheading3: '16px',
    subtitle: '14px',
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
    Spinner: {
      variants: {
        primary: {
          marginBlock: 4,
          boxSize: '75px',
          color: 'teal',
          thickness: '4px',
          speed: '0.65s',
          emptyColor: 'gray.200',
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'Gray.900',
        fontWeight: 'semibold',
      },
    },
    Button: {
      baseStyle: {
        bg: 'Primary.600',
        background: 'Primary.600',
        color: 'white',
      },
      variants: {
        outline: {
          bg: 'Primary.50',
          background: 'Primary.50',
          color: 'Primary.700',
        },
        ghost: {
          bg: 'transparent',
          background: 'transparent',
          color: 'Gray.500',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: 'white',
          background: 'white',
          border: '1px solid Gray.300',
          borderRadius: '8px',
        },
      },
    },
  },
})
