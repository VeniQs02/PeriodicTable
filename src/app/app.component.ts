import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ElementDisplayComponent} from "./element-display/element-display.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ElementDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PeriodicTable';
}
