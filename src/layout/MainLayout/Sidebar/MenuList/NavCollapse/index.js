import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

// project imports
import NavItem from '../NavItem';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { MENU_OPEN, MENU_SELECTED, SET_MENU, SUB_MENU_SELECTED } from 'store/actions';

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level }) => {
    const theme = useTheme();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (customization.selected == menu.id) {
            setOpen(!open);
        } else {
            dispatch({ type: SUB_MENU_SELECTED, subMenuSelected: '' });
            dispatch({ type: MENU_SELECTED, selected: menu.id });
        }
    };

    const checkIfListItemSelected = () => {
        const subMenuList = menu.children.map((item) => item.id);
        const ifListItemSelected = subMenuList.includes(customization.selected);
        const ifNestedItemSelected = menu.nestedRoutes?.find((route) => route.id == customization.selected)?.id ?? false;
        const ifCollapsedListItemSelected = menu.id == customization.selected ? true : false;
        const isOpen = ifListItemSelected || ifCollapsedListItemSelected || ifNestedItemSelected;
        setOpen(isOpen);
    };

    // menu collapse for sub-levels
    useEffect(() => {
        checkIfListItemSelected();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, menu.children]);

    // menu collapse & item
    const menus = menu?.children?.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const Icon = menu.icon;
    const menuIcon = menu.icon ? (
        <Icon
            strokeWidth={1.5}
            size={customization.selected === menu.id ? '1.9rem' : '1.7rem'}
            // style={{ marginTop: 'auto', marginBottom: 'auto' }}
            color="#2196f3"
        />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.selected === menu.id ? 8 : 6,
                height: customization.selected === menu.id ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    return (
        <>
            <ListItemButton
                sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                    py: level > 1 ? 0.5 : 0.75,
                    pl: `${level * 10}px`
                }}
                selected={customization.selected === menu.id}
                //selected={customization.isOpen.findIndex((id) => id === menu.id) > -1}
                onClick={handleClick}
            >
                <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
                <ListItemText
                    // primary={
                    //     <Typography variant={selected === menu.id ? 'h5' : 'body1'} color="inherit" sx={{ my: 'auto' }}>
                    //         {menu.title}
                    //     </Typography>
                    // }
                    primary={
                        <Typography
                            variant={customization.selected === menu.id ? 'menuItem1' : 'menuItem2'}
                            color="inherit"
                            sx={{ my: 'auto' }}
                        >
                            {menu.title}
                        </Typography>
                    }
                    secondary={
                        menu.caption && (
                            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                                {menu.caption}
                            </Typography>
                        )
                    }
                    sx={{ pt: 0.5 }}
                />
                {open ? (
                    <IconChevronUp stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                ) : (
                    <IconChevronDown stroke={1.5} size="1rem" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                )}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={{
                        position: 'relative',
                        '&:after': {
                            content: "''",
                            position: 'absolute',
                            left: '32px',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            opacity: 1,
                            background: theme.palette.primary.light
                        }
                    }}
                >
                    {menus}
                </List>
            </Collapse>
        </>
    );
};

NavCollapse.propTypes = {
    menu: PropTypes.object,
    level: PropTypes.number
};

export default NavCollapse;
