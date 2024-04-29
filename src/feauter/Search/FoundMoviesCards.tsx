import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';

import { MovieCardProps } from '../Movies/types';
import { Container } from '@mui/material';

const FoundMovies = ({
    id,
    title,
    overview,
    popularity,
    image,
}: MovieCardProps) => {
    return (
        <Container
            sx={{
                py: 2,
                display: 'flex',
                margin: '0 auto',
            }}
            maxWidth="lg"
        >
            <Grid>
                <Card>
                    <CardMedia
                        component={'div'}
                        image={image}
                        sx={{ pt: '56.25%' }}
                    />
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
            </Grid>
        </Container>
    );
};
export default FoundMovies;
