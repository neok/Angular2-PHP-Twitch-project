import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './components/main-component/main.component';
import { NavbarComponent } from './components/navbar-component/navbar.component';
import { _404Component } from './components/404-component/_404.component';
import { routing } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, routing ],
  declarations: [ MainComponent, AppComponent, _404Component, NavbarComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
