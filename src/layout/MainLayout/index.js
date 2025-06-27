import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Divider, Toolbar, useMediaQuery } from '@mui/material';

import { appHeaderHeight, appHeaderMargin, drawerWidth, mainLayoutOuterSpacing } from 'store/constant';
import { SET_MENU } from 'store/actions';
import Customization from 'layout/Customization';

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            height: `calc(100vh - (${appHeaderHeight}px ))`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        borderRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px  )`,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            height: `calc(100vh - (${appHeaderHeight}px ))`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownLg = useMediaQuery(theme.breakpoints.down('lg'));
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownLg });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLg]);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* header */}
            {/* <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.primary,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
                    height: `${appHeaderHeight}px`,
                    // '& .css-yfncy1-MuiToolbar-root': {
                    //     paddingLeft: mainLayoutOuterSpacing,
                    //     paddingRight: mainLayoutOuterSpacing
                    // }
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar> */}

            {/* drawer */}
            {/* <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} /> */}

            {/* main content */}
            <Main
                theme={theme}
                open={leftDrawerOpened}
                sx={{
                    backgroundColor: 'transparent',
                    ml: 0,
                    mr: 0,
                    p: 0,
                    width: '100%',
                    mt: `${appHeaderHeight}px`
                }}
            >
                {/* breadcrumb */}
                {/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon rightAlign /> */}
                <Outlet />
            </Main>
            <Customization />
        </Box>
    );
};

export default MainLayout;
