import React from 'react';
import './CreateAnswer.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';
//import axios from 'axios';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import SelectComment from '../../components/SelectComment';
import SelectUser from '../../components/SelectUser';

import CommentApiService from '../../services/CommentApiService';


import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';
import AnswerApiService from '../../services/AnswerApiService';
class CreateAnswer extends React.Component {

    getLoggedUser = () =>{
        var value = localStorage.getItem("loggedUser");
        var user = JSON.parse(value);
        return user;
    }

    state = {
        user: this.getLoggedUser().name,
        message: '',
        commentId: '',
        authorId: this.getLoggedUser().id,
        answer: ''
    }

    constructor() {
        super();
        this.service = new AnswerApiService();

        this.service2 = new CommentApiService();
    }


    componentDidMount() {
        const params = this.props.match.params;
        const id = params.id;
        console.log("comentário",this.user)
        this.state.commentId = id;
        this.findById(id);
        

    }

    // componentWillUnmount() {
    //     this.clear();
    // }


  
    
    findById = (id) => {
        //axios.get(`http://localhost:8080/api/comment?id=${commentId}`)
        this.service2.find(`?id=${id}`)

            .then(response => {
                const comment = response.data;
                const id = comment[0].id;
                const title = comment[0].title;
                const message = comment[0].message;
                const commentType = comment[0].commentType;
                const user = comment[0].user;
                const departament = comment[0].departament;

                console.log("comment",comment)

                this.setState({ id:id, title:title, message:message, commentType:commentType, user:user, departament:departament});
                
            }

            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    validate = () => {
        const errors = [];

        if (!this.state.answer) {
            errors.push('Campo Mensagem é obrigatório!');
        } else if(!this.state.answer.match(/[A-z 0-9]{10,255}$/)) {
            errors.push('A Mensagem da Resposta deve ter no mínimo 10 e no máximo 255 caracteres!');
        }

        if (!this.state.commentId) {
            errors.push('É obrigatório informar o Comentário que será respondido!');
        }

        if (!this.state.authorId) {
            errors.push('É obrigatório informar o Autor da Resposta!');
        }

        return errors;
    };


    create = async () => {

        const errors = this.validate();

        if (errors.length > 0) {
            errors.forEach((message, index) => {
                showErrorMessage(message);
            });
            return false
        }

        this.service.create(
            {
                message: this.state.answer,
                commentId: this.state.commentId,
                authorId: this.state.authorId
            }
        ).then(response => {
            console.log(response);
            showSuccessMessage('Comentário respondido!');
            this.props.history.push("/viewComments");

        }
        ).catch(error => {
            console.log(error.response);
            // showErrorMessage("O comentário não pode ser respondido!")
        }
        );

        console.log('request finished');
    }

    returned = () => {
        const params = this.props.match.params;
        const id = params.id;

        this.service.returned(id);

        this.props.history.push("/viewComments");
    }

    cancel = () => {
        this.props.history.push("/viewComments");
    }


    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Cadastrar Resposta'>
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
                                                    
                                                   
                                                    
                                                    <br />
                                                    <FormGroup label="Comentario: *" htmlFor="MessageTextarea">
                                                        <textarea type="text" 
                                                        disabled
                                                        className="form-control" id="MessageTextarea" rows="3" minLength="10" maxlength="255"
                                                            placeholder="Incluir resposta"
                                                            value={this.state.message}
                                                            onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Resposta: *" htmlFor="AnswerTextarea">
                                                        <textarea type="text" className="form-control" id="AnswerTextarea" rows="3" minLength="10" maxlength="255"
                                                            placeholder="Incluir resposta"
                                                            value={this.state.answer}
                                                            onChange={(e) => { this.setState({ answer: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Autor da Resposta:" htmlFor="inputCommentTitle">
                                                        <input disabled
                                                        value={this.state.user}
                                                        type="text" className="form-control" id="autoComment"  
                                                         />
                                                    </FormGroup>  
                                                    
                                                    <br />
                                                    <button onClick={this.create} type="button" id="button-answer" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Responder
                                                    </button>
                                                    <button onClick={this.cancel} type="button" id="button-cancel" className="btn btn-danger btn-cancel">
                                                        <i className="pi pi-times"></i> Cancelar
                                                    </button>
                                                    <button onClick={this.returned} type="button" id="button-returned" className="btn btn-returned">
                                                        <i className="pi pi-returned"></i> Devolver
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

export default withRouter(CreateAnswer);