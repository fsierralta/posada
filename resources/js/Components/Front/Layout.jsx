import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';

const App = ({auth, children }) => {
  return (
    <div >
      <Navbar
         auth={auth}
       />

      <main className="flex-row flex-grow ">
        
        {children} {/* Contenido de la página */}
      </main>
      <Footer />
    </div>
  );
};

export default App;