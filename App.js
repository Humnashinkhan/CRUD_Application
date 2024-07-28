import './App.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
function App() {

     const blankUser = {
      "name": "",
      "email": "",
      "role" : "",
      "address" : ""

     }


  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(blankUser);
  const [userdata, setUserdata] = useState([]);
  const [action, setAction] = useState('Add');
  const [editIndex, setEditIndex] = useState(null);




  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
     setOpen(false);
     setAction('Add');
  }
   
  const addUser = () =>{
    setUserdata([...userdata, user]);
    setUser(blankUser);
    onCloseModal();
  }
  const editUser = (index) =>{
     setAction('Edit');
     const selectedUser = userdata.find((x,i) => i === index );
     setUser(selectedUser);
     setEditIndex(index);
     onOpenModal();
  }

  const updateUser = () =>{
     const newUsers = userdata.map((x, i) =>{
       if(i === editIndex){
        x = user;
       }
       return x;
     });
     setUserdata(newUsers);
     setUser(blankUser);
     setEditIndex(null);
     onCloseModal();
  }
   const deleteUser = (index) =>{
     const newUsers = userdata.filter((x, i) => { return i !== index})
     setUserdata(newUsers);
   }

  return (
    <div className="container">
      <div className="d-flex">
        <h1>CRUD APP</h1>
      </div>
      <div className="tool-bar">
        <button className="btn" onClick={onOpenModal}>
        <FontAwesomeIcon icon={faPlus} size={16}/>
        <span>Add</span>
        </button>
      </div>
      <hr />
      <table className="table">
        <thead>
           <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
            <th>Action</th>
            </tr> 
        </thead>
        <tbody>
          {userdata.length > 0 && userdata.map((user,index) =>{
            return ( <tr>
             <td>{user.name}</td>
             <td>{user.email}</td>
             <td>{user.role}</td>
             <td>{user.address}</td>
             <td>
               <button className="btn m12" onClick = {() => editUser(index)}>
               <FontAwesomeIcon icon={faEdit} size={16}/>
                   <span>Edit</span>
               </button>
               <button className="btn m12" onClick = {() => deleteUser(index)}>
               <FontAwesomeIcon icon={faTrash} size={16}/>
                   <span>Delete</span>
               </button>
             </td>
             </tr>)
          })
        
}
     
        </tbody>
      </table>
      <Modal open={open} onClose={onCloseModal} center>
         <h2>{action} User</h2>
        {/* <p>{JSON.stringify(user)}</p> */}
         <div className="form">
          <label htmlFor="name">Name</label>
             <input type="text" value={user.name} onChange={(e) => setUser({...user, "name":e.target.value})} />
          <label htmlFor="name">Email</label>
             <input type="text" value={user.email} onChange={(e) => setUser({...user, "email":e.target.value})} />
          <label htmlFor="name">Role</label>
             <input type="text" value={user.role}  onChange={(e) => setUser({...user, "role":e.target.value})}/>
          <label htmlFor="name">Address</label>
           <textarea name="address" value={user.address} id="" cols= "30" rows="4" onChange={(e) => setUser({...user, "address":e.target.value})}></textarea> 
       {action === 'Add' &&<button className="btn" onClick= {() =>addUser()}>Submit</button>}
       {action === 'Edit' &&<button className="btn" onClick= {() =>updateUser()}>Update</button>}

         </div>
         </Modal>
        </div>
  );
}

export default App;
