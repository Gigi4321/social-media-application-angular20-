import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
 private readonly authService = inject(AuthService);
private readonly fb = inject(FormBuilder);

  form: FormGroup;

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }


  isPasswordMismatch(): boolean {
    const newPass = this.form.get('newPassword')?.value;
    const confirm = this.form.get('confirmPassword')?.value;

    return confirm && newPass !== confirm;
  }

 constructor() {
  this.form = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    ]],
    confirmPassword: ['', Validators.required]
  });
}

onSubmit() {
  if (this.form.invalid || this.isPasswordMismatch()) return;

  const body = {
    password: this.form.value.currentPassword,
    newPassword: this.form.value.newPassword
  };

  this.authService.changePassword(body).subscribe({
    next:(res:any) => {
      console.log(res);

      if (res.token) {
        localStorage.setItem('token', res.token);
      }

      alert('Password updated successfully ✅');
      this.form.reset();
    },

    error: (err:any) => {
      console.log(err);

      if (err.error?.message) {
        alert(err.error.message);
      } else {
        alert('Something went wrong ❌');
      }
    }
  });
}

}
