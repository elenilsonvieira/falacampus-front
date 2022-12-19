import React from 'react';
import './ViewComments.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
//import CommentsCard from '../../components/CommentsCard';

import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';

import CommentsTable from '../../components/CommentsTable'
import CommentApiService from '../../services/CommentApiService';
import { showSuccessMessage, showErrorMessage } from '../../components/Toastr';

import DepartamentApiService from '../../services/DepartamentApiService';
import CommentsTableDepartament from '../../components/CommentsTableDepartament';

class viewComments extends React.Component {


    state = {
        title: '',
        id: "",
        message: '',
        creationDate: Date,
        commentType: '',
        statusComment: '',
        user: {
            authotId: 0,
            name: '',
            email: '',
            registration: 0,
            role: '',
            departamentId: 0
        },
        departament: {
            departamentId: 0,
            name: ''
        },
        answer: {
            answerId: 0,
            message: '',
            commentId: '',
            creationDate: Date,
            authorId: 0
        },
        comments: [],
        isAdmin:'',
        teste:[],
        commentsDepartament:[],
        responsabledDepartament: 'aaa'
    }
    constructor() {
        super();
        this.service = new CommentApiService();
        this.service2 = new DepartamentApiService();
       
    }
    componentDidMount() {
        var value =  localStorage.getItem("user");
        var user = JSON.parse(value)
        var role = user['roles']['0']['name']
        var id = user['id']

        console.log("AA", id)
        if(role === 'ADMIN'){
            this.find();
        }else{
            
            this.findAdmin(id);
        }
                   
        this.viewListButton(role);

        this.findCommentDepartament(id);

        console.log('id uder', this.state.user.id)
        
    }

    viewListButton = (role) =>{    
        
        if(role === 'ADMIN'){
           this.state.isAdmin = true;
            
          
        }
       
    }

    delete = (commentId) => {

        this.service.delete(commentId)
            .then(response => {
                this.find();
                showSuccessMessage('Comentário excluído com sucesso!');
            }
            ).catch(error => {
                console.log(error.response);
                showErrorMessage('Comentário não pode ser excluído!');
            }
            );
    }

    card= (commentId) => {
       
    
    }

    edit = (commentId) => {
        this.service.find(`?id=${commentId}`)
        .then(response =>{
            if(response.data["length"]===0){
                showErrorMessage('Esse comentario não pode ser atualizado!');
            }else{
                this.props.history.push(`/updateComment/${commentId}`)        
               
            }
           
        })
        
    }

    answer = (commentId) => {
        this.props.history.push(`/createAnswer/${commentId}`);
        
    }

    createComment = () => {
        this.props.history.push(`/createComment`);
    }

