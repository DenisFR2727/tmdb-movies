import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    IMovieState,
    fetchDatailsMovies,
    fetchVideoMovies,
} from '../../reducers/movies';
import ReactPlayer from 'react-player';
// mui
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Box, Container, Grid } from '@mui/material';
import { MovieDetails, Video, VideoResponse } from '../../api/tmdb';
import { useAppDispatch } from '../../hooks/hooks';
import { Modal } from '@mui/material';

function CardFilmDetails() {
    const { id } = useParams<string>();
    const dispatch = useAppDispatch();
    const movies = useSelector(
        (state: { movies: IMovieState }) => state.movies.datails
    );
    const videos = useSelector(
        (state: { movies: IMovieState }) => state.movies.video
    );
    const [datails, setDatails] = useState<MovieDetails | null>(null);
    const [movieVideo, setMovieVideo] = useState<Video | null>(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        dispatch(fetchDatailsMovies(Number(id)));
        dispatch(fetchVideoMovies(Number(id)));
    }, [id, dispatch]);

    useEffect(() => {
        const movie = movies.find(
            (movie: MovieDetails): boolean => movie.id === Number(id)
        );
        setDatails(movie ?? null);
    }, [id, movies]);

    useEffect(() => {
        const videoResponse = videos.find(
            (videoResponse: VideoResponse): boolean =>
                videoResponse.id === Number(id)
        );
        // Assuming the first video in the results array is the one you want
        const video = videoResponse?.results[0] ?? null;
        setMovieVideo(video);
    }, [id, videos]);

    const getVideoMovie = () => {
        handleOpen();
    };
    if (!datails) {
        return (
            <Typography
                variant="h4"
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                Movie not found
            </Typography>
        );
    }
    const {
        title,
        overview,
        popularity,
        image,
        budget,
        genres,
        production_companies,
    } = datails;
    return (
        <Container sx={{ paddingTop: '50px' }}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Card sx={{ color: 'white' }}>
                        <CardMedia
                            component="img"
                            image={image}
                            title="green iguana"
                        />
                        <CardContent
                            sx={{
                                backgroundImage: `url(${'/image/flat-bg.jpg'})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                color: 'red',
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                                sx={{
                                    fontWeight: 700,
                                    color: 'white',
                                    boxShadow: '10px 10px 15px 10px',
                                    textAlign: 'center',
                                    background: 'red',
                                    opacity: 0.8,
                                }}
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    border: '1px solid black',
                                    padding: '15px',
                                    lineHeight: '25px',
                                    fontWeight: 500,
                                    color: 'red',
                                    background: 'white',
                                    opacity: 0.6,
                                }}
                            >
                                {overview}
                            </Typography>
                            <Typography
                                sx={{
                                    paddingTop: '20px',
                                    color: 'red',
                                    background: 'white',
                                    opacity: 0.6,
                                    borderRadius: '10px',
                                    paddingBottom: '10px',
                                }}
                            >
                                Budget: {Number(budget)}$
                            </Typography>
                            <Typography>{popularity}</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    border: '1px solid black',
                                    padding: '5px',
                                    borderRadius: '10px',
                                    color: 'red',
                                    background: 'white',
                                    opacity: 0.6,
                                }}
                            >
                                <Typography>Genres:</Typography>
                                {genres?.map((g, index, array) => (
                                    <Typography
                                        key={g.id}
                                        sx={{ paddingLeft: '10px' }}
                                    >
                                        {g.name}
                                        {index !== array.length - 1 ? ',' : ''}
                                    </Typography>
                                ))}
                            </Box>
                            <Box>
                                {production_companies.map((p) => (
                                    <Box key={p.id}>
                                        <Typography>{p.name}</Typography>
                                        <Typography>
                                            Country: {new Set(p.origin_country)}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button onClick={getVideoMovie} size="small">
                                Trailer video
                            </Button>
                        </CardActions>
                        <Grid>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        p: 4,
                                        width: '80vw', // 80% of viewport width
                                        height: '80vh',
                                    }}
                                >
                                    <ReactPlayer
                                        url={`https://www.youtube.com/watch?v=${movieVideo?.key}`}
                                        playing
                                        controls
                                        width="100%"
                                        height="100%"
                                    />
                                </Box>
                            </Modal>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
export default CardFilmDetails;
