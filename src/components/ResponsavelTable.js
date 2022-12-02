import React from 'react';
import './Style.css';

export default props => {

    const rows = props.responsavel.map(responsavel => {
        return (
            <tr key={responsavel.Nome}>
                {/* <td>{departament.id}</td> */}
                <td>{"asdas"}</td>
               
            </tr>
        )
    } )

    return (

        <table className="table table-hover">
            <thead>
                <tr className="table-active">
                    {/* <th scope="col">Id</th> */}
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