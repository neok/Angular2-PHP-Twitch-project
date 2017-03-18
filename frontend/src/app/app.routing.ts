import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import  { MainComponent } from './components/main-component/main.component';

const routes: Routes = [
    { path: 'main', component: MainComponent }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
