import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


import {TriangleTypeService} from "./service/triangle-type.service";
import { TriangleTypeComponent } from './triangleType/triangle-type.component';

@NgModule({
  declarations: [
    AppComponent,
    TriangleTypeComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TriangleTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
