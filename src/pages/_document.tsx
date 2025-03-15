
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Emergency marker script - load early */}
        <script src="/emergencyMarkers.js" defer />
      </Head>
      <body className="min-h-screen bg-[#080F1F] text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
