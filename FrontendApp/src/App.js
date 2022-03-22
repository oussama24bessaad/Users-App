import {useEffect,useState} from 'react'
import { addUser, deleteUser, getUsers, updateUser } from './actions/userActions';
import {useDispatch,useSelector} from 'react-redux'


function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUsers())
  },[dispatch])
  const {loading,userList} = useSelector(state=>state.users)
  const [newUser, setNewUser] = useState({})
  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]:e.target.value})
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // send data to the server
    dispatch(addUser(newUser))
  }
  const handleDelete = (e,userId) => {
    e.preventDefault()
    dispatch(deleteUser(userId))
  }
  const handleUpdate = (e,id) => {
    e.preventDefault()
    dispatch(updateUser(id,newUser))
  }
  return (
    <div className="App">
      Contact
     <form>
       <input type='text' placeholder='name' name='name' onChange={handleChange} />
       <input type='text' placeholder='age' name='age' onChange={handleChange} />
       <input type='text' placeholder='email' name='email' onChange={handleChange} />
       <input type='text' placeholder='occupation' name='occupation' onChange={handleChange} />
      <button onClick={handleSubmit}>ADD</button>
     </form>
     {loading && <p>loading....</p>}
    {userList && userList.map(user=>(
      <div key={user._id}>
      <h6>{user.name} </h6>
      <p>{user.email} </p>
      <button onClick={(e)=>handleDelete(e,user._id)} >delete</button>
      <button onClick={(e)=>handleUpdate(e,user._id)}>Edit</button>
      </div>
    ))}
    </div>
  );
}

export default App;
