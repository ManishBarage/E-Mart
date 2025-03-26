import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-signup',
  standalone:true,
  imports: [CommonModule,RouterLink,HttpClientModule,ReactiveFormsModule,FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent {
  regForm:boolean = false;
  signUpForm!:FormGroup;
  signInForm!:FormGroup;
  signUpSubmitted = false;
  href:string='';
  user_data:any;
  user_details!:User;
  user_reg_data:any;
  signInFormValue:any =  {};

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginSignupService){}

  ngOnInit():void{
    this.href = this.router.url;
    if(this.href == '/sign-up')
    {
      this.regForm = true;
    }
    else if(this.href == '/sign-in')
    {
      this.regForm = false;
    }

    this.signUpForm = this.formBuilder.group({
      name : ['',Validators.required],
      mobNumber : ['',Validators.required],
      age : ['',Validators.required],
      dob : ['',Validators.required],
      email : ['',Validators.required],
      password :['',Validators.required],
      addLine1 : ['',Validators.required],
      addLine2 : ['',Validators.required],
      city : ['',Validators.required],
      state : ['',Validators.required],
      zipCode : ['',Validators.required],
      language : ['',Validators.required],
      gender : ['',Validators.required],
      aboutYou : ['',Validators.required],
      uploadPhoto : ['',Validators.required],
      agreetc : ['',Validators.required],
      role : ['',Validators.required]

    });
  }

  get rf(){
    return this.signUpForm.controls;
  }

  onSubmitSignUp(){
    this.signUpSubmitted = true;
    if(this.signUpForm.invalid)
    {
      return;
    }

    this.user_reg_data = this.signUpForm.value;
    this.user_details = {
      aboutYou:this.user_reg_data.aboutYou,
      age:this.user_reg_data.age,
      agreetc:this.user_reg_data.agreetc,
      dob:this.user_reg_data.dob,
      email:this.user_reg_data.email,
      gender:this.user_reg_data.gender,
      address:{
        id:0,
        addLine1:this.user_reg_data.addLine1,
        addLine2:this.user_reg_data.addLine2,
        city:this.user_reg_data.city,
        state:this.user_reg_data.state,
        zipCode:this.user_reg_data.zipCode
      },
      language:this.user_reg_data.language,
      mobNumber:this.user_reg_data.mobNumber,
      name:this.user_reg_data.name,
      passsword:this.user_reg_data.passsword,
      role:this.user_reg_data.role,
      uploadPhoto:this.user_reg_data.uploadPhoto

    }

    this.loginService.userRegister(this.user_details).subscribe(data=>{
      alert("User Registered Successfully");
      this.router.navigateByUrl('/sign-in');
    })
  }

  onSubmitSignIn()
  {
     this.loginService.authLogin(this.signInFormValue.userEmail, this.signInFormValue.userPassword).subscribe(data=>{
      this.user_data = data;
      // console.log(this.user_data.length);
      if(this.user_data.length == 1)
      {
        if(this.user_data[0].role == "seller")
        {
          sessionStorage.setItem("user_session_id",this.user_data[0].id);
          sessionStorage.setItem("role",this.user_data[0].role);
          this.router.navigateByUrl('/seller-dashboard');
        }
        else if(this.user_data[0].role == "buyer")
        {
          sessionStorage.setItem("user_session_id",this.user_data[0].id);
          sessionStorage.setItem("role",this.user_data[0].role);
          this.router.navigateByUrl('/buyer-dashboard');
        }
        else
        {
          alert("Invalid Login details");
        }
      }
      else
      {
        alert("Invalid");
      }
      console.log(this.user_data);
     }, error=>{
      console.log("My Error",error);
      
     })
  }
}
