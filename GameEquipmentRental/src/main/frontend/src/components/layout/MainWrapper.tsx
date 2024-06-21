import {ReactNode} from "react";

export default function MainWrapper({children}: {children: ReactNode}) {
    return (
        <div className="main-wrapper">
            {children}
        </div>
    );
}