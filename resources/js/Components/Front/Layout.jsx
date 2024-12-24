import Navbar from './Navbar';
import Body from './Body';
import Footer from './Footer';

const App = ({auth, children }) => {
  return (
    <div >
      <Navbar
         auth={auth}
       />

      <main>
        
        {children} {/* Contenido de la página */}
       
      </main>
     
    </div>
  );
};

export default App;