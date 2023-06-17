import './Style.css';

export default props => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    let isSolved = (status, comment) =>{
        if(status != "NOT_SOLVED"){
            return;
        }
        if(status != "NOT_SOLVED"){
            return;
        }else {
     
         return(
                <>
                <button id="button_editar" type="button" title="Editar"
                    className={"btn btn-warning btn-space edit" + comment.id}
                    onClick={e => props.edit(comment.id)}>
                    <i className="pi pi-pencil"></i>
                </button>
                <button id="button_excluir" type="button" title="Excluir"
                    className={"btn btn-primary btn-spac delit" + comment.id}
                    onClick={e => props.delete(comment.id)}>
                        <i className="pi pi-trash"></i>
                </button>
            </>)
        }
         
    }

    let isAuth = (auth,comment, admin)=>{
        if(user.id != auth && admin){
            return (
                <button id='butonAnswer' type="button" title="Responder"
                className={"btn btn-danger btn-space answer" + comment.id}
                onClick={e => props.answer(comment.id)}>
                <i className="pi pi-comment"></i>
              </button>

            )
        }
    }
   
    
    const rows = props.comments.map(comment => {
        if(comment.authorId == user.id ){
            return (
            <tr key={comment.id} className={comment.statusComment}>
                <td>{comment.title}</td>
                <td>{comment.message}</td>
                <td>{comment.creationDate}</td>
                <td className="col-md-2">{comment.commentType}</td>
                <td className="col-md-2">{comment.statusComment}</td>
              
                <td className="col-md-2">
                    {isAuth(comment.authorId,comment, props.admin)}
                    {isSolved(comment.statusComment,comment)}
                </td>
            </tr>
        )
        }else{
            return;
        }
         
    } )

    return (
    <>

        <table className="table table-hover">
            <thead>
                <tr className="table-active">
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