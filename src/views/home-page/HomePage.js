import { Box, Stack } from '@mui/system';
import { appHeaderHeight, mainLayoutOuterSpacing } from 'store/constant';
import homePageImage from '../../assets/images/home_page_image.svg';

const HomePage = () => {
    return (
        <Box
            sx={{
                bgcolor: 'white',
                height: `calc(100vh - (${appHeaderHeight}px ))`,
                pb: `${mainLayoutOuterSpacing}px`,
                textTransform: 'capitalize',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Stack>
                <img src={homePageImage} alt="" />
            </Stack>
        </Box>
    );
};
export default HomePage;
