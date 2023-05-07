import React from 'react';
import './UpdateDepartament.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';
import DepartamentApiService from '../../services/DepartamentApiService';
import UserApiService from '../../services/UserApiService';

class UpdateDepartament extends React.Component {

    state = {
        id: 0,
        name: '',
        id_responsavel: '',
        responsibleUsers: '', 
        users: [] 
    }
    constructor() {
        super();
        this.service = new DepartamentApiService();
        this.serviceUser = new UserApiService();
    }
    componentDidMount() {
        const params = this.props.match.params;       
        const id = params.id;
        this.findById(id);
        this.showEditRole();
        this.findAllUsers();
    }

    showEditRole = () =>{
        let a = document.getElementById("responsible")
        a.classList.add('show')  
    }
    findAllUsers = () =>{
        this.serviceUser.find("?id=&role=&departamentId=undefined")
        .then(response => {
            const users = response.data;
            this.setState({users: users});
        }
        ).catch(error => {
            console.log(error.response);
        });
    }

    compareUsername = (username) =>{
        const str = this.state.responsibleUsers.toString();
        const match = str.match(/Username:\s*(\d+)/);
        const user=  match && match[1]; // obtém o primeiro grupo de captura,
        console.log( username === user); // imprime "202025020025"
        return username === user
    }

   listUsers = () => {
    if (!this.state.users) {
        return <div>Carregando...</div>;
    }
    return(
        
        <select className="form-control" onChange={(event) => { this.setState({ id_responsavel: event.target.value })}}>
            <option value="">Selecione o responsável</option>
            {this.state.users.map((responsavel) => (
               
                <option key={responsavel.id} value={responsavel.id}>{responsavel.name}&nbsp;&nbsp;&nbsp;&nbsp;
                {responsavel.roles[0].name} </option>

            ))}
            {
             <option key="remover" value={null} onClick={() => this.setState({id_responsavel: "null"})}>Remover responsável</option>  
             }
        </select>
         )
    }


    findById = (id) => {
        this.service.find(`?id=${id}`)
            .then(response => {
                const departament = response.data;
                const id = departament[0]['id'];
                const name = departament[0]['name'];
                const responsibleUsers = departament[0]['responsibleUsers']
                this.setState({ id, name, responsibleUsers });
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    update = () => {
        let user = this.state.users.find(responsavel => responsavel.id == this.state.id_responsavel);
       
        let departament1 =  {
            id:this.state.id,
            name: this.state.name,
            responsibleUsers:null
        }  

        if(user != undefined){
           
            departament1 =  {
            id:this.state.id,
            name: this.state.name,
            responsibleUsers:[user['id']]
            }          
            console.log("entrou")
        }

       
        console.log(departament1);
        this.service.update(this.state.id, departament1)
        .then(response => {
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
                                                            {this.listUsers()}
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