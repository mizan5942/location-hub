import "@/styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider } from "../components/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}