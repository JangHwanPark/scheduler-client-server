interface PrimaryButtonProps {
    title: string;
    type?: 'button' | 'submit' | 'reset';
}

export default function PrimaryButton({ title, type }: PrimaryButtonProps) {
    return (
        <div className="btn-container">
            <button type={type} className="primary-btn">
                {title}
            </button>
        </div>
    );
}