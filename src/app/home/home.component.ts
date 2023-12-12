import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ShortUniqueId from 'short-unique-id';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}
  onShareClick() {
    const { randomUUID } = new ShortUniqueId({ length: 5 });
    this.router.navigateByUrl(`${randomUUID()}`);
  }
}
