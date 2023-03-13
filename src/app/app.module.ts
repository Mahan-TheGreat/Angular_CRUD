import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';

import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    FileUploadModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    ProductService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
