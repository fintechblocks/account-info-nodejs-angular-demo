import { ShowJsonDataDialog } from './home/home.component';
import { ApiModule } from './http/api.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatCheckboxModule, MatButtonModule, MatCardModule, MatPaginatorModule, MatInputModule, MatDialogModule, MatDatepickerModule, DateAdapter, MatNativeDateModule, NativeDateAdapter } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        ApiModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,        
        FormsModule,
        routing,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ShowJsonDataDialog
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        { provide: DateAdapter, useClass: NativeDateAdapter },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    entryComponents: [
        ShowJsonDataDialog
      ],
    bootstrap: [AppComponent]
})

export class AppModule { }