
import './bootstrap.min.css';
import React, { Component } from 'react';
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component {
  state = {
    citas: []
  }

  // Guardar en el storage lifecycle components
  // When App loads
  componentDidMount() {
    const citasLS = localStorage.getItem('citas');
    if(citasLS) {
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }

  // When remove or create new Date
  componentDidUpdate(){
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }



  // Crea una nueva cita
  crearNuevaCita = (datos) => {
    // console.log(datos);
    // Copy the actual state
    const citas = [...this.state.citas, datos]

    // Add the new state
    this.setState({
      citas: citas
    })
  }

  // Elimina una cita del state
  eliminarCita = id => {
    //console.log(id);
    // Hacer una copia del state
    const citasActuales = [...this.state.citas];

    // Filter the cita id different to selected or clicked
    const citas = citasActuales.filter( cita =>  cita.id !== id  ); 

    // Update the state
    this.setState({
      citas
    })
  }
  render() {
    return (
      <div className="container">
        <Header 
          titulo="Administrador Pacientes Veterinarias" />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita 
              crearNuevaCita={ this.crearNuevaCita } />
          </div>

          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas citas={ this.state.citas } eliminarCita={ this.eliminarCita } />
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default App;
