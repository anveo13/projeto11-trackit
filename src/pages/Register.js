import Logo from "../components/Logo";
import InputSignUp from "../components/InputSignUp";
import SignUpOrSignIn from "../components/SignUpOrSignIn";

export default function SignIn() {
    return (
        <main>
            <Logo />
            <InputSignUp />
            <SignUpOrSignIn option={false} />
        </main>
    );
}
