import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';
import { NgxMaskModule } from 'ngx-mask'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { EventoService } from './_services/evento.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TituloComponent } from './_shared/titulo/titulo.component';
import { EventosComponent } from './eventos/eventos.component';
import { EventoEditComponent } from './eventos/eventoEdit/eventoEdit.component';
import { PalestrantesComponent } from './palestrantes/palestrantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContatosComponent } from './contatos/contatos.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';

import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [						
    AppComponent,
    NavComponent,
    TituloComponent,
    EventosComponent,
    EventoEditComponent,
    PalestrantesComponent,
    DashboardComponent,
    ContatosComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    DateTimeFormatPipePipe
   ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [
    EventoService,
    BsDropdownConfig,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
   }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
