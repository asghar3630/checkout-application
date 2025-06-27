import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, useMediaQuery } from '@mui/material';

// project imports
import ProfileSection from './ProfileSection';

// assets
import { IconMenu2 } from '@tabler/icons';
import { MobileView } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { drawerWidth } from 'store/constant';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <>
            {/* logo & toggler button */}
            {leftDrawerOpened && (
                <Box
                    sx={{
                        width: drawerWidth - 10,
                        display: 'flex',
                        [theme.breakpoints.down('md')]: {
                            width: 'auto'
                        }
                    }}
                >
                    <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                        {/* <LogoSection /> */}
                    </Box>
                </Box>
            )}

            {/* {matchDownMd && ( */}
            <Box sx={{ marginLeft: { xs: 0, md: 0 } }}>
                <ButtonBase sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            {/* )} */}
            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {/* <NotificationSection /> */}
            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
