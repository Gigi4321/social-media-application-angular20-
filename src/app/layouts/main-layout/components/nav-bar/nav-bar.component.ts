import { Component, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  private readonly authService =inject(AuthService)
  ngOnInit() {
    initFlowbite();

  }
  logout(){
    this.authService.signOut()
  }
}
