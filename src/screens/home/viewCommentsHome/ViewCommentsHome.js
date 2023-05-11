import React from 'react';
import { withRouter } from 'react-router-dom';
import '../viewCommentsHome/ViewCommentsHome.css'
import AnswerApiService from '../../../services/AnswerApiService';
import CommentApiService from '../../../services/CommentApiService';
import Card  from '../../../components/Card';
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
        const footer = document.querySelector('.footer');
        footer.style.position = 'relative';  
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
        let respostas = "";
        for (let i =  dados.length-1; i >= 0; i--) {
     
         await this.findAnswerById(dados[i].answerId);
           
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
       await this.service.find(`all`)

            .then(response => {
                 const comment = response.data;

                for (let i = comment.length-1; i >= 0; i--) {
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
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        <br />
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