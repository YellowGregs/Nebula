import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 to-black pointer-events-none" />
      
      <Header />
      
      <Hero />
      
      <Footer />
    </div>
  );
};

export default App;
