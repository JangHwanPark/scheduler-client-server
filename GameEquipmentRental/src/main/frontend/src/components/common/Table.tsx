import {ReactNode} from "react";

interface TableProps<T> {
    headers: string[];
    data: T[];
}

export const Table = <T,>({ headers, data }: TableProps<T>) => {
    return (
        <table>
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {headers.map((header, cellIndex) => (
                        <td key={cellIndex}>{row[header as keyof T] as ReactNode}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};