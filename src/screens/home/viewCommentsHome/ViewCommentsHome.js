import React from 'react';
import { withRouter } from 'react-router-dom';
import '../viewCommentsHome/ViewCommentsHome.css'


import AnswerApiService from '../../../services/AnswerApiService';

import CommentApiService from '../../../services/CommentApiService';

import CommentsTableHome from '../../../components/CommentsTableHome';

import Card  from '../../../components/Card';

import CommentsCard  from '../../../components/CommentsCard';


class ViewCommentsHome extends React.Component {

    state = {  
        title:'',
        message:'',
        comment:{
            id:'',
            title:'aaa',
            message:''
        },   
        answers: []

    }

    constructor() {
        super();
        this.service = new AnswerApiService();

        this.service2 = new CommentApiService();
        
    }

    componentDidMount() {
        this.find();   
        
        
        
    }

    find = () => {

        this.service.get('/all')
            .then(response => {
                const answers = response.data;
                this.setState({answers})
                
                console.log("BBBb",answers);
                this.teste(answers);
            }
            ).catch(error => {
                console.log(error.response);
            }
            );
    }

   teste = async (dados) => {
        var respostas = ""
        for (let i = 0; i < dados.length; i++) {
           
          await this.findCommnetsById(2);
           
           respostas += `<div class="card text-white bg-success mb-3"; >`;
           respostas += `<div class="card-header">Titulo Comentario: ${this.state.title}</div>`
           respostas += `<div class="card-body">`;          
           respostas += ` <p class="card-text">Comentario: ${this.state.message}</p>`
           respostas += `<h4 class="card-title">Resposta: ${dados[i].message}</h4>`
           respostas += `</div>`
           respostas += `</div>`
   
           
            
        }
        let a = document.getElementById('teste')

           a.innerHTML = respostas;
    }

    findCommnetsById = async (id) => {
        //axios.get(`http://localhost:8080/api/comment?id=${commentId}`)
       await this.service2.find(`?id=${id}`)

            .then(response => {
                 const comment = response.data;
                // const id = comment[0].id;
                 const title = comment[0].title;
                 const message = comment[0].message;
                // const commentType = comment[0].commentType;
                // const user = comment[0].user;
                // const departament = comment[0].departament;

                console.log("comment",message)

                // this.setState({ id:id, title:title, message:message, commentType:commentType, user:user, departament:departament});
                
                this.setState({title:"bbb"})
                this.state.title = title
                this.state.message = message

               return comment[0].title;
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
                                        <CommentsCard title = {this.state.comment.title}/>

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