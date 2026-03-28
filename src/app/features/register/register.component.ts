import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  // Signals
  loading = signal(false);
  msgError = signal('');

  // Form
  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    username: [''],
    email: ['', [Validators.email, Validators.required]],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)]],
    rePassword: ['', Validators.required],
  }, { updateOn: 'submit', validators: [this.confirmPass] });

  submitForm() {
    if (this.registerForm.valid) {
      this.loading.set(true); 
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {

            this.loading.set(false)   
            this.router.navigate(['/login']);
          
          }
        },
        error: (err) => {

          this.msgError.set(err.error.message || 'Something went wrong');
          this.loading.set(false)
          
        },
        complete: () => {
          this.loading.set(false);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPass(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const rePass = group.get('rePassword')?.value;
    if (pass !== rePass && rePass !== '') {
      group.get('rePassword')?.setErrors({ misMatch: true });
      return { misMatch: true };
    } else {
      return null;
    }
  }
}