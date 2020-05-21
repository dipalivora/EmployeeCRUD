import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { ServicesModule } from './services/services.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    DataTablesModule,
    ReactiveFormsModule
    
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
