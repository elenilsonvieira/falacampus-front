import React from 'react';
import './Style.css';

export default props => {
    const auth = props.auth;
    const buttonEdit = (id) =>{
        if(auth === "STUDENTS"){
            return;
        }
        else if(auth === 'ADMIN'){
            return(<button type="button" title="Editar" id="button_editar"
            className={"btn btn-warning button_editar" + id}
            onClick={e => props.edit(id)}>
            <i className="pi pi-pencil"></i>
        </button>)
        }
    }
    const rows = props.departaments.map(departament => {
        return (
            <tr key={departament.id}>
                <td>{departament.id}</td>
                <td>{departament.name}</td>
                <td className="col-md-2">
                    {buttonEdit(departament.id)}
                    {/* <button type="button" title="Excluir" id="button_excluir"
                        className="btn btn-primary btn-delete"
                        onClick={e => props.delete(departament.id)}>
                        <i className="pi pi-trash"></i>
                    </button> */}
                </td>
            </tr>
        )
    } )

    return (

        <table className="table table-hover">
            <thead>
                <tr className="table-active">
                    <th scope="col">Id</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Ação</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}