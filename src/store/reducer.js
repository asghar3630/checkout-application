import { combineReducers } from 'redux';

import * as auth from './reducers/authRedux';
// reducer import
import customizationReducer from './reducers/customizationReducer';
import heartBeatReducer from './reducers/heartBeatReducer';
import snackbarReducer from './reducers/snackbar';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    heartbeat: heartBeatReducer,
    customization: customizationReducer,
    snackbar: snackbarReducer,
    auth: auth.authReducer
});

export default reducer;
