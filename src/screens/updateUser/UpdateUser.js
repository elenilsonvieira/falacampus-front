import React from 'react';
import './UpdateUser.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';
import UserApiService from '../../services/UserApiService';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectDepartament from '../../components/SelectDepartament';

import DepartamentApiService from '../../services/DepartamentApiService';

import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';


class UpdateUser extends React.Component {

    state = {
        id: 0,
        name: '',
        email: '',
        username: '',
        rolesName:'',
        // role: '',
        password: '',
        // username: '',
        // departament: {
        //     departamentId: 0,
        //     name: ''
        // }
        

    }
    constructor() {
        super();
        this.service = new UserApiService();
        
    }

    componentDidMount() {
       
        const params = this.props.match.params;
        const id = params.id;
        this.findById(id);
        this.showEditRole();
       
       
    }
   
    // componentWillUnmount(){select
    //     this.clear();
    // }
    showEditRole = () =>{
        var value =  localStorage.getItem("user");
        var user = JSON.parse(value)
        var role = user['roles']['0']['name']

        console.log("AA", user)
        let a
        if(role === 'ADMIN'){
            a = document.getElementById("papel")
            a.classList.add('show')
           console.log("Foi", role)
        }       
       
    }

    findById = (id) => {
        this.service.find(`?id=${id}`)
            .then(response => {
                console.log(response);
                const user = response.data; 
                
                const id = user[0].id;
                const name = user[0].name;
                const email = user[0].email;
                // const registration = user.registration;
                // const role = user.role;
                // const password = user.password;
                // const departament = user.departament;
                const rolesName = user[0]['roles'][0]['name'];
                const username = user[0].username;
                const password = user[0].password;

                console.log("Dados up", user)
                console.log("Papel  nome", user[0]['roles'][0]['name'])
                // this.setState({ id:id, name:name, email:email, registration:registration, role:role, password:password, departament:departament });

                this.setState({ id:id, name:name, email:email, username:username, rolesName:rolesName, password:password}); 


                this.showPapel(rolesName);               

            }            

            ).catch(error => {
                console.log(error.response);
                console.log(error.message);
            }
            );
            
    }

    showPapel(role){
        if(role === 'ADMIN'){         

           const seletor = document.getElementById('ADMIN')
            seletor.selected = true;

           
        }else if (role === 'STUDENTS'){
            const seletor = document.getElementById('STUDENTS')
            seletor.selected = true;
        }
    }


    // validate = () => {
    //     const errors = [];

    //     if (!this.state.name) {
    //         errors.push('Campo Nome é obrigatório!');
    //     } else if(!this.state.name.match(/[A-z ]{2,50}$/)) {
    //         errors.push('O Nome deve ter no mínimo 2 e no máximo 50 caracteres!');
    //     }

    //     if (!this.state.email) {
    //         errors.push('Campo E-mail é obrigatório!');
    //     } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
    //         errors.push('Informe um E-mail válido!');
    //     }

    //     if (!this.state.registration) {
    //         errors.push('Campo Matrícula é obrigatório!');
    //     }

    //     if (!this.state.role) {
    //         errors.push('É obrigatório informar o Papel!');
    //     }

    //     if (!this.state.password) {
    //         errors.push('Campo Senha é obrigatório!')
    //     } else if(!this.state.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,30}$/)) {
    //         errors.push('A Senha deve ter no mínimo 8 e no máximo 30 caracteres.')
    //         errors.push('A Senha deve conter ao menos um número.')
    //         errors.push('A Senha deve conter ao menos uma letra minúscula.')
    //         errors.push('A Senha deve conter ao menos uma letra maiúscula.')
    //         errors.push('A Senha deve conter ao menos um caractere especial.')
    //     }

    //     // if (!this.state.departamentId) {
    //     //     errors.push('É obrigatório informar o Departamento!');
    //     // }

    //     return errors;
    // };

    update = () => {

      //  const errors = this.validate();

        // if (errors.length > 0) {
        //     errors.forEach((message, index) => {
        //         showErrorMessage(message);
        //     });
        //     return false
        // }

        // await axios.put(`http://localhost:8080/api/user/${this.state.id}`,
        this.service.update(this.state.id,
            {
                "name":this.state.name,
                "email":this.state.email,
                "password":this.state.password,
                "username": this.state.username,
                "departamentId": 1,
                "roles":[{"name":this.state.rolesName}]
               
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Usuário atualizado com sucesso!');
            this.props.history.push("/viewUsers");
        }
        ).catch(error => {
            console.log(error.response);
            showErrorMessage('O usuário não pode ser atualizado!');
        }
        );

        console.log('request finished');
    }

    cancel = () => {
        this.service.delete('/');
        //props.history.push('/');
    }
    //=========

   
    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Atualização de Usuário'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <p>
                                                        <small id="messageHelp" className="form-text text-muted">
                                                            * Todos os campos são obrigatórios.
                                                        </small>
                                                    </p>
                                                    {/* <FormGroup label="Id: *" htmlFor="inputUserId">
                                                        <input type="number" id="inputUserId" disabled={true} className="form-control"
                                                            value={this.state.id} name="id" onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br /> */}
                                                    <FormGroup label="Nome:" htmlFor="inputUserName">
                                                        <input disabled type="text" id="inputUserName" className="form-control" 
                                                            value={this.state.name} name="name"  />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                                        <input type="email"
                                                         id="inputEmail" 
                                                         className="form-control" 
                                                            value={this.state.email} name="email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                                                        {/* <small id="emailHelp" className="form-text text-muted">É obrigatório o uso do e-mail acadêmico.</small> */}
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Matrícula:" htmlFor="inputRegistration">
                                                        <input disabled type="number" id="inputRegistration" className="form-control"
                                                            value={this.state.username} name="registration" onChange={(e) => { this.setState({ registration: e.target.value }) }} />
                                                        
                                                    </FormGroup>
                                                    <div id='papel' className="form-group roles">
                                                        <label htmlFor="selectRole" className="form-label mt-4">Papel: *</label>
                                                        
                                                        <select className="form-select" id="selectRole"                            name="role" onChange={(e) =>{this.setState({rolesName: e.target.value})}}>

                                                            <option>Selecione uma opção</option>

                                                           
                                                            <option id='ADMIN'
                                                            value="ADMIN">ADMINISTRADOR</option>

                                                            
                                                            <option id='STUDENTS'  value="STUDENTS" >ESTUDANTE</option>
                                                            
                                                            
                                                            <option value="TECHNICIAN">TÉCNICO</option>
                                                            <option value="TEACHER">PROFESSOR</option>
                                                            
                                                        </select>
                                                    </div>
                                                    <br />
                                                    {/* <FormGroup label="Senha: *" htmlFor="inputPassword">
                                                        <input type="password" id="inputPassword" className="form-control"
                                                            value={this.state.password} name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                        <small id="passwordHelp" className="form-text text-muted">A senha deve ter no mínimo 8 e no máximo 30 caracteres.</small>
                                                    </FormGroup>
                                                    <br /> */}
                                                    {/* <FormGroup label="Departamento: *" htmlFor="inputDepartamentId">
                                                        <br />
                                                        <SelectDepartament id="select-departament" onChange={this.inputSelectDepartament} />
                                                    </FormGroup> */}
                                                    <br />
                                                    <br />
                                                    <button onClick={this.update} type="button" id="button-save" className="btn btn-success">
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

export default withRouter(UpdateUser);