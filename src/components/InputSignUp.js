import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

export default function InputSignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    let history = useNavigate();
    function back() {
        history.replace('/');
    }

    function disable() {
        setDisableButton(true);
    }

    function enable() {
        setDisableButton(false);
    }

    function handleError(error) {
        enable();
        alert('ERRO AO SE CADASTRAR!!');
    }

    function register() {
        const promise = axios.post(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up',
            { email, name, image, password }
        );

        promise.then(() => {
            back();
        });

        promise.catch(handleError);
    }

    return (
        <form>
            <Inputs>
                <input
                    disabled={disableButton}
                    placeholder="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                ></input>
                <input
                    disabled={disableButton}
                    placeholder="senha"
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></input>
                <input
                    disabled={disableButton}
                    placeholder="nome"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                ></input>
                <input
                    disabled={disableButton}
                    placeholder="foto"
                    value={image}
                    onChange={(e) => {
                        setImage(e.target.value);
                    }}
                ></input>
                <button
                    disabled={disableButton}
                    type="submit"
                    onClick={() => {
                        disable();
                        register();
                    }}
                >
                    Entrar
                </button>
            </Inputs>
        </form>
    );
}

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 340px;
    justify-content: space-evenly;
    align-items: center;

    input,
    button {
        width: 81%;
        font-size: 20px;
        height: 45px;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
    }

    button {
        text-align: center;
        color: white;
        background-color: #52b6ff;
        width: 83%;
    }

    button:disabled {
        opacity: 0.5;
    }

    input::placeholder {
        text-align: left;
        padding-left: 10px;
        color: #dbdbdb;
    }

    input {
        padding-left: 10px;
    }
`;
