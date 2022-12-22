import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "./Form.css";
 

function Form(props) {
  const navigate = useNavigate();
  const initialValues = { name: "", email: "", phone: "",dob:"" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      addData(formValues);
    }
  }, [formErrors]);

  const addData= async (data)=>{
    
    let res=await fetch("https://ingalekiran.pythonanywhere.com/user-form/",{
      method:"POST",
      headers:{
        "Content-Type":'application/json'
      },
      body:JSON.stringify(data),
      });

    console.log(res.status);
    if (res.status===500){
      setInterval(navigate("/user-form"), 3000);
      
    
    }
    else if (res.status===200){
      setInterval(navigate("/"), 3000);
    
    }
    
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //new
    var regmm='^([0|+[0-9]{1,5})?([7-9][0-9]{9})$';
    var regmob = new RegExp(regmm);
    let today=new Date();
        let dateofbirth=new Date(values.dob);
        let age= today.getFullYear()-dateofbirth.getFullYear();
        let month=today.getMonth()-dateofbirth.getMonth()
        if (month<0 || (month===0 && today.getDate()<dateofbirth.getDate())){
            age--;
    }
      
    if (!values.name) {
      errors.name = "name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      errors.phone = "phone number is required";
    } else if (values.phone.length < 10) {
      errors.phone = "phone number must be more than 10 digit";
    } else if (values.phone.length > 10) {
      errors.phone = "phone number cannot exceed more than 10 digit";
    }else if(!regmob.test(values.phone)){
      errors.phone = "phone number is not valid";
    }

    if(!values.dob){
      errors.dob = "date of birth is required";
    } else if(age<18){
      errors.dob = "Age should be more than 18";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success success-msg">Sending....</div>
        
      ) : (
        <pre></pre>
      )}

      <form onSubmit={handleSubmit}>
        <center><h1>Form</h1></center>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.name}</p>
          <div className="field">
          
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formValues.phone}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.phone}</p>

          <div className="field">
            
            <input
              type="text"
              name="dob"
              placeholder="Date of Birth"
              value={formValues.dob}
              onChange={handleChange}
              onFocus={(e)=>(e.target.type="date")}
            />
          </div>
          <p>{formErrors.dob}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;