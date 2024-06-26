import {ChangeEvent} from "react";

interface InputTypes {
    type: string;
    name: string;
    handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: any;
    icon?: any;
    placeholder?: string;
}

export default function InputField(
    {
        type,
        name,
        handleChange,
        value,
        icon,
        placeholder
    }: InputTypes) {

    return (
        <div className="input-field" key={name}>
            <label htmlFor={`login-${name}`}>
                {icon}
            </label>
            <input
                id={`login-${name}`}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
            />
        </div>
    );
}