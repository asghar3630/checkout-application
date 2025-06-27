import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { withStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { Box, CircularProgress, Grid, LinearProgress, Typography } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// customized with label
function CircularProgressWithLabel({ value, ...others }) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-flex'
            }}
        >
            <CircularProgress variant="determinate" value={value} {...others} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number
};

function LinearProgressWithLabel({ value, ...others }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    mr: 1
                }}
            >
                <LinearProgress variant="determinate" value={value} {...others} />
            </Box>
            <Box
                sx={{
                    minWidth: 35
                }}
            >
                <Typography variant="body2" color="textSecondary">{`${Math.round(value)}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// style constant
const BorderLinearProgress = withStyles(() => ({
    root: {
        height: 10,
        borderRadius: 5
    },
    bar: {
        borderRadius: 5
    }
}))(LinearProgress);

// ==============================|| UI PROGRESS ||============================== //

const UIProgress = () => {
    const theme = useTheme();
    const [progress, setProgress] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progressRef = React.useRef(() => {});
    React.useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Grid item xs={12} sm={6} md={12}>
            <Grid container spacing={2} justifyContent="center" marginTop={'20%'}>
                <Grid item>
                    <CircularProgress color="inherit" />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UIProgress;
