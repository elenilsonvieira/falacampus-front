import React from 'react';
import './ViewComments.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import CommentsTable from '../../components/CommentsTable'
import CommentApiService from '../../services/CommentApiService';
import { showSuccessMessage, showWarningMessage } from '../../components/Toastr';
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
        
        let user =  JSON.parse(localStorage.getItem("loggedUser"));
        let role = user['roles']['0']['name']
        let id = user['id']

        if(role === 'ADMIN'){
            this.find();
        }else{
            this.findAdmin(id);
        }
                  
        this.viewListButton(role);
        this.findCommentDepartament(id);        
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
            window.location.reload();
        }
        ).catch(error => {
            showWarningMessage('Comentário não pode ser excluído!');
            console.log(error.response);
            
        });
    }

    edit = (commentId) => {
        this.service.find(`?id=${commentId}`)
        .then(response =>{
            if(response.data["length"]===0){
                showWarningMessage('Esse comentario não pode ser atualizado!');
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
        let params = '?';

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

        this.service.findAll(this.state.id)
        .then(response => {
            const comments = response.data;
            this.setState({ comments });
            let teste =[]
            for (const element of comments) {
                if(element.authorId === id){
                    teste.push(element);
                }         
            }

            this.setState({teste})})

            .catch(error => {
              console.log(error.response);
        });
    }

    find = () => {
        let params = '?';

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

        this.service.findAll(this.state.id)
        .then(response => {
            const teste = response.data;
            this.setState({ teste });
        }).catch(error => {
            console.log(error.response);
        });
    }

    findCommentDepartament = async (id) => {
        await this.service2.find(`responsables/${id}`)        
        
        .then(response => {
            const responsabled = response.data;
            
            if(responsabled.length !== 0){
                document.getElementById('commentDepartament').classList.add('view')
            }

            responsabled.forEach(element => {
            
                this.state.responsabledDepartament = element.name;
              
                this.service.find(`comentDepartament/${element.id}`)
                .then(response =>{
                    let commentsDepartament = response.data
                    this.setState({ commentsDepartament });
                })
            });  
        }).catch(error => {
            console.log(error.response);
        });
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
                                        <FormGroup label="Título:" htmlFor="inputTitle"><br />
                                            <input type="text" className="form-control" id="inputTitle" placeholder="Digite o Título do Comentário" value={this.state.title} onChange={(e) => { this.setState({ title: e.target.value }) }} />
                                        </FormGroup>
                                        <br />
                                        <button onClick={this.find} type="button" id="btn-search" className="btn btn-info">
                                            <i className="pi pi-search"></i> Pesquisar
                                        </button>
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