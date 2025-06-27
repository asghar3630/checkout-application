import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// action - state management
import * as actionTypes from '../actions';

export const initialState = {
    isRegionSelected: false,
    selectedRegion: ''
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const heartBeatReducer = persistReducer(
    {
        storage,
        key: 'v01-checkout-fe-heartBeat',
        whitelist: ['isRegionSelected', 'selectedRegion']
    },
    (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.MAP_REGION_SELECTED:
                return {
                    ...state,
                    isRegionSelected: action.payload.isRegionSelected,
                    selectedRegion: action.payload.selectedRegion
                };

            default:
                return state;
        }
    }
);

export default heartBeatReducer;
