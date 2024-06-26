import { NavLink as RouterLink } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';

// Types
import { MovieCardProps } from './types';

function MovieCard({ id, title, overview, popularity, image }: MovieCardProps) {
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component={'div'} image={image} sx={{ pt: '56.25%' }} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secodary">
                    {overview}
                </Typography>
                <Typography variant="button" display="block" mt={2}>
                    {popularity}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    component={RouterLink}
                    to={`/details/${id}`}
                    color="secondary"
                >
                    Datails
                </Button>
            </CardActions>
        </Card>
    );
}
export default MovieCard;
