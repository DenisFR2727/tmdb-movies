import * as React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { PopularTVSeries } from '../../api/types';
import { Button } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
const AnimatedCard = animated(Typography);
function TVSeriesCards({
    backdrop_path,
    name,
    overview,
    poster_path,
    first_air_date,
    vote_average,
    origin_country,
}: PopularTVSeries) {
    const [hiddenText, setHiddenText] = useState<boolean>(true);
    const [props, set] = useSpring(() => ({
        paddingTop: '0px',
    }));
    const year: string = first_air_date.slice(0, 4);
    const rating: string = vote_average.toFixed(1);
    const country: string = origin_country.map((c) => c).join('');

    const openOverview = (): void => {
        if (hiddenText === true) {
            setHiddenText(false);
            set({ paddingTop: '20px' });
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
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={poster_path}
                alt={name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography>Year: {year}</Typography>
                <Typography>Rating: {rating}</Typography>
                <Typography>Country: {country}</Typography>
                <AnimatedCard
                    style={props}
                    variant="body2"
                    color="text.secondary"
                >
                    {hiddenText ? `${overview.slice(0, 50)}` : overview}
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
                        sx={{ marginTop: '10px' }}
                    />
                </AnimatedCard>
            </CardContent>
        </Card>
    );
}

export default TVSeriesCards;
// backdrop_path: string | undefined;
// first_air_date: string;
// genre_ids: Genre;
// id: number;
// name: string;
// origin_country: OriginCountry;
// original_language: string;
// original_name: string;
// overview: string;
// popularity: number;
// poster_path: string;
// vote_average: number;
// vote_count: number;
