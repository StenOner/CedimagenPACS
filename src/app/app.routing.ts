import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Environment } from './environment/environment';
import { AuthorizeGuardService as AuthGuard } from './services/authorize-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';

import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { GeneratePasswordComponent } from './components/generate-password/generate-password.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { GetUserComponent } from './components/get-user/get-user.component';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewTestComponent } from './components/new-test/new-test.component';
import { GetTestComponent } from './components/get-test/get-test.component';
import { UpdateMyTestComponent } from './components/update-my-test/update-my-test.component';
import { UpdateTestComponent } from './components/update-test/update-test.component';
import { NewUserAdminComponent } from './components/new-user-admin/new-user-admin.component';
import { GetMyTestComponent } from './components/get-my-test/get-my-test.component';
import { GetMyTestsComponent } from './components/get-my-tests/get-my-tests.component';
import { GetTestsAdminComponent } from './components/get-tests-admin/get-tests-admin.component';
import { GetTestsDoctorComponent } from './components/get-tests-doctor/get-tests-doctor.component';
import { ReviewTestComponent } from './components/review-test/review-test.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'hogar', redirectTo: '/' },
    //{ path: 'registro', component: NewUserComponent },
    { path: 'inicio-sesion', component: AuthComponent },
    { path: 'resetear-clave', component: ResetPasswordComponent },
    { path: 'generar-clave/:id', component: GeneratePasswordComponent },
    { path: 'nuevo-usuario', component: NewUserAdminComponent, canActivate: [RoleGuard], data: { expectedRole: Environment.admin } },
    { path: 'usuario/:id', component: GetUserComponent, canActivate: [RoleGuard], data: { expectedRole: Environment.admin } },
    { path: 'usuarios', component: GetUsersComponent, canActivate: [RoleGuard], data: { expectedRole: Environment.admin } },
    { path: 'actualizar-usuario/:id', component: UpdateUserComponent, canActivate: [RoleGuard], data: { expectedRole: Environment.admin } },
    { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'actualizar-correo', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'actualizar-clave', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'borrar-cuenta', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'nuevo-examen', component: NewTestComponent, canActivate: [AuthGuard] },
    { path: 'mi-examen/:id', component: GetMyTestComponent, canActivate: [AuthGuard] },
    { path: 'mis-examenes', component: GetMyTestsComponent, canActivate: [AuthGuard] },
    { path: 'actualizar-mi-examen/:id', component: UpdateMyTestComponent, canActivate: [AuthGuard] },
    { path: 'doctor-examenes', component: GetTestsDoctorComponent, canActivate: [RoleGuard], data: { expectedRole: Environment.doctor } },
    { path: 'revisar-examen/:id', component:ReviewTestComponent, canActivate: [RoleGuard], data: { expectedRole: Environment.doctor } },
    { path: 'examen/:id', component: GetTestComponent, canActivate: [RoleGuard], data: { expectedRole: Environment.admin } },
    { path: 'examenes', component: GetTestsAdminComponent, canActivate: [RoleGuard], data: { expectedRole: Environment.admin } },
    { path: 'actualizar-examen/:id', component: UpdateTestComponent, canActivate: [RoleGuard], data: { expectedRole: Environment.admin } },
    { path: '**', component: ErrorComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });