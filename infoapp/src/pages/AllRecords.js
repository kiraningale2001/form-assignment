import React,{ useState, useEffect} from 'react'
import {
  Link,
} from "react-router-dom";
function AllRecords() {
    const [data,Setdata]=useState([])
    useEffect(() => {
        viewData();
      }, []);

      const viewData= async ()=>{
    
        fetch("https://ingalekiran.pythonanywhere.com/")
        .then(res=>res.json())
        .then(data=>Setdata(data));
        
      };
  return (
    <div className="mx-3">
      <center><h1 style={{color:"white"}}>All Records</h1></center>
      <Link to="/user-form" className="btn btn-primary my-3">User Form</Link>
      
      <table className="table-primary table">
  <thead>
    <tr>
      <th scope="col">SR.No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Date of Birth</th>
    </tr>
  </thead>
  <tbody>
  
  
      {data.map(
        iteam=>(
          <tr key={iteam.id}>
          <th scope="row">{iteam.id}</th>
          <td>{iteam.name}</td>
          <td>{iteam.email}</td>
          <td>{iteam.phone}</td>
          <td>{iteam.dob}</td>
        </tr>
        )
        )
      }
      </tbody>
  </table>
    </div>
  )
}

export default AllRecords
