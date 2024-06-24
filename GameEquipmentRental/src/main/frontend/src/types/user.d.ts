export interface UserInput {
    id?: string;
    username?: string;
    password?: string;
    passwordConfirm?: string;
    name?: string;
    phone?: string;
}

interface FormProps {
    initialValues: UserInput;
    endpoint: string;
    onSuccessMessage: string;
    onFailureMessage: string;
    fields: Array<keyof UserInput>;
    submitButtonText?: string;
    headers: { [key: string]: string };
}