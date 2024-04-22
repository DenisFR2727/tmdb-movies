import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MoviesProps } from './Movies';
import { MovieCardProps } from './MoviesCard';

// mui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// import styles from './MovieCard.module.scss';

function CardFilm() {
    const { id } = useParams<string>();
    const movies = useSelector((state: MoviesProps) => state.movies);
    const [movie, setMovie] = useState<MovieCardProps | null>(null);

    useEffect(() => {
        const movie = movies.find(
            (movie: MovieCardProps): boolean => movie.id === Number(id)
        );
        setMovie(movie ?? null);
    }, [id, movies]);

    if (!movie) {
        return <div>Movie not found</div>;
    }
    const { title, overview, popularity } = movie;

    return (
        <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                </Typography>
                <Typography>{overview}</Typography>
                <Typography>{popularity}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
export default CardFilm;

// default style component----------------------
// <div className={styles.selectCard}>
//     <h1>{title}</h1>
//     <div className={styles.overview}>{owerview}</div>
//     <div className={styles.popularity}>{popularity}</div>
//     <div>Release: {release_date}</div>
//     <div>{vote_average}</div>
//     <div>{vote_count}</div>
// </div>

//bootstrap-react--------------------------
{
    /* <Card
style={{
    width: '18rem',
    margin: '0 auto',
}}
>
<Card.Img variant="top" src="holder.js/100px180" />
<Card.Body>
    <Card.Title>{title}</Card.Title>
    <Card.Text>{owerview}</Card.Text>
    <Card.Text>{popularity}</Card.Text>
    <Card.Text>Release: {release_date}</Card.Text>
    <Card.Text>{vote_average}</Card.Text>
    <Card.Text>{vote_count}</Card.Text>
    <Button variant="primary">Go somewhere</Button>
</Card.Body>
</Card> */
}
