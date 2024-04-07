import { Container, Row, Col } from 'react-bootstrap'
import headerImg from './../Assets/img/header-img.svg'

export const Banner = () => {
    return(
        <section className='banner' id='home'>
            <Container>
                <Row className='align-items-center'>
                    <Col xs={12} md={6} xl={7}>
                        <span className='tagline'>Welcome to Space Tune</span>
                        <h1>Find <span style={{ color: 'var(--main-purple)' }}>Music</span> <br/>Out of This World.</h1>
                        <p>Discover a universe of music on our platform, where the thrill of exploration meets the joy of sharing.</p>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <img src={headerImg} alt="Header Img"/>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}