import React, { useState } from 'react';
import './NavBar.css';
import NavBarItem from './NavBarItem';
import Logo from './Logo';
import FalaCampus from '../assets/img/Fala_campus-logo.png';
import { AuthConsumer } from '../main/SessionProvider';
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavBar(props) {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const authenticator = () => {
    if (props.isAuthenticated) {
      return '/viewCommentsHome';
    } else {
      return '/';
    }
  };

  return (
    <Navbar bg="nav" expand="lg" expanded={expanded} onToggle={toggleNavbar}>
      <Container>
        <Navbar.Brand href={authenticator()}>
          <Logo imageSrc={FalaCampus} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarColor02" />
        <Navbar.Collapse id="navbarColor02">
          <Nav className="me-auto">
            <NavBarItem
              render={!props.isAuthenticated}
              href="/login"
              label="Login"
              id="login"
            />
            <NavBarItem
              render={props.isAuthenticated}
              href="/viewDepartaments"
              label="Departamentos"
              id="departments"
            />
            <NavBarItem
              render={props.isAuthenticated}
              href="/viewUsers"
              label="Usuários"
              id="users"
            />
            <NavBarItem
              render={props.isAuthenticated}
              href="/viewComments"
              label="Comentários"
              id="comments"
            />
            <NavBarItem
              render={props.isAuthenticated}
              href="/viewCommentsHome"
              label="Respostas"
              id="answers"
            />
            <NavBarItem
              render={props.isAuthenticated}
              href="/login"
              onClick={props.logout}
              label="Sair"
              id="goOut"
            />
          </Nav>
          <p className="userLogger">{JSON.parse(localStorage.getItem('loggedUser')).name}</p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default () => (
  <AuthConsumer>
    {(context) => <NavBar isAuthenticated={context.isAuthenticated} logout={context.end} />}
  </AuthConsumer>
);

document.addEventListener('DOMContentLoaded', function () {
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
      });
    });
  }
});
