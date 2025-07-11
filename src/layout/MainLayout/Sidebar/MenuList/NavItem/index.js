import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Chip, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, MENU_SELECTED, SUB_MENU_SELECTED, SET_MENU } from 'store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const selectedItem = useSelector((state) => state.menu);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const location = useLocation();
    const Icon = item.icon;

    // const getLogoColor = (itemId) => {
    //     switch (itemId) {
    //         case 'adjudication':
    //             return 'red';
    //         case 'administration':
    //             return 'blue';
    //         case 'approval':
    //             break;
    //         case 'dashboard':
    //             return 'yellow';
    //         case 'inventory':
    //             break;
    //         case 'printing':
    //             break;
    //         case 'production':
    //             break;
    //         case 'reporting':
    //             break;
    //         case 'tracking':
    //             break;
    //     }
    // };

    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size={customization.selected === item.id ? '1.9rem' : '1.7rem'} />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        dispatch({ type: MENU_OPEN, id });
        dispatch({ type: SUB_MENU_SELECTED, subMenuSelected: '' });
        if (level == 1) {
            dispatch({ type: MENU_SELECTED, selected: id });
        } else if (level > 1) {
            dispatch({ type: SUB_MENU_SELECTED, subMenuSelected: id });
        }

        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    };

    const isItemSelected = (item) => {
        const nestedItemSelected = item.nestedRoutes?.find((route) => route.id == customization.selected)?.id;
        if (
            customization.selected === item.id ||
            customization.subMenuSelected === item.id ||
            customization.selected == nestedItemSelected
        ) {
            return true;
        }
    };

    // active menu item on page load
    // useEffect(() => {
    //     const currentIndex = document.location.pathname
    //         .toString()
    //         .split('/')
    //         .findIndex((id) => id == item.id);

    //     // if (currentIndex > -1) {
    //     //     dispatch({ type: MENU_OPEN, id: item.id });
    //     // }
    //     // eslint-disable-next-line
    // }, [location.pathname]);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 0.5 : 0.75,
                pl: `${level > 1 ? level * 17 : level * 10}px`
            }}
            // selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
            // selected={customization.selected === item.id || customization.subMenuSelected === item.id}
            selected={isItemSelected(item)}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36, color: '#2196f3' }}>{itemIcon}</ListItemIcon>
            <ListItemText
                // primary={
                //     <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color="inherit">
                //         {item.title}
                //     </Typography>
                // }
                primary={
                    <Typography variant={level > 1 ? 'submMenuItem' : 'menuItem1'} color="inherit" noWrap>
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
                sx={{
                    pt: 0.5
                }}
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
        </ListItemButton>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
