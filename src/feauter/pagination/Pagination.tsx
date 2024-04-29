import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProp {
    count: number;
    page: number;
    handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}
export default function PaginationRounded({
    count,
    page,
    handlePageChange,
}: PaginationProp) {
    return (
        <Stack
            spacing={2}
            sx={{
                background: 'white',
            }}
        >
            <Pagination
                count={count}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
            />
        </Stack>
    );
}
