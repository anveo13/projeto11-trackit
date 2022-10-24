import styled from 'styled-components';
import logo from '../assets/img/Logo.png'

export default function Logo() {
    return (
        <ContainerImage>
            <img src={logo} />
        </ContainerImage>
    );
}

const ContainerImage = styled.div`
    width: 100%;
    margin-top: 70px;
    margin-bottom: 33px;
    display: flex;
    justify-content: center;
`
