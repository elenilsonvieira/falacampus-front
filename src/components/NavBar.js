import React from 'react';
import './NavBar.css'
import NavBarItem from './NavBarItem';
import Logo from "./Logo";
import FalaCampus from "../assets/img/Fala_campus-logo.png";
import { AuthConsumer } from '../main/SessionProvider';

function NavBar(props) {
    const authenticator = () =>{
        if(props.isAuthenticated){
          return '/viewCommentsHome';
        }
        else{
            return'/';
        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-nav">
            <div className="container-fluid">
               
                <div className="col-md-4"><a href= {authenticator()} className="navbar-brand"><Logo imageSrc={FalaCampus} /></a></div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-controls="navbarColor02" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto nav-items">
                        
                        <NavBarItem render={!props.isAuthenticated} href="/login" label="Login" id="login" />
                        <NavBarItem render={props.isAuthenticated} href="/viewDepartaments" label="Departamentos" id="departments" />
                        <NavBarItem render={props.isAuthenticated} href="/viewUsers" label="Usuários" id="users" />
                        <NavBarItem render={props.isAuthenticated} href="/viewComments" label="Comentários" id="comments"/>
                        <NavBarItem render={props.isAuthenticated} href="/viewCommentsHome" label="Respostas" id="answers"/>
                        <NavBarItem render={props.isAuthenticated} href="/login" onClick={props.logout} label="Sair" id="goOut"/>      
                    </ul>
                    <p className='userLogger'>{JSON.parse(localStorage.getItem("loggedUser")).name}</p>
                </div>
            </div>
        </nav>
    )
}

export default () => (
    <AuthConsumer>
        {(context) => (
            <NavBar isAuthenticated={context.isAuthenticated} logout={context.end} />
        )}
    </AuthConsumer>
)

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth > 992) {

        document.querySelectorAll('.navbar .nav-item').forEach(function (everyitem) {

            everyitem.addEventListener('mouseover', function (e) {

                let el_link = this.querySelector('a[data-bs-toggle]');

                if (el_link != null) {
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.add('show');
                    nextEl.classList.add('show');
                }

            });
            everyitem.addEventListener('mouseleave', function (e) {
                let el_link = this.querySelector('a[data-bs-toggle]');

                if (el_link != null) {
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.remove('show');
                    nextEl.classList.remove('show');
                }
            })
        });
    }
});
   