import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function SignUpOrSignIn({ option }) {
    return (
        <LinkSignUpOrSignIn>
            <Link to={option ? '/cadastro' : '/'}>
                {option
                    ? 'Nao tem uma conta? Cadastre-se!'
                    : 'Ja tem uma conta? Entre!'}
            </Link>
        </LinkSignUpOrSignIn>
    );
}

const LinkSignUpOrSignIn = styled.div`
    display: flex;
    width: 100%;
    margin-top: 25px;
    color: #52b6ff;
    justify-content: center;
`;
