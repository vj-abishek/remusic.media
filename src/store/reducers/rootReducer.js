import { combineReducers } from 'redux';
import primaryReducer from './primaryReducer';


const rootReducers = combineReducers({
    primary: primaryReducer,
});

export default rootReducers;
