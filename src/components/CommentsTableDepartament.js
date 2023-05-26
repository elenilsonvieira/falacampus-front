import React from 'react';
import './Style.css';

const findNameById = (list, id) => {
    const foundObject = list.find(obj => obj.id === id);
    return foundObject ? foundObject.name : null;
}

const button = (p,comment) =>{

    if(comment["statusComment"] != "NOT_SOLVED"){
        return;
    }
    else {
        return(
            <button id='butonAnswer' type="button" title="Responder"
                className={"btn btn-danger btn-space answer" + comment.id}
                onClick={e => p.answer(comment.id)}>
                <i className="pi pi-comment"></i>
            </button>    
        )
    }
}
  
export default props => {

    let rend = (comment)=>{
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        if(user.id != comment.authorId){
           return( 
            <tr key={comment.id} className={comment.statusComment}>
                <td>{findNameById(props.nameDepartament, comment.departamentId)}</td>
                <td>{comment.title}</td>
                <td>{comment.message}</td>
                <td>{comment.creationDate}</td>
                <td className="col-md-2">{comment.commentType}</td>
                <td className="col-md-2">{comment.statusComment}</td>
                <td className="col-md-2">
                {
                    button(props,comment) 
                }
                </td>
            </tr> 
            )}  
    }
    
    const rows = props.comments.map(comment => {
        return (rend(comment))
    })

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr className="table-active">
                        <th scope="col">Nome do Departamento</th>
                        <th scope="col">Título</th>
                        <th scope="col">Mensagem</th>
                        <th scope="col">Data/Hora de Criação</th>
                        <th scope="col">Tipo de Comentário</th>
                        <th scope="col">Status do Comentário</th>
                        <th scope="col">Ações</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </>
    )
}