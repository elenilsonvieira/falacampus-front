import React from 'react';
import './ViewDepartaments.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import Loader from '../../components/Loader';
import {showErrorMessage, showWarningMessage } from '../../components/Toastr';
import DepartamentsTable from '../../components/DepartamentsTable'
import DepartamentApiService from '../../services/DepartamentApiService';
let user =  null;


class ViewDepartaments extends React.Component {
   
    state = {
        name: '',
        id: '',
        departaments: [],
        loading: false
    }
    constructor() {
        super();
        this.service = new DepartamentApiService();
    }

    componentDidMount() {
       this.find();
       this.viewListButton();
       user = JSON.parse(localStorage.getItem("loggedUser")).roles[0]["name"];
    }

    viewListButton = () =>{
        const user =  JSON.parse(localStorage.getItem("loggedUser"))['roles']['0']['name'];
        if(user === 'ADMIN'){
            let a = document.getElementById("idListar")
            a.classList.add('mostrar')        
        }
       
    }

    edit = (departamentId) => {
        this.props.history.push(`/updateDepartament/${departamentId}`);
    }

  
    find = () => {        
        this.service.get(this.state.id)
        .then(response => {
            const departaments = response.data;
            console.log(departaments)
            this.setState({ departaments });
        }).catch(error => {
            console.log(error.response);
        });
    }

    filterDepartments = async() =>{  
        const de = this.state.departaments.filter(department =>
        department.name.toLowerCase().includes(this.state.name.toLowerCase()));
        this.setState({departaments: de});
    }

   

    findApi = async() => {
        showWarningMessage('Atualizando Departamentos, Isso pode demorar um pouco!'); 

        await this.service.get('/getDepartmentsApi')
            .then(response => {
                window.location.reload();         
            })
            .catch(error => {
                console.log(error.response);
                showErrorMessage('Erro ao atualizar departamentos.');
            })
           
    }
    
    
    render() {
        const { loading } = this.state;
    
        if (loading) {
            return <Loader />;
        }
    
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Departamentos'>
                                <form>
                                    <fieldset>
                                        <FormGroup label='Nome:'>
                                            <input type="text" className="form-control"   id="inputDepartamentName"   placeholder="Digite o Nome do Departamento"
                                                value={this.state.name} 
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    this.setState({ name: value }, () => {
                                                    if (value === "") {
                                                        this.find();
                                                    }});
                                                }}/>
                                        </FormGroup>
                                        <br />
                                        <button onClick={this.filterDepartments} type="button" id="btn-search" className="btn btn-info">
                                            <i className="pi pi-search"></i> Pesquisar
                                        </button>
                                    </fieldset>
                                </form>
                            </Card>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <button onClick={this.findApi} type="button" id="idListar" className="btn btn-success btn-listar">
                                    <i className="pi pi-plus"></i> Atualizar
                                </button>
                            </div>
                        </div>
                        <br />
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='bs-component'>
                                    <DepartamentsTable departaments={this.state.departaments} auth={user} delete={this.delete} edit={this.edit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}    

export default withRouter(ViewDepartaments);