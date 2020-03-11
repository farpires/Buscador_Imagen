import React,{ useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'

//vamos agregar un paginador para ellos 
// tenemos que tener dos piezas de state 
// 1 nos va a decir en que pagina nos encontramos
//2 y otro que va a estar atento y nos dira cuantas paginas tenemos en total
function App() {
  //state de la app
  const [busqueda, guardarBusqueda ] = useState('');
  const [imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guadarTotalPaginas ] = useState(1);


   useEffect(()=>{
         const consultarapi= async ()=>{
          if (busqueda === '') return;

          //porpaginador
          const imagenesPorPagina = 30;
          const key = '15033732-dcd583e959a2a38874616d093';
          const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          guardarImagenes(resultado.hits)
          //caluclr el total de paginas
          const calcularTotaldePaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
          guadarTotalPaginas(calcularTotaldePaginas);
          //Mover la pnatalla hacia arriba
          const jumbotron = document.querySelector('.jumbotron');
          jumbotron.scrollIntoView({behavior: 'smooth'});
      }
    consultarapi();
  },[busqueda,paginaactual])

  //definir pagina anterior
  const paginaAnterior = () =>{
      const  nuevaPaginaActual = paginaactual - 1; 
      if(nuevaPaginaActual === 0 )return;
      guardarPaginaActual(nuevaPaginaActual);
  }
  const paginaSiguiente = () =>{
    const  nuevaPaginaActual = paginaactual + 1; 
    if(nuevaPaginaActual > totalpaginas )return;
    guardarPaginaActual(nuevaPaginaActual);
}
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario 
        guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
      <ListadoImagenes 
        imagenes={imagenes}
        />
      {(paginaactual === 1) ? null :(
        <button 
        type="button" 
        className="bbtn btn-info mr-1"
        onClick={paginaAnterior}
        >&laquo; Anterior</button>
        )}
         {(paginaactual === totalpaginas)? null:(
          <button 
          type="button" 
          className="bbtn btn-info"
          onClick={paginaSiguiente}
          >Siguiente &raquo;</button>)
         }

      </div>

    </div>
   
  );
}

export default App;
