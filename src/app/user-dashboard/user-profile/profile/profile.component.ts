import { Component, OnInit } from '@angular/core';
import { AuthorizedService } from 'src/app/shared/Services/Authorized/authorized.service';

import { FormBuilder,  Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmedValidator } from '../../../shared/PasswordValidation/confirm-password.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : any;
  ChangePassword: FormGroup;
  submitted = false;
  
  constructor( private fb: FormBuilder, private router: Router, private authorizedService: AuthorizedService) { }


  ngOnInit(): void {

      const id = localStorage.getItem("userId") == null ? "" : localStorage.getItem("userId");

      if(id != null)
      {
        console.log(id);
        this.getUserById(id);
      }
      this.ChangePassword = this.fb.group({
        password:['',[Validators.required,Validators.minLength(6)]],
        newPassword:['',[Validators.required,Validators.minLength(6)]],
        confirmPassword:['', [Validators.required, Validators.minLength(6)]]
      },
      {
          validator: ConfirmedValidator("newPassword", "confirmPassword")
      });

  }

  private getUserById(userId : string)
  {
      this.authorizedService.getUserById(userId).subscribe(data=>
      {
          this.user = data;
          console.log(data);                                                                                                                                                                                                                                                                
      });

  }

  changePassword()
  {
    this.submitted = true;
    if (this.ChangePassword.invalid) {
      console.log("invalid");
        return;
    }

    const user = {
      password : this.ChangePassword.value.password,
      newPassword : this.ChangePassword.value.newPassword
    }

    this.authorizedService.changePassword(user)
    .subscribe(data =>
    {
        if(data == "Password changed successfully")
        {
          console.log("Password changed successfully");
        }
        else if( data == "Old password is incorrect")
        {
          console.log("Old password is incorrect")
        }
    });


  }



}
