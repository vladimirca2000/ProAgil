import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { NgxFontAwesomeModule } from 'ngx-font-awesome';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EventoService } from './_services/evento.service';

import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [	
    AppComponent,
      EventosComponent,
      NavComponent,
      DateTimeFormatPipePipe
   ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [
    EventoService,
    BsDropdownConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
