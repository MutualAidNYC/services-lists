import { Global } from '@emotion/react'

export const Fonts = (): JSX.Element => {
  return <Global 
    styles={`
      @font-face {
        font-family: 'Neue Haas Grotesk Display Pro';
        src: url('../fonts/NeueHaasDisplay-Roman.eot');
        src: url('../fonts/NeueHaasDisplay-Roman.eot?#iefix') format('embedded-opentype'),
          url('../fonts/NeueHaasDisplay-Roman.woff2') format('woff2'),
          url('../fonts/NeueHaasDisplay-Roman.woff') format('woff'),
          url('../fonts/NeueHaasDisplay-Roman.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Neue Haas Grotesk Display Pro';
        src: url('../fonts/NeueHaasDisplay-Bold.eot');
        src: url('../fonts/NeueHaasDisplay-Bold.eot?#iefix') format('embedded-opentype'),
          url('../fonts/NeueHaasDisplay-Bold.woff2') format('woff2'),
          url('../fonts/NeueHaasDisplay-Bold.woff') format('woff'),
          url('../fonts/NeueHaasDisplay-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
    `} 
  />
}
