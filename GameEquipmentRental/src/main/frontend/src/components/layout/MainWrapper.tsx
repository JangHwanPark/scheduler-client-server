import {ReactNode} from "react";

export default function MainWrapper({children}: {children: ReactNode}) {
    return (
        <div>
            {children}
        </div>
    );
}