import type { AppProps } from 'next/app'
import Head from 'next/head'

import GlobalStyles, { theme } from 'styles/global'
import { ThemeProvider } from 'styled-components'
import { Header } from '@Components'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Wolt Assignment - Opening Hours</title>
        <meta
          name="description"
          content="Wolt Opening Hours React Assignment"
        />
      </Head>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
