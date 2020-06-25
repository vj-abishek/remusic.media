import { combineReducers } from 'redux';
import primaryReducer from './primaryReducer';
import styleReducer from './style';


const rootReducers = combineReducers({
    primary: primaryReducer,
    style: styleReducer,
});

export default rootReducers;
