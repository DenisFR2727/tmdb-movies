import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IMovieState } from '../../reducers/types';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchVideoSeries } from '../../reducers/movies';

import {
    PopularTVSeries,
    PopularVideoSeries,
    VideoResponseSeries,
} from '../../api/types';
// Mui
import { Button, CardActions, Grid, Paper } from '@mui/material';
import { Box } from '@mui/material';
import { Modal } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { useSpring, animated } from '@react-spring/web';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReactPlayer from 'react-player';

const AnimatedCard = animated(Paper);
function TVSeriesCards({
    id,
    backdrop_path,
    name,
    overview,
    poster_path,
    first_air_date,
    vote_average,
    origin_country,
}: PopularTVSeries) {
    const dispatch = useAppDispatch();
    const videos = useSelector(
        (state: { movies: IMovieState }) => state.movies.videoSeries
    );
    const [hiddenText, setHiddenText] = useState<boolean>(true);
    const [movieVideo, setMovieVideo] = useState<PopularVideoSeries | null>(
        null
    );
    const [open, setOpen] = useState<boolean>(false);
    const [props, set] = useSpring(() => ({
        paddingTop: '0px',
    }));
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const year: string = first_air_date.slice(0, 4);
    const rating: string = vote_average.toFixed(1);
    const country: string = origin_country.map((c) => c).join('');
    const [currentId, setCurrentId] = useState<number | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (currentId !== null) {
            dispatch(fetchVideoSeries(Number(currentId)));
        }
    }, [currentId, dispatch]);

    //  find video to id
    useEffect(() => {
        const videoResponse = videos.find(
            (videoResponse: VideoResponseSeries): boolean =>
                videoResponse.id === Number(id)
        );

        const video = videoResponse?.results[0] ?? null;
        setMovieVideo(video);
    }, [id, videos]);

    const getVideoMovie = (id: number) => {
        handleOpen();
        setCurrentId(id);
    };

    const openOverview = (): void => {
        if (hiddenText === true) {
            setHiddenText(false);
            set({ paddingTop: '30px' });
        } else {
            setHiddenText(true);
            set({ paddingTop: '0px' });
        }
    };
    return (
        <Card
            sx={{
                flexBasis: '200px',
                marginLeft: '1rem',
                marginRight: '1rem',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <CardContent sx={{ height: '100%' }}>
                <CardMedia component="img" image={poster_path} alt={name} />
            </CardContent>
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        textOverflow: 'ellipsis',
                        fontSize: isSmallScreen ? '24px' : '18px',
                    }}
                >
                    {name}
                </Typography>
                <Typography>Year: {year}</Typography>
                <Typography>Rating: {rating}</Typography>
                <Typography>Country: {country}</Typography>
                <AnimatedCard style={props} color="text.secondary">
                    {hiddenText ? (
                        `${overview.slice(0, 50)}`
                    ) : (
                        <>
                            {overview}{' '}
                            <CardActions>
                                <Button
                                    onClick={() => getVideoMovie(id)}
                                    size="small"
                                >
                                    Trailer video
                                </Button>
                            </CardActions>
                            <Grid>
                                <ModalVideo
                                    open={open}
                                    handleClose={handleClose}
                                    movieVideo={movieVideo}
                                />
                            </Grid>
                        </>
                    )}
                    {
                        <Button
                            sx={{
                                fontSize: '10px',
                                marginTop: '0px',
                                letterSpacing: '2px',
                                padding: '0',
                            }}
                            onClick={openOverview}
                        >
                            {hiddenText ? `...more` : `up`}
                        </Button>
                    }
                    <CardMedia
                        component="img"
                        image={backdrop_path}
                        alt={name}
                    />
                </AnimatedCard>
            </CardContent>
        </Card>
    );
}
interface ModalProps {
    open: boolean;
    handleClose: () => void;
    movieVideo: { key: string } | null;
}
function ModalVideo({ open, handleClose, movieVideo }: ModalProps) {
    return (
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
                    width: '80vw',
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
    );
}
export { ModalVideo };
export default TVSeriesCards;
