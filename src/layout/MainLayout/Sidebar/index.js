import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, Typography, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

import { drawerWidth, sideBarHeight, sideBarHeightUpXl, sideBarLogoBoxHeight, sideBarLogoBoxHeightUpXl } from 'store/constant';

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme();
    const matchUpXL = useMediaQuery(theme.breakpoints.up('xl'));
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const matchUpLg = useMediaQuery(theme.breakpoints.up('lg'));

    const drawer = (
        <>
            <BrowserView>
                <Box
                    sx={{
                        display: { xs: 'block', md: 'block' },
                        height: matchUpXL ? `${sideBarLogoBoxHeightUpXl}vh` : `${sideBarLogoBoxHeight}vh`
                    }}
                >
                    <Box sx={{ display: 'flex', pt: 1.5, mx: 'auto', justifyContent: 'center' }}>
                        <LogoSection />
                    </Box>
                </Box>
            </BrowserView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        bgcolor: theme.palette.background.primary,
                        color: theme.palette.text.primary,
                        borderRight: 'none'
                        // [theme.breakpoints.up('md')]: {
                        //     top: '88px'
                        // }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
