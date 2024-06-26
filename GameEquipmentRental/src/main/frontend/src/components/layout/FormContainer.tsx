import {ReactNode} from "react";

export default function FormContainer({children}: { children: ReactNode }) {
    return (
        <div className="inner-container">
            {children}
        </div>
    );
}