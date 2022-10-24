import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import Header from '../components/Header';
import Menu from '../components/Menu';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import PercentageContext from '../context/PercentageContext';
import { FaCheck } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';

export default function Today() {
    const user = useContext(UserContext);
    const context = useContext(PercentageContext);
    const [today, setToday] = useState([]);
    const [wasClicked, setWasClicked] = useState(false);

    useEffect(() => {
        getHabitToday();
    }, );

    function getHabitToday() {
        const promise = axios.get(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );

        promise.then((response) => {
            calcPercentage(response.data);
            setToday(response.data);
        });
    }
    /* if (today === null) {
        return <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#CCCCCC" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
         />;
    }  */ 
    function calcPercentage(today) {
        const done = today.filter((habit) => habit.done);
        if(today.length === 0){
        context.setPercentage(0);
        }else{
            context.setPercentage((done.length / today.length) * 100);
        }
    }
  
    function changeStyle() {
        if (!wasClicked) {
            setWasClicked(true);
        } else {
            setWasClicked(false);
        }
    }

    function changeHabit(habit) {
        let promise;
        if (!habit.done) {
            promise = axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
        } else {
            promise = axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
        }

        promise.then(() => {
            getHabitToday();
        });
    }
    


    return (
        <>
            <Header/>
            <Container>
                <div className="title">
                    <p className="title">
                        {dayjs(Date()).locale('pt-br').format('dddd, DD/MM')}
                    </p>
                </div>
                <div className="subtitle">
                    {context.percentage === 0 ? (
                        <p>Nenhum habito concluido ainda</p>
                    ) : (
                        <p>{context.percentage + '%'} dos habitos concluidos</p>
                    )}
                </div>
                <ul>
                    {today.map((habit, i) => {
                        return (
                            <li key={habit.id}>
                                <div>
                                    <h1>{habit.name}</h1>
                                    <h2>
                                        Sequencia atual:{' '}
                                        <Span
                                            color={
                                                habit.done ? '#8fc549' : 'black'
                                            }
                                        >
                                            {habit.currentSequence}
                                        </Span>
                                    </h2>
                                    <h2>
                                        Seu recorde:{' '}
                                        <Span
                                            color={
                                                habit.currentSequence ===
                                                habit.highestSequence
                                                    ? '#8fc549'
                                                    : 'black'
                                            }
                                        >
                                            {habit.highestSequence}
                                        </Span>
                                    </h2>
                                </div>
                                <Checkbox
                                    onClick={() => {
                                        changeStyle();
                                        changeHabit(habit);
                                    }}
                                    color={!habit.done ? '#e7e7e7' : '#8fc549'}
                                >
                                    <FaCheck color="white" size="2em"></FaCheck>
                                </Checkbox>
                            </li>
                        );
                    })}
                </ul>
            </Container>
            <Menu/>
        </>
    );
}

const Container = styled.div`
    margin-top: 92px;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
        width: 90%;
        height: 91px;
        display: flex;
        justify-content: space-between;
        background: white;
        margin-bottom: 10px;
        padding: 0 15px;
    }

    h1 {
        margin: 10px 0;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        /* identical to box height */


        color: #666666;
    }

    h2 {
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;

        color: #666666;
    }

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

    ul {
        width: 90%;
        color: #666666;
        font-size: 18px;
        margin-top: 20px;
    }

    .subtitle {
        width: 90%;
        margin-top: 5px;
        p {
            color: #8fc549;
            font-size: 18px;
        }
    }
`;

const Main = styled.main`
    background: #f0f0f0;
    display: flex;
    height: 100%;
    margin-bottom: 92px;
`;

const Checkbox = styled.div`
    margin-top: 10px;
    width: 69px;
    height: 69px;
    background-color: ${({ color }) => color};
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Span = styled.span`
    color: ${({ color }) => color};
`;
