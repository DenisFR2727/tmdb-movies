import { useEffect } from 'react';
import { fetchPopularMovie } from '../../reducers/movies';
import { useAppDispatch } from '../../hooks/hooks';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { Popular } from '../../api/types';
import { NavLink } from 'react-router-dom';
import { LoadingSpinner } from '../spinners/Spinner';

// Bootstrap
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';

import './home.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PopularProps {
    popular: Popular[];
    loading: boolean;
}

function Home({ popular, loading }: PopularProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPopularMovie());
    }, [dispatch]);

    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <section className="carusel-section">
            <h2>Popular Movie</h2>
            <Carousel className="carusel-item">
                {popular.map((p) => (
                    <Carousel.Item key={p.id}>
                        <Image
                            className="d-block w-100"
                            src={p.poster_path}
                            alt={p.title}
                            fluid
                        />

                        <Carousel.Caption>
                            <h5>{p.title}</h5>
                            <h3>{p.original_title}</h3>
                            <NavLink
                                style={{
                                    textDecoration: 'none',
                                    color: 'white',
                                }}
                                to={`/details/${p.id}`}
                            >
                                Open
                            </NavLink>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
}
const mapStateToProps = (state: RootState) => ({
    popular: state.movies.popular,
    loading: state.movies.loading,
});
const connector = connect(mapStateToProps);

export default connector(Home);
