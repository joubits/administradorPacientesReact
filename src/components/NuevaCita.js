import React, { Component } from 'react';
import uuid from 'uuid';
import Proptypes from 'prop-types';

const stateInicial = {
    cita: {
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    },
    error: false

};
class NuevaCita extends Component {

    state = { ...stateInicial   };
    // when fill the form
    handleChange = (e) => {
        this.setState({
            cita: {
                ...this.state.cita,
                [e.target.name] : e.target.value
            }
        })
    }
    // When the form is sent
    handleSubmit = (e) => {
        e.preventDefault();

        // Get the value of state
        const { mascota, propietario, fecha, hora, sintomas } = this.state.cita;

        // Validate all fields of form
        if( mascota==='' || propietario==='' || fecha==='' || hora==='' || sintomas==='' ) {
            this.setState({
                error: true
            })
            // return
            return;
        }

        // Add cita to the state

        //generar objeto con los datos
        const nuevaCita = { ...this.state.cita }
        nuevaCita.id = uuid();

        this.props.crearNuevaCita(nuevaCita);

        // Setear al state el state Inicial
        this.setState({ 
            ...stateInicial
         })
    }

    render() {
        const { error } = this.state;
        return (
            <div className="card mt-5 py-5">
                <div className="card-body">
                    <h2 className="card-title text-center mb-5">
                        Llena el formulario para crear una nueva cita
                    </h2>

                    { error ? <div className="alert alert-danger mt-2 mb-5 text-center">
                                Todos los campos son obligatorios...</div> : null  }

                    <form onSubmit={ this.handleSubmit }>
                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Mascota</label>
                            <div className="col-sm-8 col-lg-10">
                                <input type="text" name="mascota" className="form-control"
                                    placeholder="Nombre Mascota" 
                                    onChange={this.handleChange} value={this.state.cita.mascota} />
                            </div>
                        </div> { /* form-group */ }

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Nombre Duenio</label>
                            <div className="col-sm-8 col-lg-10">
                                <input type="text" name="propietario" className="form-control"
                                    placeholder="Nombre Duenio Mascota"
                                    onChange={this.handleChange} value={this.state.cita.propietario}/>
                            </div>
                        </div> { /* form-group */ }

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
                            <div className="col-sm-8 col-lg-4">
                                <input type="date" name="fecha" className="form-control"
                                    onChange={this.handleChange} value={this.state.cita.fecha}/>
                            </div>
                        
                            <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
                            <div className="col-sm-8 col-lg-4">
                                <input type="time" name="hora" className="form-control"
                                    onChange={this.handleChange} value={this.state.cita.hora} />
                            </div>
                        </div> { /* form-group */ }

                        <div className="form-group row">
                            <label className="col-sm-4 col-lg-2 col-form-label">Sintomas</label>
                            <div className="col-sm-8 col-lg-10">
                                <textarea className="form-control" 
                                        name="sintomas" 
                                        placeholder="Mencione los sintomas"
                                        onChange={this.handleChange} value={this.state.cita.sintomas} >
                                </textarea>
                            </div>
                        </div> { /* form-group */ }

                        <input type="submit" 
                                value="Agregar Nueva Cita"
                                className="py-3 mt-2 btn btn-success btn-block" />
                    </form>
                </div>
                
            </div>
        );
    }
}

NuevaCita.propTypes = {
    crearNuevaCita : Proptypes.func.isRequired
}

export default NuevaCita;