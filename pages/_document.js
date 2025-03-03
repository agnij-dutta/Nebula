import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Nebula - A decentralized platform for intellectual property trading, research project funding, and community governance" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/nebula-logo.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}