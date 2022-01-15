import NextDocument, { Head, Html, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>Tankstagram</title>
          <link rel="icon" type="image/svg+xml" sizes="any" href="/images/Tankstagram-Logo.svg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
