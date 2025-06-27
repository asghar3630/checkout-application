import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
// import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useState, useContext } from 'react';
import { useRoutes } from 'react-router';
import { useEffect } from 'react';
import Snackbar from 'ui-component/extended/Snackbar';
import { useAppContext } from 'store/appContext';
import MainRoutes from 'routes/MainRoutes';

// ==============================|| APP ||============================== //

const App = () => {
    const { customization } = useSelector((state) => state.customization);

    const context = useAppContext();

    const mainRoutes = useRoutes([MainRoutes]);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    {mainRoutes}
                    <Snackbar />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
