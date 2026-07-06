import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <span id="top"></span>
        <PageContent />
      </main>
      <Footer />
    </>
  );
}
