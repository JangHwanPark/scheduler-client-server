interface SalesSummaryItemProps {
    title: string;
    value: string | number;
}

export const SalesSummaryItem = ({title, value}: SalesSummaryItemProps) => {
    return (
        <div className="sales-summary-item">
            <span className="sales-summary-title">{title}</span>
            <span className="sales-summary-value">{value}</span>
        </div>
    );
};