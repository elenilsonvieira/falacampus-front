import React from 'react';
import './UpdateDepartament.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';

import DepartamentApiService from '../../services/DepartamentApiService';

class UpdateDepartament extends React.Component {

    state = {
        id: 0,
        name: '',
        id_responsavel: '',
        responsibleUsers: ''
    }
    constructor() {
        super();
        this.service = new DepartamentApiService();
    }
    componentDidMount() {
        const params = this.props.match.params;       
        const id = params.id;
        this.findById(id);
        this.showEditRole();
    }

    showEditRole = () =>{
        var value =  localStorage.getItem("user");
        var user = JSON.parse(value)
        var role = user['roles']['0']['name']

        console.log("AA", user)
        let a
        if(role === 'ADMIN'){
            a = document.getElementById("responsible")
            a.classList.add('show')
           console.log("Foi", role)
        }       
       
    }

    findById = (id) => {

        // axios.get(`http://localhost:8080/api/departament?id=${departamentId}`)
        this.service.find(`?id=${id}`)
            .then(response => {
                const departament = response.data;
                const id = departament[0]['id'];
                const name = departament[0]['name'];
                const responsibleUsers = departament[0]['responsibleUsers']

                console.log('Dados', departament[0]['responsibleUsers'])
                this.setState({ id, name, responsibleUsers });
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    validate = () => {
        const errors = [];

        if (!this.state.name) {
            errors.push('Campo Nome é obrigatório!');
        // } else if(!this.state.name.match(/[A-z ]{2,100}$/)) {
        //     errors.push('O Nome do Departamento deve ter no mínimo 2 e no máximo 100 caracteres!');
        }

        return errors;
    };

    update = () => {

        const errors = this.validate();

        if (errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message);
            });
            return false
        }

        //await axios.put(`http://localhost:8080/api/departament/${this.state.id}`,
        this.service.update(this.state.id,
            {
                name: this.state.name,
                "responsibleUsers": [this.state.id_responsavel]
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Departamento atualizado com sucesso!');
            this.props.history.push("/viewDepartaments");

        }
        ).catch(error => {
            console.log(error.response);
            showErrorMessage('O Departamento não pode ser atualizado!');
        }
        );

        console.log('request finished');
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Atualização de Departamento'>
                                <div className='row'>
                                    <div className='col-lg-12' >

                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    {/* <FormGroup label="Id: *" htmlFor="inputId">
                                                        <input type="long" id="inputId" disabled={true} className="form-control"
                                                            value={this.state.id} name="id" onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br /> */}
                                                    <p>
                                                        <small id="messageHelp" className="form-text text-muted">
                                                            * O campo é obrigatório.
                                                        </small>
                                                    </p>
                                                    <FormGroup label='Nome:'>
                                                        <input disabled type="text" className="form-control" id="inputDepartamentName"
                                                            
                                                            value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                        <div className="valid-feedback">Departamento atualizado!</div>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup label="Responsáveis:" htmlFor="inputResponsable">
                                                        <input disabled type="text" id="inputResponsable" className="form-control"
                                                            value={this.state.responsibleUsers} name="responsibleUsers" onChange={(e) => { this.setState({ responsibleUsers: e.target.value }) }} />
                                                        
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <div id='responsible' className='inputRegistration'>
                                                            <label htmlFor="inputRegistration">Adicionar responsavel:*</label>

                                                            <input type="number" id="inputRegistration" className="form-control" placeholder = "Digite o ID do responsável"                    
                                                            value={this.state.username} name="registration" onChange={(e) => { this.setState({ id_responsavel: e.target.value }) }} />
                                                            
                                                        </div>
                                                        
                                                        
                                                    </FormGroup>
                                                    <br />
                                                    <button onClick={this.update} type="button" id="button-update" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Atualizar
                                                    </button>
                                                    <button onClick={this.cancel} type="button" id="button-cancel" className="btn btn-danger btn-cancel">
                                                        <i className="pi pi-times"></i> Cancelar
                                                    </button>

                                                </fieldset>
                                                <div>
                                                    {/* if(this.state.responsibleUsers != null){
                                                        <ResponsavelTable responsavel = {this.state.responsibleUsers}/>
                                                    } */}
                                                    {/* <p>{this.state.responsibleUsers}</p> */}
                                                    
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UpdateDepartament);