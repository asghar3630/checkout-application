import { Grid, Typography } from '@mui/material';
import { appHeaderHeight, mainLayoutOuterSpacing } from 'store/constant';

const MessageBox = ({ headerHeight }) => {
    return (
        <Grid
            container
            direction={'column'}
            // spacing="10"
            alignItems="center"
            justifyContent="center"
            sx={{
                height: `calc(100vh - (${appHeaderHeight}px + ${headerHeight}px + ${mainLayoutOuterSpacing}px ))`
            }}
        >
            <Grid item></Grid>
            <Grid item sx={{ mt: 2 }}>
                <Typography variant="h3">There’s nothing here yet!</Typography>
            </Grid>
        </Grid>
    );
};

export default MessageBox;
