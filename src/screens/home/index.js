import { React, Fragment } from 'react';
import 'rbx/index.css';
import { Section, Container, Column, Title } from 'rbx';
import Header from '../header/index';
import '../../styles/home.scss';
import PresentationImage from '../../images/presentation.png'

function Home() {
    return (
        <Fragment>
            <Header />
            <Section className='sectionhome' size='medium'>
                <Container>
                    <Column.Group className='my-0'>
                        <Column size={5}>
                            <Title id='title' size={1} spaced className="has-text-white">
                                Planejar o seu dia-a-dia nunca foi tão fácil (:
                            </Title>

                            <Title size={5} spaced className="has-text-light" subtitle>
                                <p>Crie, edite, e visualize suas notas favoritas</p>
                            </Title>
                        </Column>

                        <Column size={7}>
                            <img alt="Imagem de Apresentação" src={PresentationImage} />
                        </Column>
                    </Column.Group>
                </Container>
            </Section>
        </Fragment>
    );
}

export default Home;