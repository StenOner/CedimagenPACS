import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from "angular-datatables";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthComponent } from './components/auth/auth.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { GetUserComponent } from './components/get-user/get-user.component';
import { GetUsersComponent } from './components/get-users/get-users.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateEmailComponent } from './components/update-email/update-email.component';
import { TranslateUserStatePipe } from './pipes/translate-user-state.pipe';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { NewTestComponent } from './components/new-test/new-test.component';
import { GetTestComponent } from './components/get-test/get-test.component';
import { GetTestsAdminComponent } from './components/get-tests-admin/get-tests-admin.component';
import { UpdateTestComponent } from './components/update-test/update-test.component';
import { NewUserAdminComponent } from './components/new-user-admin/new-user-admin.component';
import { GetMyTestsComponent } from './components/get-my-tests/get-my-tests.component';
import { GetMyTestComponent } from './components/get-my-test/get-my-test.component';
import { UpdateMyTestComponent } from './components/update-my-test/update-my-test.component';
import { ReviewTestComponent } from './components/review-test/review-test.component';
import { GetTestsDoctorComponent } from './components/get-tests-doctor/get-tests-doctor.component';
import { DownloadComponent } from './components/download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    AuthComponent,
    NewUserComponent,
    GetUserComponent,
    GetUsersComponent,
    UpdatePasswordComponent,
    UpdateUserComponent,
    ProfileComponent,
    UpdateEmailComponent,
    TranslateUserStatePipe,
    DeleteUserComponent,
    NewTestComponent,
    GetTestComponent,
    GetTestsAdminComponent,
    UpdateTestComponent,
    NewUserAdminComponent,
    GetMyTestsComponent,
    GetMyTestComponent,
    UpdateMyTestComponent,
    ReviewTestComponent,
    GetTestsDoctorComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
