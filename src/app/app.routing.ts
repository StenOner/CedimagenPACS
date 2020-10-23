import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizeGuardService as AuthGuard } from './services/authorize-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';

import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { GetUserComponent } from './components/get-user/get-user.component';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ProfileComponent } from './components/profile/profile.component';

import { Environment } from './environment/environment';

const appRoutes:Routes=[
    {path:'', component:HomeComponent, canActivate:[AuthGuard]},
    {path:'hogar', redirectTo:'/', canActivate:[AuthGuard]},
    {path:'registro', component:NewUserComponent},
    {path:'inicio-sesion', component:AuthComponent},
    {path:'usuario/:id', component:GetUserComponent, canActivate:[RoleGuard], data:{expectedRole:Environment.admin}},
    {path:'usuarios', component:GetUsersComponent, canActivate:[RoleGuard], data:{expectedRole:Environment.admin}},
    {path:'actualizar-usuario/:id', component:UpdateUserComponent, canActivate:[RoleGuard], data:{expectedRole:Environment.admin}},
    {path:'perfil', component:ProfileComponent, canActivate:[AuthGuard]},
    {path:'actualizar-correo', component:ProfileComponent, canActivate:[AuthGuard]},
    {path:'actualizar-clave', component:ProfileComponent, canActivate:[AuthGuard]},
    {path:'borrar-cuenta', component:ProfileComponent, canActivate:[AuthGuard]},
    {path:'**', component:ErrorComponent}
];

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);