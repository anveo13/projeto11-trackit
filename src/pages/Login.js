import InputLogin from '../components/InputLogin';
import SignUpOrSign from '../components/SignUpOrSignIn';
import Logo from '../components/Logo'

export default function Login({ setUser }) {
    return (
        <>
            <Logo />
            <InputLogin setUser={setUser} />
            <SignUpOrSign option={true} />
        </>
    )
}
