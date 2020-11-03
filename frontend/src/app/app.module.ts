import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatTableModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home';
import { ShowJsonDataDialog } from './home/home.component';
import { ApiModule } from './http/api.module';
import { AuthorizationService } from './http/api/authorization.service';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter'


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
        MatProgressSpinnerModule,    
        FormsModule,
        routing,
        MatMomentDateModule
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
        AuthorizationService,
        UserService,
        { provide: DateAdapter, useClass: MomentDateAdapter },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    entryComponents: [
        ShowJsonDataDialog
      ],
    bootstrap: [AppComponent]
})

export class AppModule { }