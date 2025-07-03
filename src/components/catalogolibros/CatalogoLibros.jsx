// Usar data del context para cargar los libros
// Usar un componente CardLibro para mostrar los libros en el catálogo


import './CatalogoLibros.css';
import { useNavigate } from "react-router-dom";
import CardLibro from './CardLibro';



// const libros = [
//   {
//     titulo: 'El gran libro juego del espacio',
//     autor: 'subi',
//     precio: 80,
//     imagen: '/libros/espacio.webp',
//   },
//   {
//     titulo: 'El gran libro juego de las civilizaciones',
//     autor: 'subi',
//     precio: 80,
//     imagen: '/libros/civ.jpg',
//   },
//   {
//     titulo: 'Escapando de la mansión embrujada',
//     autor: 'Unzu,Iker',
//     precio: 80,
//     imagen: '/libros/mansion.jpg',
//   },
//   {
//     titulo: 'Feast',
//     autor: 'León, Pía;Martínez, Malena y Siles, Melissa',
//     precio: 80,
//     imagen: '/libros/feast.jpg',
//   },
//   {
//     titulo: 'Epic History of the Incas',
//     autor: 'A.A. V.V.',
//     precio: 80,
//     imagen: '/libros/incas.jpg',
//   },
//   {
//     titulo: 'Todo está j*dido',
//     autor: 'Mark Manson',
//     precio: 80,
//     imagen: '/libros/todo2.jpg',
//   }
// ];


function CatalogoLibros({ libros, masvendidosLibros }) {
  const navigate = useNavigate();

  // Redirige a la página de detalle del libro
  const irADetalle = (id) => {
    // En el index de la carpeta router se define a donde redirigir
    navigate(`/libros/${id}`);
  };

  return (
    <div className="catalogo-container">
      <div className="banners">
        <img src="https://www.crisol.com.pe/media/wysiwyg/campania-home-d/bnd_banner_secundario_infantil-01-07.jpg" alt="Banner 1" />
        <img src="https://www.crisol.com.pe/media/wysiwyg/campania-home-d/bnd_banner_secundario_hipatia_01-07.jpg" alt="Banner 2" />
        <img src="https://www.crisol.com.pe/media/wysiwyg/campania-home-d/bnd_banner_secundario_juguetes-01-07.jpg" alt="Banner 3" />
      </div>

      {/* Muestra algunos libros , agregar limite */}
      <div className="libros-grid">
        {libros.map((libro, i) => (
          <CardLibro libro={libro} onClick={irADetalle} key={i} />
        ))}
      </div>
      <div className="separador">
        <span>LO MÁS VENDIDO</span>
      </div>
      {/* Muestra los libros mas vendidos (top 6, modificable) */}
      <div className="libros-grid">
        {masvendidosLibros.map((libro, i) => (
          <CardLibro libro={libro} onClick={irADetalle} key={i} />
        ))}
      </div>
    </div>
  );
}

export default CatalogoLibros;

