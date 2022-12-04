import React from 'react';
import './ViewCommentsHome.css';
import '../../../components/Style.css';
import { withRouter } from 'react-router-dom';
import CommentsCard from '../../../components/CommentsCard';

import Card from '../../../components/Card';
import FormGroup from '../../../components/FormGroup';

import CommentsTable from '../../../components/CommentsTable'
import CommentApiService from '../../../services/CommentApiService';
import { showSuccessMessage, showErrorMessage } from '../../../components/Toastr';

class ViewComments extends React.Component {


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
        comments: []
    }
    constructor() {
        super();
        this.service = new CommentApiService();
    }
    componentDidMount() {
        this.find();
        
    }
//   componentWillUnmount() {
//        this.clear();
//      }

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
                this.service.edit(commentId);
            }
           
        })
        
    }

    answer = (commentId) => {
        this.props.history.push(`/createAnswer/${commentId}`);
    }

    createComment = () => {
        this.props.history.push(`/createComment`);
    }

    find = () => {
        
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
        this.service.find(params)
            .then(response => {
                const comments = response.data;
                this.setState({ comments });
                console.log("dados",comments);
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

    render() {
        return (

            <div className="container">
                <div className='row'>
                    <div className='col-md-12' style={this.styles.colMd12}>
                        <div className="bs-docs-section">
                            <Card title='Comentários'>
                                <form>
                                    <fieldset>
                                        <CommentsCard title = {this.state.title}/>
                            
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
                        <div className='row'>
                            <div className='col-lg-12' >
                                <div className='bs-component'>
                                    <CommentsTable comments={this.state.comments}
                                        delete={this.delete}
                                        edit={this.edit}
                                        answer={this.answer} 
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

export default withRouter(ViewComments);