import { React, Fragment, useEffect } from 'react';
import { Section, Container, Button, Title, Input, Label, Field, Help, Control, Textarea, Navbar, Icon } from 'rbx';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import '../../styles/editscreen.scss'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function EditScreen() {

    const { id } = useParams();
    const navigate = useNavigate()

    const validationNote = yup.object().shape({

        title: yup.string().required("O título é obrigatório").max(40, "O número máximo de caractéres é 40"),

        description: yup.string().required("A descrição é obrigatória").max(150, "O número máximo de caractéres é 150"),

        content: yup.string().required("O conteúdo é obrigatório").max(500, "O número máximo de caractéres é 500")
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationNote)
    })


    const addNote = (data) => {
        axios.put(`http://localhost:8080/edit/${id}`, data)
            .then(() => {
                console.log("A nota foi atualizada com sucesso")
                navigate("/notes")
            })
            .catch(() => {
                console.log("Não foi possível atualizar a nota")
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/find/${id}`)
            .then((response) => {
                reset(response.data)
            })
            .catch(() => {
                console.log("Não foi possível carregar a nota para atualização")
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

            <Section size='medium' className="sectioneditscreen is-flex is-flex-direction-column is-justify-content-center">
                <Container>
                    <div id='diveditscreen'>
                        <Title textAlign='centered' className='has-text-black'>Atualizar Nota</Title>

                        <form onSubmit={handleSubmit(addNote)}>
                            <Field>
                                <Label className='has-text-black'>Título</Label>
                                <Control>
                                    <Input className="input" type="text" name="title" {...register("title")} />
                                    <Help color="red">{errors.title?.message}</Help>
                                </Control>
                            </Field>

                            <Field>
                                <Label className='has-text-black'>Descrição</Label>
                                <Control>
                                    <Input className='input' type="text" name="description" {...register("description")} />
                                    <Help color="red">{errors.description?.message}</Help>
                                </Control>
                            </Field>

                            <Field>
                                <Label className='has-text-black'>Conteúdo</Label>
                                <Control>
                                    <Textarea id="conteudo" className="input" name="content" {...register("content")} />
                                    <Help color="red">{errors.content?.message}</Help>
                                </Control>
                            </Field>

                            <Field kind="group">
                                <Control>
                                    <Button size='medium' type="submit" color="link">Enviar</Button>
                                </Control>
                            </Field>
                        </form>
                    </div>
                </Container>
            </Section>
        </Fragment>
    );
}

export default EditScreen;