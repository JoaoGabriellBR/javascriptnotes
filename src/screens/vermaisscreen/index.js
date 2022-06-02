import { React, Fragment, useState, useEffect } from 'react';
import { Navbar, Container, Section, Title, Card, Icon } from 'rbx';
import { Link, useParams } from 'react-router-dom';
import 'rbx/index.css';
import "../../styles/vermaisscreen.scss";
import axios from 'axios';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function VerMaisScreen() {

    const { id } = useParams();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/find/${id}`)
            .then((res) => {
                setNotes(res.data)
                console.log("Conexão com a API foi bem sucedida")
            })
            .catch(() => {
                console.log("Não foi possível se conectar com a API")
            })
    }, [])


    return (
        <Fragment>
            
            <Navbar className='is-light'>
                <Container>
                    <Navbar.Segment align='start'>
                        <Navbar.Item>
                            <Link to="/notes">
                                <Icon>
                                    <FontAwesomeIcon id="icon" icon={faCircleArrowLeft} />
                                </Icon>
                            </Link>
                        </Navbar.Item>
                    </Navbar.Segment>
                </Container>
            </Navbar>

            <Section size="medium" className="sectionvermaisscreen is-flex is-align-self-center">
                <Container>
                    <Card>
                        <Card.Header>
                            <Card.Header.Title className="ml-4">
                                <Title className="pt-3" size={4}>{notes.title}</Title>
                            </Card.Header.Title>
                        </Card.Header>

                        <Card.Content className='pt-2 ml-2'>
                            <p className="my-2"><strong>Descrição: </strong>{notes.description}</p>
                        </Card.Content>

                        <Card.Content className='pt-2 ml-2'>
                            <p className="pb-4">{notes.content}</p>
                        </Card.Content>

                        <Card.Footer>
                            <Card.Footer.Item>
                                <p><strong>Data de criação: </strong> </p>
                                {notes.criado_em}
                            </Card.Footer.Item>

                            <Card.Footer.Item>
                                <h3><strong>Data de atualização: </strong></h3>
                                <p> {notes.atualizado_em}</p>
                               
                            </Card.Footer.Item>
                        </Card.Footer>
                    </Card>
                </Container>
            </Section>
        </Fragment >
    );
}

export default VerMaisScreen;