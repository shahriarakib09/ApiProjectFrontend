import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css"


function StudentView() {
    const [id, setId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [studentRoll, setStudentRoll] = useState("");
    const [studentAddress, setStudentAddress] = useState("");
    const [students, setUsers] = useState([]);
     
      useEffect(() => {
        (async () => await Load())();
      }, []);
     
      async function Load() {
        
        const result = await axios.get("https://localhost:7208/api/Student/GetAllStudentList");
        setUsers(result.data);
        console.log(result.data);
      }
     
      async function save(event) {
       
        event.preventDefault();
        try {
          await axios.post("https://localhost:7208/api/Student/AddStudent", {
            
            studentName: studentName,
            email: email,
            studentRoll: studentRoll,
            studentAddress: studentAddress,


           
          });
          alert("Student Registation Successfully");
              setId("");
              setStudentName("");
              setEmail("");
              setStudentRoll("");
              setStudentAddress("");
           
         
          Load();
        } catch (err) {
          alert(err);
        }
      }
      async function editStudent(students) {
        setStudentName(students.studentName);
        setEmail(students.email);
        setStudentRoll(students.studentRoll);
        setStudentAddress(students.studentAddress);
       
     
        setId(students.id);
      }
     
      async function DeleteStudent(id) {
      await axios.delete("https://localhost:7208/api/Student/DeleteStudent?Id=" + id);
       alert("Student deleted Successfully");
       setId("");
       setStudentName("");
       setEmail("");
       setStudentRoll("");
       setStudentAddress("");
       Load();
      }
     
      async function update(event) {
        event.preventDefault();
        try {
      await axios.put("https://localhost:7208/api/Student/UpdateStudent?Id="+ students.find((u) => u.id === id).id || id,
            {
            id: id,
            studentName: studentName,
            email: email,
            studentRoll: studentRoll,
            studentAddress: studentAddress,
            }
          );
          alert("Student Info Updated");
          setId("");
          setStudentName("");
          setEmail("");
          setStudentRoll("");
          setStudentAddress("");
         
          Load();
        } catch (err) {
          alert(err);
        }
      }


    return (
<div align="center">
        <h1 className="bg-primary text-white py-5">Student CRUD</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <table className="input-table">
            <tr><td>    
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            </td></tr> 
            
            <tr>
            <th><label class="badge bg-primary text-wrap">Student Name</label></th>
            <td><input
              type="text"
              class="form-control"
              id="studentName"
              placeholder="Student Name"
              value={studentName}
              onChange={(event) => {
                setStudentName(event.target.value);
              }}
            /></td></tr>
            <tr>
            <th><label class="badge bg-primary text-wrap">Email</label></th>
            <td><input
              type="text"
              class="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            /></td></tr>

            <tr>
            <th><label class="badge bg-primary text-wrap">Student Roll</label></th>
            <td><input
              type="text"
              class="form-control"
              id="studentRoll"
              placeholder="Student Roll"
              value={studentRoll}
              onChange={(event) => {
                setStudentRoll(event.target.value);
              }}
            /></td></tr>
            <tr>
            <th><label class="badge bg-primary text-wrap">Student Address</label></th>
            <td><input
              type="text"
              class="form-control"
              id="studentAddress"
              placeholder="Student Address"
              value={studentAddress}
              onChange={(event) => {
                setStudentAddress(event.target.value);
              }}
            /></td></tr>
            </table>
          </div>
        <div>
            <button class="btn btn-primary mt-4 mx-1" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4 mx-1" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
      <table className="table table-bordered ">
        <thead className="table table-primary">
          <tr>
            <th scope="col">Student Id </th>
            <th scope="col">Student Name </th>
            <th scope="col">Email</th>
            <th scope="col">Student Roll</th>
            <th scope="col">Student Address</th>
         
 
            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <td>{student.id} </td>
                <td>{student.studentName}</td>
                <td>{student.email}</td>
                <td>{student.studentRoll}</td>
                <td>{student.studentAddress}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning mx-2"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger "
                    onClick={() => DeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default StudentView;
  