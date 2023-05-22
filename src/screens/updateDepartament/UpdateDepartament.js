import React from 'react';
import './UpdateDepartament.css';
import '../../components/Style.css';
import { withRouter } from 'react-router-dom';
import Card from '../../components/Card';
import FormGroup from '../../components/FormGroup';
import { showSuccessMessage, showErrorMessage, showWarningMessage } from '../../components/Toastr';
import DepartamentApiService from '../../services/DepartamentApiService';
import UserApiService from '../../services/UserApiService';
import ReactSelect from 'react-select';


class UpdateDepartament extends React.Component {

    state = {
        id: 0,
        name: '',
        id_responsaveis: [],
        responsibleUsers: [], 
        users: [],   
        showDefaultValue: false,
        selectKey: 0
    }
    constructor() {
        super();
        this.service = new DepartamentApiService();
        this.serviceUser = new UserApiService();
    }
    componentDidMount() {
        const params = this.props.match.params;       
        const id = params.id;
        this.findById(id);
        this.showEditRole();
        this.findAllUsers();
    }

    showEditRole = () =>{
        let a = document.getElementById("responsible")
        a.classList.add('show')  
    }

    loadingResponsable = () => {
        const responsableUsernames = this.state.responsibleUsers.map((user) => {
          if (typeof user === 'string') {
            const usernameMatch = user.match(/Username: (.*?)\s/);
            return usernameMatch ? usernameMatch[1] : null;
          }
          return null;
        });
      
        const filteredUsers = this.state.users.filter((user) =>
          responsableUsernames.includes(user.username)
        );
      
        const filteredUserIds = filteredUsers.map((user) => user.id);
        this.setState({id_responsaveis: filteredUserIds})
        console.log("LOADER AQUI ", filteredUserIds);
      }
      
    compareIds = () => {
        const ids = this.state.id_responsaveis.map((id) => id.toString());
        const filteredUsers = this.state.users.filter((user) => ids.includes(user.id.toString()));
        return filteredUsers;
    };
      
    findAllUsers = async () => {
        try {
          const response = await this.serviceUser.find("?id=&role=&departamentId=undefined");
          const users = response.data;
          this.setState({ users: users });
      
        } catch (error) {
          console.log(error.response);
        }

        await this.loadingResponsable(this.state.users);

      }
      

    findById = (id) => {
        this.service.find(`?id=${id}`)
            .then(response => {
                const departament = response.data;
                const id = departament[0]['id'];
                const name = departament[0]['name'];
                const responsibleUsers = departament[0]['responsibleUsers']
                this.setState({ id, name, responsibleUsers });
            })
            .catch(error => {
                console.log(error.response);
            });
    }

   

    addResponsavel = (id) => {
        if( id!= undefined){
            this.setState(prevState => ({
                id_responsaveis: [...prevState.id_responsaveis, id]
              }), () => {
                showSuccessMessage("Reponsável adicionado")
                console.log("ADD USER", this.state.id_responsaveis);
            });
        };
    }
       
      
    removeResponsavel = (id) => {
        if (id != undefined) {
           
          this.setState((prevState) => ({
            id_responsaveis: prevState.id_responsaveis.filter((responsavelId) => responsavelId !== id)
          }), () => {
            showWarningMessage("Responsável removido")
            console.log("REMOVER USER", this.state.id_responsaveis);
          });
        }
      };
      

  
    listResponsables = () => {
        let repons = this.compareIds();
        const options = repons.map((responsavel) => ({
          value: responsavel.id,
          label: `${responsavel.name} - ${responsavel.roles[0].name}`,
        }));

        let id;

        return (
          <>
           <ReactSelect
            id='camp_responsables'
            className='ListResponables'
            options={options}
            value={
                 options.find((option) => option.value === this.state.id_responsaveis) }
            onChange={(option) => {id = option?.value}}
            placeholder="Lista de responsáveis"
            key={this.state.selectKey}
            />
            <button  onClick={() => {
                this.removeResponsavel(id);
                this.setState((prevState) => ({

                  selectKey: prevState.selectKey + 1,
                }));
              }} type="button" className="btn btn-primary" id = "button-Remove">
              Remover
            </button>
          </>
        );
      };
      
      listAllUsers = () => {
        const filteredUsers = this.compareIds();
        const options = this.state.users
          .filter((user) => !filteredUsers.find((filteredUser) => filteredUser.id === user.id))
          .map((responsavel) => ({
            value: responsavel.id,
            label: `${responsavel.name} - ${responsavel.roles[0].name}`,
          }));
      
        let id;
        return (
          <>
            <ReactSelect
              id='camp_responsables'
              options={options}
              value={options.find((option) => option.value === this.state.id_responsaveis)}
              onChange={(option) => {
                id = option?.value;
              }}
              placeholder="Selecione o responsável"
              key={this.state.selectKey} 
            />
      
            <button
              onClick={() => {
                this.addResponsavel(id);
                this.setState((prevState) => ({

                  selectKey: prevState.selectKey + 1, 
                }));
              }}
              type="button"
              className="btn btn-warning"
              id="button-Remove"
            >
              Adicionar
            </button>
          </>
        );
      };
      
      


    update = () => {
        this.compareIds();
        let departament1 =  {
            id:this.state.id,
            name: this.state.name,
            responsibleUsers:null
        }  

        if(this.state.id_responsaveis != undefined){
           
            departament1 =  {
            id:this.state.id,
            name: this.state.name,
            responsibleUsers:this.state.id_responsaveis
            }          
            console.log("entrou")
        }

        this.service.update(this.state.id, departament1)
        .then(response => {
            showSuccessMessage('Departamento atualizado com sucesso!');
            this.props.history.push("/viewDepartaments");
        }
        ).catch(error => {
            console.log(error.response);
            showErrorMessage('O Departamento não pode ser atualizado!');
        }
        );
    }

    cancel = () => {
        this.props.history.push('/viewDepartaments');
    }

    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <div className="bs-docs-section">
                            <Card title='Atualização de Departamento'>
                                <div className='row'>
                                    <div className='col-lg-12' >
                                        <div className='bs-component'>
                                            <form>
                                                <fieldset>
                                                    <p>
                                                        <small id="messageHelp" className="form-text text-muted">
                                                            * O campo é obrigatório.
                                                        </small>
                                                    </p>
                                                    <FormGroup label='Nome:'>
                                                        <input disabled type="text" className="form-control" id="inputDepartamentName"
                                                            
                                                            value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                                        <div className="valid-feedback">Departamento atualizado!</div>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup label="Responsáveis:" htmlFor="inputResponsable">
                                                        {this.listResponsables()}
                                                    </FormGroup>

                                                    <FormGroup id= "listAllUsers">
                                                        <div id='responsible' className='inputRegistration' >
                                                            <label htmlFor="inputRegistration">Adicionar responsavel:*</label>
                                                            {this.listAllUsers()}
                                                        </div>     
                                                    </FormGroup>
                                                    <br />
                                                    <button onClick={this.update} type="button" id="button-update" className="btn btn-success">
                                                        <i className="pi pi-save"></i> Atualizar
                                                    </button>
                                                    <button onClick={this.cancel} type="button" id="button-cancel" className="btn btn-danger btn-cancel">
                                                        <i className="pi pi-times"></i> Cancelar
                                                    </button>
                                                </fieldset>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UpdateDepartament);