import { useState, useRef, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';
import { actionTypes } from 'store/reducers/authRedux';
import { CLEAR_MENU } from 'store/actions';
import { useAppContext } from 'store/appContext';
import UseNotificationsBar from 'views/utilities/NotificationsBar';
import { snakeBarErrorMessageObject } from 'views/utilities/helperFunctions.';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const context = useAppContext();
    const notifications = UseNotificationsBar();
    const customization = useSelector((state) => state.customization);
    const loggedInUser = useSelector(({ auth }) => auth.loggedInUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [showChangePasswordScreen, setShowChangePasswordScreen] = useState(false);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        dispatch({
            type: CLEAR_MENU
        });
        dispatch({
            type: actionTypes.Logout
        });
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        // setSelectedIndex(index);
        // handleClose(event);
        // if (route && route !== '') {
        //     navigate(route);
        // }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: '#FFFF',
                    color: '#4C86C5',
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: '#4C86C5',
                        background: `#4C86C5!important`,

                        '& svg': {
                            stroke: '#e1e9f3'
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        // src={User1}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer',
                            backgroundColor: '#e1e9f3'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Box sx={{ p: 2 }}>
                                        <Stack>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Typography
                                                    component="span"
                                                    variant="h4"
                                                    sx={{ fontWeight: 400, textTransform: 'capitalize' }}
                                                >
                                                    {loggedInUser.username}
                                                </Typography>
                                            </Stack>
                                            <Typography variant="subtitle2"> {loggedInUser?.email ?? ''}</Typography>
                                        </Stack>

                                        <List
                                            component="nav"
                                            sx={{
                                                width: '100%',
                                                maxWidth: 350,
                                                minWidth: 300,
                                                backgroundColor: theme.palette.background.paper,
                                                borderRadius: '10px',
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: '100%'
                                                },
                                                '& .MuiListItemButton-root': {
                                                    mt: 0.5
                                                }
                                            }}
                                        >
                                            <ListItemButton
                                                sx={{ borderRadius: `${customization.borderRadius}px`, ':hover': { marginLeft: 2 } }}
                                                selected={selectedIndex === 1}
                                                onClick={(event) => {
                                                    // handleListItemClick(event, 1, '/user/social-profile/posts');
                                                    // setShowChangePasswordScreen(true);
                                                    handleToggle();
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <DonutLargeIcon stroke={1.5} size="1.3rem" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={
                                                        <Grid container spacing={1} justifyContent="space-between">
                                                            <Grid item>
                                                                <Typography variant="body2">Password Update</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                />
                                            </ListItemButton>
                                            <ListItemButton
                                                sx={{ borderRadius: `${customization.borderRadius}px`, ':hover': { marginLeft: 2 } }}
                                                selected={selectedIndex === 4}
                                                onClick={handleLogout}
                                            >
                                                <ListItemIcon>
                                                    <DonutLargeIcon stroke={1.5} size="1.3rem" />
                                                </ListItemIcon>
                                                <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                                            </ListItemButton>
                                        </List>
                                    </Box>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>

            <ChangePassword
                onUpdatedPasswordSubmit={handleOnUpdatedPasswordSubmit}
                show={showChangePasswordScreen}
                hideScreen={() => {
                    // setShowChangePasswordScreen(false);
                }}
            />
        </>
    );
};

export default ProfileSection;
