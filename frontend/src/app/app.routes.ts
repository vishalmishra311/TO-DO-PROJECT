import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomePgeComponent } from './home-pge/home-pge.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { SeeTaskComponent } from './see-task/see-task.component';

export const routes: Routes = [
     { path: '', component: HomePgeComponent },   // default
  { path: 'add-task', component: AddTaskComponent },
    { path: 'see-task', component: SeeTaskComponent },
  { path: 'edit-task/:id', component: AddTaskComponent },

 
    
];
