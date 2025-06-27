import { Backdrop } from '@mui/material';
import { useTheme } from '@mui/styles';
import { useState, useContext, createContext } from 'react';
import UIProgress from 'views/utilities/UIProgress';

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

const AppContextProvider = (props) => {
    const [progressBarStatus, setProgressBarStatus] = useState(false);
    const showProgress = () => {
        setProgressBarStatus(true);
    };
    const hideProgress = () => {
        setProgressBarStatus(false);
    };
    return (
        <AppContext.Provider
            value={{
                progressBarStatus,
                showProgress,
                hideProgress
            }}
        >
            {progressBarStatus && (
                <>
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={progressBarStatus}>
                        <UIProgress />
                    </Backdrop>
                </>
            )}
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
