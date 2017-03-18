import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Twitch php example project by  {{name}}</h1>`,
})
export class AppComponent  { name = 'Peter Popelyshko'; }
