import {Table} from "./Table.tsx";

interface GeneralSectionProps<T> {
    title: string;
    headers: string[];
    data: T[];
}

export const GeneralSection = <T,>({ title, headers, data }: GeneralSectionProps<T>) => {
    return (
        <section className="general-section">
            <h3>{title}</h3>
            <Table headers={headers} data={data} />
        </section>
    );
};