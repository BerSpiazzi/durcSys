import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'durcsys-app';

  getColor(message: any) {
    if (message.icon === 'pi pi-info') {
      return "bg-primary";
    }
    if (message.icon === 'pi pi-check') {
      return "bg-green-300";
    }
    if (message.icon === 'pi pi-comments') {
      return "bg-cyan-300";
    }
    if (message.icon === 'pi pi-times') {
      return "bg-red-300";
    }
    if (message.icon === 'pi pi-exclamation-triangle') {
      return "bg-orange-300";
    }
    return "bg-primary";
  }
}
