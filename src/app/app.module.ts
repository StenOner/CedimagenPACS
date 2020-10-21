import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
    TranslateUserStatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
