import {ReactNode} from "react";

export default function FormContainer({children}: { children: ReactNode }) {
    return (
        <div className="form-container">
            {children}
        </div>
    );
}