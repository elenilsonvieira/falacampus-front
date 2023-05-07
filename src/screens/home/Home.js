import React from 'react';
import './Home.css';
import Banner from '../../components/Banner';
import img01 from "../../assets/img/img-01.png";
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
   
    render() {
        return (
            <>
                <div className="home">
                    <div className="row">
                        <div className="col-md-9">
                            <br />
                            <br />
                            <p className="post-zero">Este espaço é destinado a toda a comunidade acadêmica, onde todos poderão propor sugestões, realizar críticas e elogios, relacionados ao Instituto Federal da Paraíba, Campus Monteiro - PB.</p>
                            <p className="post">* Faça login no sistema para participar</p>
                        </div>
                        <div className="col-md-3">
                            <Banner imageSrc={img01} />
                        </div>
                    </div>
                </div>
                <div className="home">
                <div>
                    <div className="section-two">
                    <center>
                        <p className="post">
                        Projeto desenvolvido para a Disciplina de Desenvolvimento de
                        Aplicações Corporativas com o Professor Elenilson Vieira, no 5° Período do Curso de Análise e
                        Desenvolvimento de Sistemas do IFPB, Campus Monteiro.
                        <br />
                        <br />
                        Desenvolvedores:
                        <br />
                        <br />
                        <ul className="list_dev" >
                            <li>Ezequias Soares</li>
                            <li>Francisco Lucas</li>
                            <li>Tarcizo Leite</li>
                            <li>Thallyta Medeiros</li>
                            <li>Nataly Lucena</li>
                            <li>Patrícia dos Santos</li>
                            <li>Nataly Lucena</li>
                            <li>Patrícia dos Santos</li>
                            <li>Rosenato Barreto</li>
                        </ul>
                        </p>
                    </center>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

export default withRouter(Home);


            {/* // <div className="container">
            //     <div className='row'>
            //         <div className='col-md-12' style={this.styles.colMd12}>
            //             <div className="bs-docs-section">
            //                 <div className="card border-success mb-3" style={this.styles.cardBg}>
            //                     <h1 className="card-header text-center">Bem Vindo(a) ao "Fala Campus"</h1>
            //                     <h3 className="card-header text-center">Este espaço é destinado a toda a comunidade acadêmica, onde todos poderão propor sugestões, realizar críticas e elogios, relacionados ao Instituto Federal da Paraíba, Campus Monteiro - PB</h3>
            //                     <h4 className="card-header text-center">Projeto desenvolvido por ,  e Rosenato Barreto para a Disciplina de Desenvolvimento de Aplicações Corporativas com o Professor Elenilson Vieira, no 5° Período do Curso de Análise e Desenvolvimento de Sistemas do IFPB, Campus Monteiro/PB</h4>
            //                     <h5 className="card-header text-center">Projeto desenvolvido utilizando SpringBoot no Backend e React com Bootswatch no Frontend</h5>
            //                     <div className="card-body"></div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div> */}
        