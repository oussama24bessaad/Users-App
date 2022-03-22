import userReducer from './userReducer'
import {combineReducers} from 'redux'

export default combineReducers({users:userReducer})