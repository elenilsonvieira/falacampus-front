import React from 'react';
import { withRouter } from 'react-router-dom';
import '../viewCommentsHome/ViewCommentsHome.css'


import AnswerApiService from '../../../services/AnswerApiService';

import CommentApiService from '../../../services/CommentApiService';

import CommentsTableHome from '../../../components/CommentsTableHome';

import Card  from '../../../components/Card';

import CommentsCard  from '../../../components/CommentsCard';

import UserApiService from '../../../services/UserApiService';

class ViewCommentsHome extends React.Component {

    state = {  
       
        answer:'',
        answerAuthor: '',
        answerDate: '',
        comment:{
            id:'',
            title:'aaa',
            message:''
        },   
        answers: [],
        nameAutor:'',
        nameCordenador:'',
        users:[],
        

    }

    constructor() {
        super();
        this.service = new AnswerApiService();
        this.service2 = new CommentApiService();
        this.UserService = new UserApiService();
        
    }

    componentDidMount() {
        this.find();   
       
        
        
    }

    find = () => {

        this.service2.get('/commentSolved')
            .then(response => {
                const answers = response.data;
                this.setState({answers})
                
              
                this.teste(answers);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

   teste = async (dados) => {
        var respostas = ""
        for (let i =  dados.length-1; i >= 0; i--) {
            
           
         await this.findAnswerById(dados[i].answerId);
           const nomeAutorComentario = await this.findAuthor(dados[i]['authorId'])       
           const nomeAutorResposta = await this.findAuthorResposta(this.state.answerAuthor)
           


           respostas += `<div class="card text-white bg-success mb-3"; >`;
           respostas += `<div class="card-header" >${dados[i].title}</div>`
           respostas += `<div class="card-body" style = "font-size: 12px">`;         
           respostas += `<p class="comments-autor" >${this.state.nameAutor}</p>`;
           respostas += ` <h4 class="card-text">${dados[i].message}</h4>`
           respostas +=`<p>${dados[i].creationDate}</p>`
           respostas += `</div>`
           respostas += `<div class="card bg-secondary mb-3"  style= "max-width: 75rem; margin-left: 2rem; color: #469408 ">`; 
           respostas += `<div class="card-body" style = "font-size: 12px">`; 
           respostas += `<p class="answer-autor" >${this.state.nameCordenador}</p>`;
           respostas += `<h4 class="card-title answer" >${this.state.answer}</h4>`
           respostas +=`<p>${this.state.answerDate}</p>`
           respostas += `</div>`
           respostas += `</div>`
           respostas += `</div>` 
            
        }
        let a = document.getElementById('teste')

           a.innerHTML = respostas;
    }

    findAnswerById = async (id) => {
        //axios.get(`http://localhost:8080/api/comment?id=${commentId}`)
       await this.service.find(`all`)

            .then(response => {
                 const comment = response.data;
                // const id = comment[0].id;
                 const answer = comment[0].answer;
                // const message = comment[0].message;
                // const commentType = comment[0].commentType;
                // const user = comment[0].user;
                // const departament = comment[0].departament;


                for (let i = comment.length-1; i >= 0; i--) {
                    console.log("resposta: ",comment[i])
                    console.log("autor resposta: ",comment[i]
                    )

                    if(comment[i].id === id){
                        this.state.answer = comment[i].message
                        this.state.answerAuthor = comment[i].authorId
                        this.state.answerDate = comment[i].creationDate
                    
                    }
                    
                }
            }

            ).catch(error => {
                console.log(error.response);
            }
            );
    }

     findAuthor = async (id) => {
        //axios.get(`http://localhost:8080/api/user/${params}`)
        await this.UserService.find(`?id=${id}`)
            .then(response => {
                const users = response.data;
                this.setState({ users });
                
                
                this.state.nameAutor = users[0]['name']
               return users[0]['name'];
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

    findAuthorResposta = async (id) => {
        //axios.get(`http://localhost:8080/api/user/${params}`)
        await this.UserService.find(`?id=${id}`)
            .then(response => {
                const users = response.data;
                this.setState({ users });
                
               
                this.state.nameCordenador = users[0]['name']
               return users[0]['name'];
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
                            <Card title='Comentarios Respondidos'>
                                <form>
                                    <fieldset>
                                        
                                        <div id='teste' className='teste'></div>

                                        {/* <div className="card text-white bg-primary mb-3" >
                                    <div className="card-header">Header</div>
                                    <div className="card-body">
                                        <h4 className="card-title">Primary card title</h4>
                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                    </div> */}
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        {/* <br />
                        <div className="row">
                            <div className="col-md-12">
                                <button onClick={this.createComment} type="button" className="btn btn-success btn-cadastrar" id="cadastrar_comentario">
                                    <i className="pi pi-plus"></i> Comentários
                                </button>
                            </div>
                        </div> */}
                    
                        <br />
                        {/* <div className='row'>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <CommentsTable comments={this.state.comments}
                                        delete={this.delete}
                                        edit={this.edit}
                                        answer={this.answer} 
                                        card= {this.card}/>
                                </div>
                            </div>
                        </div> */}

                   
                     
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

export default withRouter(ViewCommentsHome);