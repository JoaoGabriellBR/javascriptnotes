import { React, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Navbar, Container, Section, Field, Icon, Control, Help, Label, Button, Input, Title, Textarea, } from 'rbx';
import { Link, useNavigate } from 'react-router-dom';
import 'rbx/index.css';
import '../../styles/createscreen.scss';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function CreateScreen() {

    const navigate = useNavigate()

    const validationNote = yup.object().shape({
        title: yup.string().required("O título é obrigatório").max(40, "O número máximo de caractéres é 40"),

        description: yup.string().required("A descrição é obrigatória").max(150, "O número máximo de caractéres é 150"),

        content: yup.string().required("O conteúdo é obrigatório").max(500, "O número máximo de caractéres é 500")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationNote)
    })

    const addNote = (data) => {
        axios.post("http://localhost:8080/create", data)
            .then(() => {
                console.log("A nota foi criada com sucesso")
                navigate("/notes")
            })
            .catch(() => {
                console.log("Não foi possível criar a nota")
            })
    }


    return (
        <Fragment>

            <Navbar className='is-light'>
                <Container>
                    <Navbar.Segment align='start'>
                        <Navbar.Item>
                            <Link to="/">
                                <Icon>
                                    <FontAwesomeIcon id="icon" icon={faCircleArrowLeft} />
                                </Icon>
                            </Link>
                        </Navbar.Item>
                    </Navbar.Segment>
                </Container>
            </Navbar>

            <Section size='medium' className="sectioncreatescreen is-flex is-flex-direction-column is-justify-content-center">
                <Container>
                    <div id='divcreatescreen'>
                        <Title textAlign='centered' className='has-text-black'>Criar Nota</Title>

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

export default CreateScreen;