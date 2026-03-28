import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private readonly userService=inject(UserService)
  loading: boolean = false;
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  msgError: string = '';
  private readonly fb =inject(FormBuilder)

  loginForm:FormGroup= this.fb.group({
    email:["",[Validators.email,Validators.required]],
    password:["",[Validators.required]]
  })





  submitForm() {
    if (this.loginForm.valid) {
      this.loading = true;


      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            console.log(res)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('user',JSON.stringify(res.data.user))

            // this.userService.SetCurrentUser(res.data.token)
      
            this.router.navigate(['/feed'])          
          }
        },
        error: err => {
          this.msgError = err.error.message;
        },
        complete: () => {
          this.loading = false;
        }
      })

    }
    else {
      this.loginForm.markAllAsTouched();
    }

  }




}
