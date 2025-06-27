import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from './App';

// style + assets
import 'assets/scss/style.scss';
import config from './config';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'store';
import AppContextProvider from 'store/appContext';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter basename={config.basename}>
                <AppContextProvider>
                    <App />
                </AppContextProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
