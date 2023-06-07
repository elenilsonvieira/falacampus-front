import React from 'react';
import './UpdateUser.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import UserApiService from '../../services/UserApiService';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import { showSuccessMessage, showErrorMessage, showWarningMessage } from '../../components/Toastr';


class UpdateUser extends React.Component {

    state = {
        id: 0,
        name: '',
        email: '',
        username: '',
        rolesName:'',
        password: ''
    }

    constructor() {
        super();
        this.service = new UserApiService();
    }

    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        this.findById(id);
    }
    verify = () =>{
        const erro = [];
        if(!this.state.email.match(/^\S+@\S+\.\S+$/)){
          erro.push("Informe email valido");
        }
        return erro;
    }
        
   
    findById = (id) => {
        this.service.find(`?id=${id}`)
            .then(response => {
                const user = response.data; 
                const id = user[0].id;
                const name = user[0].name;
                const email = user[0].email;
                const rolesName = user[0]['roles'][0]['name'];
                const username = user[0].username;
                const password = user[0].password;

                this.setState({ id:id, name:name, email:email, username:username, rolesName:rolesName, password:password}); 
                this.showPapel(rolesName);               
            }            

            ).catch(error => {
               showErrorMessage("Erro. Tente novamente")
                console.log(error.message);
            }
            );
    }

    setSelectedRole() {
        const selectElement = document.getElementById("selectRole");
        const selectedValue = selectElement.value;
        this.setState({rolesName: selectedValue}) ;
    }

    showPapel(role){
        let papel = document.getElementById("papel");
        let seletor = document.getElementById(role);   
        seletor.selected = true;
        papel.classList.add('show')
        
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        if(user.roles[0].name != 'ADMIN'){
            document.getElementById("selectRole").disabled = true;      
        }
    }

    update = () => {
        
        const erro = this.verify();
        if(erro.length > 0){
          erro.forEach((message) =>{
            showErrorMessage(message);
          });
          return false;
        }

       const user ={      
        "name":this.state.name,
        "email":this.state.email,
        "password":this.state.password,
        "username": this.state.username,
        "departamentId": 1,
        "roles":[{"name":this.state.rolesName}]
        }

        this.service.update(this.state.id, user)
        .then(response => {
            showSuccessMessage('Usuário atualizado com sucesso!');
            this.props.history.push("/viewUsers");
        }
        ).catch(error => {
            if(error.response.data === "Cannot be changed, there is only one ADMIN"){
                showWarningMessage('Não pode ser alterado, só existe um ADMIN!');
            }
            else if(error.response.data === "User is not an Admin"){
                showWarningMessage('Usuario não é ADMIN!');
            }
            else if(error.response.data === "User is already ADMIN"){
                showWarningMessage('Usuario já é ADMIN!');
            }
            else{
                showErrorMessage('O usuário não pode ser atualizado!');
            }
        });
    }

    cancel = () => {
        this.props.history.push('/viewUsers');
    }

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
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Matrícula:" htmlFor="inputRegistration">
                                                        <input disabled type="number" id="inputRegistration" className="form-control"
                                                            value={this.state.username} name="registration" onChange={(e) => { this.setState({ registration: e.target.value }) }} />
                                                        
                                                    </FormGroup>
                                                    <div id='papel' className="form-group roles">
                                                        <label htmlFor="selectRole" className="form-label mt-4">Papel: *</label>
                                                        
                                                        <select className="form-select" id="selectRole" name="role" onChange={() =>{this.setSelectedRole()}}>
                                                            <option id='ADMIN' value="ADMIN">ADMINISTRADOR</option>
                                                            <option id='REMOVE' value="REMOVE">REMOVER ADMINISTRADOR</option>
                                                            <option id='STUDENTS' value="STUDENTS" disabled>ESTUDANTE</option>
                                                            <option id='TECHNICIAN' value="TECHNICIAN" disabled>TÉCNICO</option>
                                                            <option id='TEACHER' value="TEACHER" disabled>PROFESSOR</option>
                                                        </select>

                                                    </div>
                                                    <br />
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