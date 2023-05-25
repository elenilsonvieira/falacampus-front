import React from 'react';
import './Login.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../../main/SessionProvider';
import Loader from '../../components/Loader';


class Login extends React.Component {

    state = {
        username: '',
        password: ''
    };
   
    componentDidMount(){
        const footer = document.querySelector('.footer');
        footer.style.position = 'fixed';
        
        if(localStorage.getItem("user")){
            localStorage.removeItem("loggedUser");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.reload();
        }
    }

    login = async() => {
        this.setState({ loading: true });
     
       await this.context.login(
            this.state.username,
            this.state.password

            ).then(user =>
                {  
                    if (user) {
                        console.log(user);
                        showSuccessMessage(`${user.name}, você está logado!`);
                        this.props.history.push('/viewCommentsHome');
    
                    } else if(localStorage.getItem("loggedUser")) {
                        console.log(user);
                        showErrorMessage("Dados incorretos! Login inválido");
                        this.setState({ loading: false });
                        localStorage.clear();
                      
                    } else{
                        const u = user.data;
                    }
    
                }
            ).catch(error =>
                {
                    this.setState({ loading: false });
                    showErrorMessage('Servidor Indisponivel', error);
                    console.log(error);
                }
            );
    }

    render() {
        const { loading } = this.state;
    
        if (loading) {
            return <Loader />;
        }
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Login'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <FormGroup label='Matrícula: *' htmlForm = "inputusername">
                                                        <input type="number" className="form-control"
                                                        id="inputusername" aria-describedby="emailHelp"
                                                        placeholder="Digite sua matrícula de aluno ou servidor"
                                                        value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label='Senha: *' htmlForm = "inputPassword">
                                                        <input type="password" className="form-control"
                                                        id="inputPassword" placeholder="Digite sua senha" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <button onClick={this.login} type="button" id="button-login" className="btn btn-success btn-space">
                                                        <i className="pi pi-save"></i> Entrar
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

Login.contextType = AuthContext;
export default withRouter(Login);