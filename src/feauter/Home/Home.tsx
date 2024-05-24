import { useEffect, useState } from 'react';
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
import Marquee from '../Marquee/Marquee';
import { green } from '@mui/material/colors';

interface PopularProps {
    popular: Popular[];
    loading: boolean;
}
interface RandomColors {
    red: number;
    green: number;
    blue: number;
}
function Home({ popular, loading }: PopularProps) {
    const dispatch = useAppDispatch();
    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {
        const interval = setInterval((): void => {
            setColors(
                popular.map((): string => {
                    const rgbColors: RandomColors = {
                        red: Math.floor(Math.random() * 256),
                        green: Math.floor(Math.random() * 256),
                        blue: Math.floor(Math.random() * 256),
                    };
                    return `rgb(${rgbColors.red}, ${rgbColors.green}, ${rgbColors.blue})`;
                })
            );
        }, 1500);
        return () => clearInterval(interval);
    }, [popular]);

    useEffect(() => {
        dispatch(fetchPopularMovie());
    }, [dispatch]);

    if (loading) {
        return <LoadingSpinner />;
    }
    return (
        <section className="carusel-section">
            <h2>Popular Movie</h2>
            <Carousel id="carusel-item-mobile" className="carusel-item">
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
            <Marquee>
                {popular.map((t, index) => {
                    return (
                        <p style={{ color: colors[index] }} key={t.id}>
                            {t.original_title}
                        </p>
                    );
                })}
            </Marquee>
        </section>
    );
}
const mapStateToProps = (state: RootState) => ({
    popular: state.movies.popular,
    loading: state.movies.loading,
});
const connector = connect(mapStateToProps);

export default connector(Home);
