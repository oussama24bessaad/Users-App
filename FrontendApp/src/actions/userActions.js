import axios from 'axios'
import { 
  GET_USERS_LOADING,
GET_USERS_SUCCESS,
GET_USERS_FAILED,
POST_USERS_LOADING
} from './actionTypes'

export const getUsers = ()=> dispatch =>{
  dispatch({
    type:GET_USERS_LOADING
  })

  axios.get(`/api/users/getusers`)
    .then(res=>dispatch({
      type:GET_USERS_SUCCESS,
      payload:res.data
    }))
    .catch(err=>res=>dispatch({
      type:GET_USERS_FAILED,
      payload:err
    }))
}
export const addUser = (data)=> dispatch =>{
  dispatch({
    type:POST_USERS_LOADING
  })

  axios.post(`/api/users/adduser`,data)
    .then(res=>dispatch(getUsers()))
    .catch(err=>res=>dispatch({
      type:GET_USERS_FAILED,
      payload:err
    }))
}
export const deleteUser = (id)=> dispatch =>{

  axios.delete(`/api/users/deleteuser/${id}`)
    .then(res=>dispatch(getUsers()))
    .catch(err=>res=>dispatch({
      type:GET_USERS_FAILED,
      payload:err
    }))
}

export const updateUser = (id,data)=>dispatch =>{
  console.log( 'test :',id,data)
  axios.put(`/api/users/updateuser/${id}`,data)
  .then(res=>dispatch(getUsers()))
    .catch(err=>dispatch({
      type:GET_USERS_FAILED,
      payload:err.response.data
    }))
}
