import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuardService as AuthGuard } from './services/authorize-guard.service';

import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';

const appRoutes:Routes=[
    {path:'', component:HomeComponent, canActivate:[AuthGuard]},
    {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
    {path:'login', component:AuthComponent},
    {path:'**',component:ErrorComponent}
];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);