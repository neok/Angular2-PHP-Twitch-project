import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
<a [routerLink]="['/main']">Main</a>
<router-outlet></router-outlet>
`,
})

export class AppComponent  {

}
