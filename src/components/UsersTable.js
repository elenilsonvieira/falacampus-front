import React from 'react';
import './Style.css';

export default props => {
    const buttonEdit = (admin,usuario,username,id) =>{
        if(admin === "STUDENTS"){
            return;
        }
        else if(username === usuario || admin === 'ADMIN'){
            return(<button id="buttonEdit" type="button" title="Editar"
            className={"btn btn-warning edit"+ id}
            onClick={e => props.edit(id)}>
            <i className="pi pi-pencil"></i></button>)
        }
    }
    const rows = props.users.map(user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td className= {"roles" + user.id}>{user['roles']['0']['name']}</td>
                <td className="col-md-2">
                 {buttonEdit(props.admin, props.usuario.username,user.username,user.id)}
                </td>
            </tr>
        )
    } )
    return (
        <table className="table table-hover">
            <thead>
                <tr className="table-active">
                    {/* <th scope="col">Id</th> */}
                    <th scope="col">id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Matrícula</th>
                    <th scope="col">Papel</th>
                    {/* <th scope="col">Id do Departamento</th> */}
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}