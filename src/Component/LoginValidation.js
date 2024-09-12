function Validation(values) {
  let errors = {};
  // const email_pattern = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  // const pass_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
 

  if (values.firstname === '') {
    errors.firstname = 'Name should not be empty';
  }
  else {
    errors.firstname= '';
  }
  
  if (values.lastname === '') {
    errors.lastname = 'username should not be empty';
  }
  else {
    errors.lastname= '';
  }


  if (values.mobile === '') {
    errors.mobile = 'mobile should not be empty';
  }
 

  if (values.email === '') {
    errors.email = 'email should not be empty';
  }  else {
    errors.email = '';
  }

  if(values.password === ''){
    errors.password  = 'pass should not be empty';
  }
   
   else{
    errors.password = '';
   }
  return errors;
}

export default Validation;
