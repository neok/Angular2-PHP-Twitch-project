import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './components/main-component/main.component';
import { routing } from './app.routing';
import { AppComponent } from './app.component';


@NgModule({
  imports:      [ BrowserModule, routing ],
  declarations: [ MainComponent, AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
