import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TuiButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
