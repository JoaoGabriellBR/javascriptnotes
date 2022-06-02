import { React } from 'react';
import 'rbx/index.css';
import { Navbar, Button, Container } from 'rbx';
import { Link } from 'react-router-dom';
import '../../styles/header.scss';
import imagemlogo from '../../images/logo.png'

function Header() {
  return (
    <Navbar backgroundColor="light">
      <Container>
        <Navbar.Brand id='nav'>
          <Link to='/'>
            <img alt="Logo Javascript notes" width='140' height='160' src={imagemlogo} />
          </Link>
          <Navbar.Burger
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-menu">
            <span aria-hidden="true"></span>
          </Navbar.Burger>
        </Navbar.Brand>

        <Navbar.Menu>
          <Navbar.Segment align="end">
            <Navbar.Item>
              <Button.Group>

                <Link to='/create'>
                  <Button rounded className='is-link has-text-custom-purple-darker'>+ Criar uma nota </Button>
                </Link>

              </Button.Group>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Container>
    </Navbar>
  );
}

export default Header;
