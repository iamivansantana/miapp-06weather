import React, { useEffect, useState } from 'react';
import Clima from './components/Clima';
import Error from './components/Error';
import Formulario from './components/Formulario';
import Header from './components/Header';


function App() {

   //state Del Formulario
   const [busqueda,guardarBusqueda]=useState({
    ciudad:'',
    pais:''
});

const [consultar,guardarConsultar]=useState(false);
const [resultado,guardarResultado]=useState({});
const [error,guardarError]=useState(false);



  const {ciudad,pais}=busqueda;

  useEffect(()=>{
    const consultarAPI = async()=>{
      if(consultar){
        const appId ='3231194ee1b3444e6676b38ba6389d48';
        const url = `HTTPS://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        
        const respuesta = await fetch(url);
        const result = await respuesta.json();

        guardarResultado(result);
        guardarConsultar(false);

        //Detecta si hay un error al mostrar resultado
        if(result.cod==="404"){
          guardarError(true); 
        }else{
          guardarError(false);
        }

      }
    }
    consultarAPI();
     
    // eslint-disable-next-line
  },[consultar]);

  let componente;
  if(error){
    componente=<Error mensaje="No hay Resultados" />
  }else{
    componente=<Clima 
                  resultado={resultado}
                />
  }

  return (
    <>
      <Header 
        titulo='Clima Reac App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario 
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar }
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
