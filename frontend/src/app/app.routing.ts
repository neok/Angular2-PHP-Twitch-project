import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main-component/main.component';
import { _404Component } from './components/404-component/_404.component';

const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: '**',   component: _404Component }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
