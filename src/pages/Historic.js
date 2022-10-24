import Header from '../components/Header';
import Menu from '../components/Menu';
import styled from 'styled-components';

export default function History() {
    return (
        <Main>
            <Header/>
            <Container>
                <div className="title">
                    <p className="title">Historico</p>
                </div>
                <p className="historic">
                    Em breve você poderá ver o histórico dos seus hábitos aqui!
                </p>
            </Container>
            <Menu/>
        </Main>
    );
}

const Container = styled.div`
    margin-top: 92px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    div.title,
    p {
        display: flex;
        width: 90%;
        justify-content: space-between;
        align-items: center;

        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        /* identical to box height */


        color: #126BA5;
            }

    p.title {
        color: #126ba5;
        font-size: 23px;
    }

    p.historic {
        width: 90%;
        color: #666666;
        font-size: 18px;
        margin-top: 20px;
    }
`;

const Main = styled.main`
    background: #f0f0f0;
    display: flex;
    height: 100%;
    margin-bottom: 92px;
`;
