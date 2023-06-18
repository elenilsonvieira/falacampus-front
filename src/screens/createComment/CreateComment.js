import React from 'react';
import './CreateComment.css';
import '../../components/Style.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import CommentApiService from '../../services/CommentApiService';
import {showSuccessMessage, showErrorMessage, showWarningMessage} from '../../components/Toastr';
import Global from './Global';
import DepartamentApiService from '../../services/DepartamentApiService';
import { error } from 'toastr';

class CreateComment extends React.Component {
    getLoggedUser = () =>{
        return JSON.parse(localStorage.getItem("loggedUser"));
    }
    state = {
        user: this.getLoggedUser(),
        title: '',
        message: '',
        commentType: '',
        creationDate: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
        authorId: this.getLoggedUser().id,
        departamentId: "",
        departaments:[        
        ]
    }

     constructor(){
        super();
        this.service = new CommentApiService();
        this.serviceDepartaments = new DepartamentApiService();
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.findAllDepar();
    }
   
    handleChange(){
        let inputField = document.getElementById('input');
        let ulField = document.getElementById('suggestions');
        inputField.addEventListener('input', changeAutoComplete);
        ulField.addEventListener('click', selectItem);
      
        function changeAutoComplete({ target }) {
          let data = target.value;
          ulField.innerHTML = ``;
          if (data.length) {
            let autoCompleteValues = autoComplete(data);
            autoCompleteValues.forEach(value => { addItem(value); });
          }
        }
      
        function autoComplete(inputValue) {
            const departaments = Global.departaments
            const p = departaments.filter((d) => d.name.toLowerCase().includes(inputValue.toLowerCase()));
          return p
        }
      
        function addItem(value) {
          ulField.innerHTML = ulField.innerHTML + `<li class="departament">${value['name']}</li>`;
        }
      
        function selectItem({ target }) {
          if (target.tagName === 'LI') {
            inputField.value = target.textContent;
            ulField.innerHTML = ``;
          }
        }
      };

    

    create = async () => {
        for (const element of this.state.departaments) {
            if(element.name === document.getElementById('input').value){
                this.state.departamentId = element.id;
            }
        }

        const comment = {
            title: this.state.title,
            message: this.state.message,
            commentType: this.state.commentType,
            authorId: this.state.user["id"],
            departamentId: this.state.departamentId
            
        }

        this.service.create(comment)
        
        .then(response => {
            showSuccessMessage('Comentário criado com sucesso!');
            this.props.history.push("/viewComments");   
        })
        .catch(error => {
            console.log(error.response);

            console.log("CommentType" + comment.commentType);


            if(error.response.data ==="Responsible not exist!"){
                showErrorMessage("No momento não existe responsavel pelo departamento! Tente mais tarde")
            }else if(comment.title.length < 5 || comment.title.length > 50){
                showErrorMessage('Titulo Incorreto!');
            }else if(comment.message.length < 5 || comment.title.length > 255){
                showErrorMessage('Comentário incorreto!');
            }else if(comment.commentType.length < 1 || comment.commentType.length > 11 ){
                showErrorMessage("Tipo de comentario incorreto")
            }else{
                showErrorMessage('Departamento incorreto!');
            }
        });
    }

    cancel = () => {
        this.props.history.push('/viewComments');
    }

    findAllDepar = () => {
        this.serviceDepartaments.get('')
        .then(response => {
            const departaments = response.data;
            this.setState({ departaments });
            Global.departaments = this.state.departaments
        }
        ).catch(error => {
            console.log(error.response);
        });
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Cadastro de Comentário'>
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
                                                    <FormGroup label="Título: *" htmlFor="inputCommentTitle">
                                                        <input type="text" className="form-control" id="inputCommentTitle"  minLength="5"  maxLength= "50"
                                                        placeholder="Digite o título do comentário" 
                                                        value={this.state.title} 
                                                        onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Mensagem: *" htmlFor="MessageTextarea" className="form-label mt-4">
                                                        <textarea type="text" className="form-control" id="MessageTextarea" rows="3" minLength="10" maxLength="255" 
                                                        placeholder="Digite a sugestão, crítica ou elogio" 
                                                        value={this.state.message} 
                                                        onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                                        <small id="messageHelp" className="form-text text-muted">Seja cordial ao escrever sua crítica, sugestão ou elogio.</small>
                                                    </FormGroup>
                                                    <br />

                                                    <FormGroup label="Data: " htmlFor="inputCommentDate">
                                                        <input disabled type="text" className="form-control" id="inputCommentDate"  minLength="5" maxLength="50"
                                                        placeholder="Digite o título do comentário" 
                                                        value={this.state.creationDate} 
                                                        onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup label="Tipo de Comentário: *" htmlFor="selectCommentType" input>
                                                    <select className="form-select" id="selectCommentType" 
                                                    value={this.state.commentType} 
                                                    onChange={(e) => { this.setState({ commentType: e.target.value }) }}>
                                                            <option>Selecione uma opção</option>
                                                            <option value = "REVIEW">CRÍTICA</option>
                                                            <option value = "SUGGESTION">SUGESTÃO</option>
                                                            <option value = "COMPLIMENT">ELOGIO</option>
                                                        </select>
                                                    </FormGroup>
                                                    <br />
                                                    <FormGroup label="Autor do Comentario:" htmlFor="inputCommentTitle">
                                                        <input disabled type="text" className="form-control" id="autoComment"  
                                                        
                                                        value={this.state.user["name"]}  />
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup label="Nome do Departamento: *" htmlFor="input">
                                                        <input type="text" className="form-control" id="input" 
                                                        onChange={this.handleChange}
                                                        autoComplete="off"
                                                        placeholder="Digite nome do departamento"/>
                                                    </FormGroup>
                                                    
                                                    <ul id="suggestions"></ul>
                                
                                                    <br />
                                                    <br />
                                                    <button onClick={this.create} type="button" className="btn btn-success" id="button_salvar">
                                                        <i className="pi pi-save"></i> Salvar
                                                    </button>
                                                    <button onClick={this.cancel} type="button" className="btn btn-danger btn-cancel" id="button_cancelar">
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

export default withRouter(CreateComment);

