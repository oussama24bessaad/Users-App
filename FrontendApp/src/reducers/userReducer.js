import { 
  GET_USERS_LOADING,
GET_USERS_SUCCESS,
GET_USERS_FAILED
} from '../actions/actionTypes'

const initialState = {
  userList:[],
  loading:false,
  errors:null
}


const userReducer = (state=initialState,{type,payload})=>{
switch (type) {
    case GET_USERS_LOADING:
      return {...state,loading:true}
    case GET_USERS_SUCCESS:
      return {...state,loading:false,userList:payload}
    case GET_USERS_FAILED:
      return {...state,loading:false,errors:payload}
    default:
      return state
  }
}
export default userReducer