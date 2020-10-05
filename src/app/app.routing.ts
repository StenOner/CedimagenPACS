import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
const appRoutes:Routes=[
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'**',component:ErrorComponent}
];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);