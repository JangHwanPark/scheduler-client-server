import {ReactNode} from "react";

export default function FormContainer({children}: { children: ReactNode }) {
    return (
        <div className="login-container">
            <h1>
                <span className="spring">Spring Security</span>
                <span> x JWT x </span>
                <span className="react">React</span>
            </h1>
            <div className="inner-container">
                <main className="main-contents">
                    {children}
                </main>
            </div>
        </div>
);
}