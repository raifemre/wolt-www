import { createGlobalStyle } from 'styled-components'

import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      secondary: string
      black: string
      white: string
      green: string
      grey1: string
      grey2: string
      grey3: string
    }
  }
}

export const theme: DefaultTheme = {
  colors: {
    primary: '#009de0',
    secondary: '#009de0',
    black: '#202125',
    white: '#FFFFFF',
    green: '#5BCB02',
    grey1: '#F8F8F8',
    grey2: '#EEEEEE',
    grey3: '#A1A2A4'
  }
}

const GlobalStyles = createGlobalStyle`

  html, body, #__next {
    height: 100%;
    margin: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Roboto", sans-serif;
    text-rendering: optimizeLegibility;
    transition: all 0.50s linear;
  }
`

export default GlobalStyles