    findAdmin = (id) => {
        this.service.findAll('')
        var params = '?';

        if (this.state.id !== 0) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}id=${this.state.id}`;
        }

        if (this.state.title !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}title=${this.state.title}`;
        }

        if (this.state.message !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}message=${this.state.message}`;
        }

        if (this.state.creationDate !== Date) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}creationDate=${this.state.creationDate}`;
        }

        //axios.get(`http://localhost:8080/api/comment/${params}`)
        this.service.findAll(this.state.id)
            .then(response => {
                const comments = response.data;
                this.setState({ comments });
                var teste =[]
                for (let i = 0; i < comments.length; i++) {
                    if(comments[i]["authorId"] === id){
                        teste.push(comments[i]);
                    }
                    
                }

                this.setState({teste})
                
                console.log("dados",teste);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    find = () => {
        this.service.findAll('')
        var params = '?';

        if (this.state.id !== 0) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}id=${this.state.id}`;
        }

        if (this.state.title !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}title=${this.state.title}`;
        }

        if (this.state.message !== '') {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}message=${this.state.message}`;
        }

        if (this.state.creationDate !== Date) {
            if (params !== '?') {
                params = `${params}&`;
            }

            params = `${params}creationDate=${this.state.creationDate}`;
        }

        //axios.get(`http://localhost:8080/api/comment/${params}`)
        this.service.findAll(this.state.id)
            .then(response => {
                const teste = response.data;
                this.setState({ teste });
                console.log("dados",teste);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    // findAll = () => {
    //     //axios.get(`http://localhost:8080/api/comment/all`)
    //     this.service.find()
    //         .then(response => {
    //             const comments = response;
    //             this.setState({ comments });
    //             console.log(comments);
    //         }
    //         ).catch(error => {
    //             console.log(error.response);
    //         }
    //         );
    // }

    findCommentDepartament = async (id) => {
        await this.service2.find(`responsables/${id}`)        
        .then(response => {
            const responsabled = response.data;
         
           
            if(responsabled.length !== 0){
                document.getElementById('commentDepartament').classList.add('view')

            }
            responsabled.forEach(element => {
                console.log("responsabledComent",element.name)
                this.state.responsabledDepartament = element.name
                this.service.find(`comentDepartament/${element.id}`)
                .then(r =>{
                    console.log("coment", r.data)
                    var commentsDepartament = r.data
                    this.setState({ commentsDepartament });
                })
            });
            
        }
        ).catch(error => {
            console.log(error.response);
        }
        );
    }

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12' style={this.styles.colMd12}>
                        <div className="bs-docs-section">
                            <Card title='Comentários'>
                                <form>
                                    <fieldset>
                                        {/* <FormGroup label="Id: *" htmlFor="inputId">
                                            <input type="long" className="form-control" id="inputId" placeholder="Digite o Id do Comentário" value={this.state.id} onChange={(e) => { this.setState({ id: e.target.value }) }} />
                                        </FormGroup>
                                        <br /> */}
                                        <FormGroup label="Título:" htmlFor="inputTitle"><br />
                                            <input type="text" className="form-control" id="inputTitle" placeholder="Digite o Título do Comentário" value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                            {/* <small id="titleHelp" className="form-text text-muted">O título do comentário deve ter no mínimo 5 e no máximo 50 caracteres.</small> */}
                                        </FormGroup>
                                        <br />
                                        {/* <FormGroup label="Mensagem: *" htmlFor="MessageTextarea" className="form-label mt-4">
                                            <textarea type="text" className="form-control" id="MessageTextarea" rows="3" minLength="10" maxlength="255"
                                                placeholder="Digite a sugestão, crítica ou elogio"
                                                value={this.state.message}
                                                onChange={(e) => { this.setState({ message: e.target.value }) }} />
                                            <small id="messageHelp" className="form-text text-muted">Seja cordial ao escrever sua crítica, sugestão ou elogio.</small>
                                        </FormGroup>
                                        <br /> */}
                                        {/* <FormGroup label="Data de Criação: *" htmlFor="inputCreationDate">
                                            <input type="date" className="form-control" id="inputCreationDate" placeholder="Digite a Data de Criação do Comentário" value={this.state.creationDate} onChange={(e) => { this.setState({ creationDate: e.target.value }) }} />
                                        </FormGroup>
                                        <br /> */}
                                        {/* <FormGroup label="Tipo de Comentário: *" htmlFor="selectCommentType" className="form-label mt-4">
                                            <select className="form-select" id="selectCommentType" value={this.state.commentType} onChange={(e) => { this.setState({ commentType: e.target.value }) }}>
                                                <option>Selecione uma opção</option>
                                                <option>REVIEW</option>
                                                <option>SUGGESTION</option>
                                                <option>COMPLIMENT</option>
                                            </select>
                                        </FormGroup>                                        
                                        <br />
                                        <FormGroup label="Status do Comentário: *" htmlFor="selectStatusComment" className="form-label mt-4">
                                            <select className="form-select" id="selectStatusComment" value={this.state.statusComment} onChange={(e) => { this.setState({ statusComment: e.target.value }) }}>
                                                <option>Selecione uma opção</option>
                                                <option>NOT_SOLVED</option>
                                                <option>SOLVED</option>
                                            </select>
                                        </FormGroup>  
                                        <br /> 
                                         <FormGroup label="Id do Autor do Comentário: *" htmlFor="inputAuthorId">
                                            <input type="long" className="form-control" id="inputAuthorId" placeholder="Digite o Id do Autor do Comentário" value={this.state.authorId} onChange={(e) => { this.setState({ authorId: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <FormGroup label="Id do Departamento: *" htmlFor="inputDepartamentId">
                                            <input type="long" className="form-control" id="inputDepartamentId" placeholder="Digite o Id do Departamento" value={this.state.departamentId} onChange={(e) => { this.setState({ departamentId: e.target.value }) }} />
                                        </FormGroup>
                                        <br />      
                                        <FormGroup label="Id da Resposta do Comentário: *" htmlFor="inputAnswerId">
                                            <input type="long" className="form-control" id="inputDepartamentId" placeholder="Digite o Id da Resposta do Comentário" value={this.state.departamentId} onChange={(e) => { this.setState({ departamentId: e.target.value }) }} />
                                        </FormGroup>
                                        <br />  */}
                                        <button onClick={this.find} type="button" id="btn-search" className="btn btn-info">
                                            <i className="pi pi-search"></i> Pesquisar
                                        </button>
                                        {/* <br />
                                        <br />
                                        <button onClick={this.findAll} type="button" className="btn btn-success">
                                            <i className="pi pi-search"></i> Buscar Tudo
                                        </button> */}
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <button onClick={this.createComment} type="button" className="btn btn-success btn-cadastrar" id="cadastrar_comentario">
                                    <i className="pi pi-plus"></i> Cadastrar Novo Comentário
                                </button>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <p className='title2'>Seus Comentarios</p>
                                    <CommentsTable comments={this.state.teste}
                                        delete={this.delete}
                                        edit={this.edit}
                                        answer={this.answer} 
                                        admin={this.state.isAdmin}
                                        card= {this.card}/>
                                </div>
                            </div>
                        </div>
                        <div id='commentDepartament' className='row commentDepartament'>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <p className='title2'>Comentarios Do Departamento</p>
                                    <CommentsTableDepartament comments={this.state.commentsDepartament}
                                        delete={this.delete}
                                        edit={this.edit}
                                        answer={this.answer} 
                                        admin={this.state.isAdmin}
                                        nameDepartament={this.state.responsabledDepartament}
                                        card= {this.card}/>
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

export default withRouter(viewComments);