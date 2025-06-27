import { Link } from 'react-router-dom';
// material-ui
import { ButtonBase } from '@mui/material';
// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { MENU_SELECTED } from 'store/actions';
import { useDispatch } from 'react-redux';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const dispatch = useDispatch();

    return (
        <ButtonBase
            disableRipple
            component={Link}
            to={config.defaultPath}
            onClick={() => {
                dispatch({ type: MENU_SELECTED, selected: 'dashboard' });
            }}
        >
            <Logo />
        </ButtonBase>
    );
};

export default LogoSection;
