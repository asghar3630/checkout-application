import { useDispatch } from 'react-redux';
import { openSnackbar } from 'store/reducers/snackbar';

const UseNotificationsBar = () => {
    const dispatch = useDispatch();

    const notifications = {
        showSnackBar: ({ type, message }) => {
            dispatch(
                openSnackbar({
                    open: true,
                    message,
                    variant: 'alert',
                    alert: {
                        color: type
                    }
                })
            );
        }
    };
    return notifications;
};

export default UseNotificationsBar;
