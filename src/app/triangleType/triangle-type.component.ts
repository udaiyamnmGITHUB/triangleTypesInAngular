import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { TriangleModel } from "../model/triangle.model";
import { TriangleTypeService } from "../service/triangle-type.service";
import { ResponseModel } from "../model/response.model";
import { instructions } from "../application-constants/triangle-type-messages";

@Component({
  selector: 'app-triangle-type',
  templateUrl: './triangle-type.component.html',
  styleUrls: ['./triangle-type.component.css']
})
export class TriangleTypeComponent implements OnInit {
  

  constructor(private formBuilder: FormBuilder,  private triangleTypeService: TriangleTypeService) { }

  triangleForm: FormGroup;
  triangle: TriangleModel;
  triangleTypeResponseObj:ResponseModel = new ResponseModel();
  reg = new RegExp('^[0-9]{10}$');
  
  /**
   * ngOnInit() - Method to initialize the component when it is rendered
   * @param triangleObj
   */
  ngOnInit() {
    this.resetTriangleTypeResponseObj();
    this.triangleForm = this.formBuilder.group({
      triangle: this.formBuilder.group({
        sideOne: ['', Validators.pattern(this.reg)],
        sideTwo: ['', Validators.pattern(this.reg)],
        sideThree: ['', Validators.pattern(this.reg)]
      })
    });
    this.onChanges();
  }

  /**
   * onChanges() - Method to add the listeners when form is changed   
  */
  onChanges(): void {
    this.triangleForm.valueChanges.subscribe(val => {
      this.resetTriangleTypeResponseObj();
    });
  }

  /**
   * resetTriangleTypeResponseObj() - Method to reset the  triangleTypeResponseObj
  */
  resetTriangleTypeResponseObj(){
    this.triangleTypeResponseObj.isValid = false;
    this.triangleTypeResponseObj.displayMessage = instructions.displayMessage;
  }

  /**
   * findTriangleType() - Method is triggred when user click on the submit button to find the type
  */
  findTriangleType() {
   if(this.triangleForm.value){
      this.triangle = this.triangleForm.value.triangle;
      this.triangleTypeResponseObj = this.triangleTypeService.getTriangleType(this.triangle);
    }
    
  }

}
