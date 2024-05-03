import { useState } from 'react';
const usePagination = () => {
    const [page, setPage] = useState<number>(1);
    const itemsPerPage: number = 6;

    const handlePageChange = (_: any, value: number): void => {
        setPage(value);
    };

    return { page, itemsPerPage, handlePageChange };
};
export default usePagination;
