import "@/styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <meta property="og:site_name" content="Locafacts" />
        <meta property="og:image" content="https://locafacts.com/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://locafacts.com/images/og-image.jpg" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}