import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main-component/main.component';
import { _404Component } from './components/404-component/_404.component';
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '',     component: MainComponent },
    { path: '**',   component: _404Component }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
