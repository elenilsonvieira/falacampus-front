import React from 'react';
import { withRouter } from 'react-router-dom';
import '../viewCommentsHome/ViewCommentsHome.css'
import AnswerApiService from '../../../services/AnswerApiService';
import CommentApiService from '../../../services/CommentApiService';
import Card  from '../../../components/Card';
import UserApiService from '../../../services/UserApiService';
import DepartamentApiService from '../../../services/DepartamentApiService';

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
        departaments: [],
        users:[]
    }

    constructor() {
        super();
        this.service = new AnswerApiService();
        this.service2 = new CommentApiService();
        this.service3 = new UserApiService()
        this.service4 = new DepartamentApiService();
    }
    findNameAuth = (id) =>{
        const user =this.state.users.filter(item => item.id === id);
        return user[0]["name"];
    
    }
    findNameDapartament = (id) =>{
        const dp =this.state.departaments.filter(item => item.id === id);
        return dp[0]["name"];
    }
    componentDidMount() {
        this.findCommentSolved();   
        const footer = document.querySelector('.footer');
        footer.style.position = 'relative';  
    }

    findAllUsers = async() => {
       await this.service3.find("?id=&role=&departamentId=undefined")
        .then(response => {
            const users = response.data;
            this.setState({ users });
        })
        .catch(error => {
            console.log(error.response);
        });
       
    }

    findAllDepartament = async() => {     
       await this.service4.get(`?${this.state.users[0]["id"]}`)
        .then(response => {
            const departaments = response.data;
            this.setState({ departaments });
        }).catch(error => {
            console.log(error.response);
        });
    }

    findCommentSolved = async() => {
     await this.service2.get('/commentSolved')
        .then(response => {
            const answers = response.data;
            this.setState({answers})
            this.loaderComments(answers);
        }).catch(error => {
            console.log(error.response);
        });
    }

    findAnswerById = async (id) => {
        await this.service.find(`all`)
 
       .then(response => {
         const comment = response.data;
             
         for (let i = comment.length-1; i >= 0; i--) {
             if(comment[i].id === id){
                  this.state.answer = comment[i].message
                 this.state.answerDate = comment[i].creationDate
             }
         }})
         .catch(error => {
             console.log(error.response);
         });
     }

   loaderComments = async (dados) => {
       await this.findAllUsers();
       await this.findAllDepartament();

        let respostas = "";
        for (let i =  dados.length-1; i >= 0; i--) {
     
           await this.findAnswerById(dados[i].answerId);
           respostas += `<div class="card text-white bg-success mb-3"; >`;
           respostas += `<div class="card-header" >${dados[i].title}</div>`
           respostas += `<div class="card-body" style = "font-size: 12px">`;         
           respostas += `<p class="comments-autor" >${this.findNameAuth(dados[i].authorId)}</p>`;
           respostas += ` <h4 class="card-text">${dados[i].message}</h4>`
           respostas +=`<p>${dados[i].creationDate}</p>`
           respostas += `</div>`
           respostas += `<div class="card bg-secondary mb-3"  style= "max-width: 75rem; margin-left: 2rem; color: #469408 ">`; 
           respostas += `<div class="card-body" style = "font-size: 12px">`; 
           respostas += `<p class="answer-autor" >${this.findNameDapartament(dados[i].departamentId)}</p>`;
           respostas += `<h4 class="card-title answer" >${this.state.answer}</h4>`
           respostas +=`<p>${this.state.answerDate}</p>`
           respostas += `</div>`
           respostas += `</div>`
           respostas += `</div>` 
            
        }

        let a = document.getElementById('teste')
        a.innerHTML = respostas;
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