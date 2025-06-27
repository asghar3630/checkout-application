import { Grid, Stack, Typography } from '@mui/material';
import { appHeaderHeight, mainLayoutOuterSpacing } from 'store/constant';
import expediteIcon from '../../assets/images/expedite_icon.svg';

const ExpediteMessageBox = ({ headerHeight, trackingId }) => {
    return (
        <Grid
            container
            direction={'column'}
            alignItems="center"
            justifyContent="center"
            sx={{
                height: `calc(100vh - (${appHeaderHeight}px + ${headerHeight}px + ${mainLayoutOuterSpacing}px ))`
            }}
        >
            <Grid item>
                <img src={expediteIcon} alt="" />
            </Grid>
            <Grid item sx={{ mt: 2 }}>
                <Typography variant="h3">Successfully Expedite</Typography>
            </Grid>
            <Grid item sx={{ mt: 2 }}>
                <Stack direction="row">
                    <Typography variant="h5">{`Your application with Tracking Number`}</Typography>
                    <Typography variant="h4" sx={{ pl: 0.5, pr: 0.5 }}>
                        {trackingId.trackingId}
                    </Typography>
                    <Typography variant="h5">{` has been expedited successfully`}</Typography>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default ExpediteMessageBox;
