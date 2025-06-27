// project imports
import config from 'config';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

// action - state management
import * as actionTypes from '../actions';
import localStorage from 'redux-persist/es/storage';

export const initialState = {
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    selected: '',
    subMenuSelected: '',
    selectedRows: [],
    progressBarLoader: '',
    batchSummery: {}
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = persistReducer(
    {
        storage,
        key: 'v01-checkout-fe-customization',
        whitelist: ['selected', 'subMenuSelected']
    },
    (state = initialState, action) => {
        let id;
        switch (action.type) {
            case actionTypes.MENU_OPEN:
                id = action.id;
                return {
                    ...state,
                    isOpen: [id]
                };
            case actionTypes.SET_MENU:
                return {
                    ...state,
                    opened: action.opened
                };
            case actionTypes.MENU_SELECTED:
                return {
                    ...state,
                    selected: action.selected
                };
            case actionTypes.SUB_MENU_SELECTED:
                return {
                    ...state,
                    subMenuSelected: action.subMenuSelected
                };
            case actionTypes.SET_FONT_FAMILY:
                return {
                    ...state,
                    fontFamily: action.fontFamily
                };
            case actionTypes.SET_BORDER_RADIUS:
                return {
                    ...state,
                    borderRadius: action.borderRadius
                };
            case actionTypes.CLEAR_MENU:
                return {
                    ...state,
                    subMenuSelected: '',
                    selected: ''
                };
            case actionTypes.SELECTED_SITES_IN_PRODUCTION:
                return {
                    ...state,
                    selectedRows: action.selectedRows
                };
            case actionTypes.BATCH_PAYLOAD:
                return {
                    ...state,
                    batchPayload: action.batchPayload
                };
            case actionTypes.BATCH_SUMMARY:
                return {
                    ...state,
                    batchSummery: action.batchSummery
                };
            case actionTypes.IS_BATCH_CREATED:
                return {
                    ...state,
                    isBatchCreated: action.isBatchCreated
                };
            case actionTypes.IS_SITE_SELECTED:
                return {
                    ...state,
                    isSiteSelected: action.isSiteSelected
                };
            default:
                return state;
        }
    }
);

export default customizationReducer;
