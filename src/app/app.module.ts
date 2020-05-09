import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { MainViewComponent } from './mainpage/main-view/main-view.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './authentication/login/login.component';
import { AuthInterceptor } from './authentication/auth.interceptor';
import { HomepageComponent } from './mainpage/homepage/homepage.component';
import { FamilyViewComponent } from './mainpage/familyView/familyView.component';
import { MenuComponent } from './mainpage/menu/menu.component';
import { SmallheaderComponent } from './mainpage/smallheader/smallheader.component';
import { FamilyCreateComponent } from './mainpage/family-create/family-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MainViewComponent,
    LoginComponent,
    HomepageComponent,
    FamilyViewComponent,
    MenuComponent,
    SmallheaderComponent,
    FamilyCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
