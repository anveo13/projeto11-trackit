import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import { IconContext } from 'react-icons';
import { MdAddBox } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import CreateHabit from './CreateHabit';
import axios from 'axios';

export default function Habits() {
    const user = useContext(UserContext);
    const [isHidden, setIsHidden] = useState(true);
    const [bool, setBool] = useState(true);
    const [habits, setHabits] = useState([]);
    const [deletedHabit, setDeletedHabit] = useState([]);
    const week = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    let bgColor = 'white';
    let txtColor = '#DBDBDB';

    useEffect(() => {
        getHabits();
    }, []);

    function getHabits() {
        const promise = axios.get(
            'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }
        );

        promise.then((response) => {
            setHabits(response.data);
        });
    }

    function deleteHabit(habit) {
        deletConfirmation();
        const promise = axios.delete(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`,
            {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },

                data: {
                    source: habit,
                },
            }
        );

        promise.then(() => {
            getHabits();
        });
    }

    function addHabit() {
        if (isHidden) {
            setIsHidden(false);
        } else {
            setIsHidden(true);
        }
    }

    function deletConfirmation(habit) {
        if (habit != undefined) {
            setDeletedHabit(habit);
        }
        if (bool) {
            setBool(false);
        } else {
            setBool(true);
        }
    }

    return (
        <Container>
            <AddHabit>
                <div>
                    <p>Meus Habitos</p>
                    <IconContext.Provider
                        value={{ color: '#52b6ff', size: '3em' }}
                    >
                        <MdAddBox
                            onClick={(e) => {
                                addHabit(e);
                            }}
                        />
                    </IconContext.Provider>
                </div>
            </AddHabit>
            <AddingHabit>
                <div hidden={isHidden}>
                    <CreateHabit addHabit={addHabit} getHabits={getHabits} />
                </div>
            </AddingHabit>
            <ul>
                {habits.length === 0 ? (
                    <p>
                        Você não tem nenhum hábito cadastrado ainda. Adicione um
                        hábito para começar a trackear!
                    </p>
                ) : (
                    habits.map((habit, i) => {
                        return (
                            <li key={habit.id}>
                                <p>{habit.name}</p>
                                <div className="buttons">
                                    {week.map((day, j) => {
                                        return (
                                            <WeekDay
                                                key={j}
                                                bgColor={
                                                    !habit.days.includes(j)
                                                        ? bgColor
                                                        : txtColor
                                                }
                                                txtColor={
                                                    !habit.days.includes(j)
                                                        ? txtColor
                                                        : bgColor
                                                }
                                            >
                                                {day}
                                            </WeekDay>
                                        );
                                    })}
                                </div>
                                <button className="trash">
                                    <BsTrash
                                        onClick={() => {
                                            deletConfirmation(habit);
                                        }}
                                    ></BsTrash>
                                </button>
                            </li>
                        );
                    })
                )}
            </ul>
            <div hidden={bool}>
                <div className="delet-confirmation">
                    Deseja realmente deletar o habito?
                    <div>
                        <Button
                            className="cancel"
                            onClick={() => {
                                deletConfirmation(undefined);
                            }}
                        >
                            Manter
                        </Button>
                        <Button
                            className="delet"
                            onClick={() => {
                                deleteHabit(deletedHabit);
                            }}
                        >
                            Deletar
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

const Button = styled.button`
    width: 85px;
    height: 35px;
    color: white;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
`;

const Container = styled.div`
    margin-top: 92px;
    width: 100%;
    min-height: 100vh;

    .delet-confirmation {
        width: 90%;
        height: 90px;
        background: rgba(255, 255, 255, 0.8);
        position: fixed;
        top: 120px;
        left: 20px;
        font-size: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        div {
            width: 80%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    ul {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    li {
        width: 90%;
        height: 91px;
        background: white;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .buttons {
        width: 90%;
        margin-top: 10px;
    }

    p {
        width: 90%;
        color: #666666;
        font-size: 18px;
    }

    .trash {
        background: none;
        border: none;
        position: absolute;
        top: 15px;
        right: 5px;
    }

    .cancel {
        background: #52b6ff;
    }

    .delet {
        background: #aa0000;
    }
`;

const AddingHabit = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
        width: 90%;
        height: 180px;
        background: white;
        margin-top: 20px;
    }
`;

const AddHabit = styled.div`
    display: flex;
    justify-content: center;

    div {
        display: flex;
        width: 90%;
        justify-content: space-between;
        align-items: center;
    }

    p {
        color: #126ba5;
        font-size: 23px;
    }
`;

const WeekDay = styled.button`
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #d4d4d4;
    font-size: 20px;
    border-radius: 5px;
    color: ${({ txtColor }) => txtColor};
    background: ${({ bgColor }) => bgColor};
`;
