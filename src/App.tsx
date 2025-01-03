import { Header } from './components/Header';
import { Hero } from './components/Hero';
// import { Features } from './components/Cards';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 to-black pointer-events-none" />
      
      <Header />

      <div className="relative">
        <main>
          <Hero />
          {/* <Features /> */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
