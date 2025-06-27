import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import storageSession from "redux-persist/lib/storage/session";

export const actionTypes = {
    Login: 'Login Action',
    Logout: 'Logout Action',
    SaveRegistrationEmail: 'Save Registration Email',
    UpdateTempLoggedInUser: 'Update Login User',
    SetViewExpired: 'View Expired',
    SaveLoggedInUser: 'Save LoggedIn User Details'
};

const initialAuthState = {
    user: {},
    loggedInUser: {},
    token: '',
    refreshToken: '',
    registrationEmail: '',
    viewExpired: false
};

export const authReducer = persistReducer(
    {
        storage,
        key: 'v01-checkout-fe',
        whitelist: ['token', 'refreshToken', 'loggedInUser']
    },
    (state = initialAuthState, action) => {
        switch (action.type) {
            case actionTypes.Login: {
                const { token, refreshToken } = action.payload;
                return { ...state, token: token, refreshToken: refreshToken };
            }

            case actionTypes.Logout: {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('refreshToken');
                return initialAuthState;
            }

            case actionTypes.SaveRegistrationEmail: {
                return { ...state, registrationEmail: action.payload.email };
            }
            case actionTypes.UpdateTempLoggedInUser: {
                return {
                    ...state,
                    user: action.payload.userdetails
                };
            }
            case actionTypes.SetViewExpired: {
                return {
                    ...initialAuthState,
                    viewExpired: action.payload.isExpired ?? false
                };
            }
            case actionTypes.SaveLoggedInUser: {
                return {
                    ...state,
                    loggedInUser: { ...action.payload }
                };
            }
            default:
                return state;
        }
    }
);
