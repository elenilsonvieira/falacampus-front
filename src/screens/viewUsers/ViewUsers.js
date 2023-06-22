import React from 'react';
import './ViewUsers.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import UsersTable from '../../components/UsersTable'
import UserApiService from '../../services/UserApiService';

class ViewUsers extends React.Component {

    getLoggedUser = () =>{
        return JSON.parse(localStorage.getItem("loggedUser"));
    }
   
    state = {
        userLoger: this.getLoggedUser(),
        isAdmin: this.getLoggedUser().roles[0].name,
        name: '',
        id: '',
        email: '',
        username: '',
        role: '',
        departament: {
            departamentId: 0,
            name: ''
        },
        users: [], 
        find: ""
    }
    constructor() {
        super();
        this.service = new UserApiService();
    }
    componentDidMount() { 
        this.find();
        
    }

    order = () =>{
        const ord = this.state.users.sort((a, b) => a.id - b.id);
        this.setState({users: ord});
    }

    delete = (userId) => {
        this.service.delete(userId)
            .then(response => {
                this.find();
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    edit = (userId) => {
        this.props.history.push(`/updateUser/${userId}`);
    }

   
    find () {
        this.service.find("?id=&role=&departamentId=undefined")
            .then(response => {
                const users = response.data;
                this.setState({users});
                this.order();
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    findByUser = () => {
        const filteredUser = this.state.users.filter(user => {
            return user.name.toLowerCase().includes(this.state.find.toLowerCase())
        });
        this.setState({users: filteredUser});
    }

   

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12' style={this.styles.colMd12}>
                        <div className="bs-docs-section">
                            <Card title='Usuários'>
                                <form>
                                    <fieldset>
                                        <FormGroup label="Nome:" htmlFor="inputUserName">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputUserName"
                                            placeholder="Digite o Nome do Usuário"
                                            value={this.state.find}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                this.setState({ find: value }, () => {
                                                if (value === "") {
                                                    this.find();
                                                }
                                                });
                                            }}
                                            />

                                        </FormGroup>

                                        <br />
                                        <button onClick={this.findByUser} type="button" id='idPesquisar' className="btn btn-info">

                                            <i className="pi pi-search"></i> Pesquisar
                                        </button>
                                    
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        <br />
                        <div className="row">

                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <UsersTable users={this.state.users}
                                        delete={this.delete}
                                        usuario={this.state.userLoger}
                                        admin={this.state.isAdmin}
                                        edit={this.edit} id="idEdit"/>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        )
    }
    styles = {
        colMd12: {
            position: 'relative'
        }
    }
}

export default withRouter(ViewUsers);