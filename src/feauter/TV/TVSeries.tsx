import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchPopularTVSeries } from '../../reducers/movies';

export function TVSeries() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPopularTVSeries());
    }, [dispatch]);

    return (
        <div>
            About Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            omnis quisquam consequuntur aperiam repellat ad quam nostrum dicta,
            alias itaque recusandae nobis. Sapiente saepe omnis a temporibus
            nulla. Perferendis, maiores?
        </div>
    );
}
