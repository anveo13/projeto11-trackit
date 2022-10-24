import styled from 'styled-components';
import Habits from '../components/Habits';
import Header from '../components/Header';
import Menu from '../components/Menu';

export default function HabitsPage() {
    return (
        <Main>
            <Header />
            <Habits />
            <Menu />
        </Main>
    );
}

const Main = styled.main`
    background: #f0f0f0;
    display: flex;
    height: 100%;
    margin-bottom: 92px;
`;
