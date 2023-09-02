import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ValidationErrors,AbstractControl, FormBuilder} from '@angular/forms';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
registrationForm!: FormGroup;
user!:User;
userSubmitted!:boolean;
constructor(private fb : FormBuilder, 
            private userService:UserServiceService,
            private alertify:AlertifyService){}
//doing it using form builder
// ngOnInit(): void {
//   this.registrationForm=new FormGroup(
//     {
//       //userName : new FormControl('Mark',Validators.required),
//       userName : new FormControl(null,[Validators.required]),
//       email : new FormControl(null,[Validators.required,Validators.email]),
//       password : new FormControl(null,[Validators.required,Validators.minLength(8)]),
//       confirmPassword : new FormControl(null,[Validators.required,Validators.minLength(8)]),
//       mobile:new FormControl(null,[Validators.required,Validators.maxLength(10)])
//     },this.passwordMatchingValidator
//   )
// }
ngOnInit(): void {
  this.createRegistrationForm();
}
createRegistrationForm(){
  this.registrationForm= this.fb.group({
    userName : [null,[Validators.required]],
    email : [null,[Validators.required,Validators.email]],
    password : [null,[Validators.required,Validators.minLength(8)]],
    confirmPassword : [null,[Validators.required,Validators.minLength(8)]],
    mobile:[null,[Validators.required,Validators.maxLength(10)]]
 
  },{
    Validators:this.passwordMatchingValidator
  });
}
createRegistrationForm2(){
  this.registrationForm= this.fb.group({
    userName : [null,[Validators.required]],
    email : [null,[Validators.required,Validators.email]],
    password : [null,[Validators.required,Validators.minLength(8)]],
    confirmPassword : [null,[Validators.required,Validators.minLength(8)]],
    mobile:[null,[Validators.required,Validators.maxLength(10)]]
 
  },{
    Validators:this.passwordMatchingValidator
  });
}


passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
  return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null :
    { notmatched: true }
};

//Getter Methods for all the controls
get userName(){
  return this.registrationForm.get('userName') as FormControl;
}
get email(){
  return this.registrationForm.get('email') as FormControl;
}
get password(){
  return this.registrationForm.get('password') as FormControl;
}
get confirmPassword(){
  return this.registrationForm.get('confirmPassword') as FormControl;
}
get mobile(){
  return this.registrationForm.get('mobile') as FormControl;
}

onSubmit(){
  console.log(this.registrationForm.value);
  this.userSubmitted=true
  //this.user=Object.assign(this.user,this.registrationForm.value)
  if(this.registrationForm.valid){
    this.userService.addUser(this.userData());
    this.registrationForm.reset();  
    this.userSubmitted=false
    this.alertify.success('congrats, you are successfully registered')

  }else{
    this.alertify.error('kindly provide the required fields');
    
  }

}

userData(): User{
  return this.user={
    userName:this.userName.value, //this is coming from get method
    email:this.email.value,
    password:this.password.value,
    mobile:this.mobile.value
  }
}

//moving this to service
// addUser(user:any){
//   let users = [];
// if(localStorage.getItem('Users')){
// //simple type caste To array   
// users = Array(JSON.parse(localStorage.getItem('Users') as string))
//    users = [user,...users];
// }else{
//    users = [user]
// }
// localStorage.setItem('Users', JSON.stringify(users))
// }



}

