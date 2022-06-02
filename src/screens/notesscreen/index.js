import { React, Fragment, useState, useEffect } from 'react';
import { Navbar, Container, Section, Button, Title, Card, Icon } from 'rbx';
import { Link } from 'react-router-dom';
import 'rbx/index.css';
import "../../styles/notesscreen.scss";
import axios from 'axios';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function NotesScreen() {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/find')
            .then((res) => {
                setNotes(res.data)
                console.log("Conexão com a API foi bem sucedida")
            })
            .catch(() => {
                console.log("Não foi possível se conectar com a API")
            })
    }, [])


    const excluirNota = (id) => {
        axios.delete(`http://localhost:8080/delete/${id}`)
            .then(() => {
                console.log("Nota excluida com sucesso")
            })
            .catch(() => {
                console.log("Não foi possível excluir a nota")
            })

        setNotes(notes.filter(note => note._id !== id))
    }

    return (
        <Fragment>

            <Navbar className='is-light'>
                <Container>
                    <Navbar.Segment align='start'>
                        <Navbar.Item>
                            <Link to="/create">
                                <Icon>
                                    <FontAwesomeIcon id="icon" icon={faCircleArrowLeft} />
                                </Icon>
                            </Link>
                        </Navbar.Item>
                    </Navbar.Segment>
                </Container>
            </Navbar>


            <Section size="medium" className="sectionnotesscreen is-flex is-align-self-center">
                <Container>
                    {notes.map(function (note, key) {
                        return (
                            <Fragment>
                                <Card id="card" className="mb-3">
                                    <Card.Header>
                                        <Card.Header.Title className="ml-4">
                                            <Title className="pt-3" size={4}>{note.title}</Title>
                                        </Card.Header.Title>
                                    </Card.Header>

                                    <Card.Content className='pt-2 ml-2'>
                                        <p className="pb-4">{note.content}</p>

                                        <Link to={{ pathname: `/edit/${note._id}` }}>
                                            <Button outlined className='is-link'>Editar</Button>
                                        </Link>

                                        <Button onClick={() => excluirNota(note._id)} className='ml-3 is-link'>Excluir</Button>

                                        <Link to={{ pathname: `/vermais/${note._id}` }}>
                                            <Button outlined className='is-link ml-3'>Ver mais...</Button>
                                        </Link>

                                    </Card.Content>

                                    <Card.Footer>
                                        <Card.Footer.Item>
                                            {note.criado_em}
                                        </Card.Footer.Item>
                                    </Card.Footer>
                                </Card>
                            </Fragment>
                        );
                    })}

                </Container>
            </Section>
        </Fragment >
    );
}

export default NotesScreen;