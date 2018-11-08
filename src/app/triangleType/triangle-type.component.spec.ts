import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from "@angular/forms";

import { TriangleTypeComponent } from './triangle-type.component';
import { TriangleTypeService } from '../service/triangle-type.service';
import { instructions } from "src/app/application-constants/triangle-type-messages";
import { getTestBed } from "@angular/core/testing";
import { TriangleModel } from "src/app/model/triangle.model";

describe('triangleTypeComponent', () => {
  let component: TriangleTypeComponent;
  let fixture: ComponentFixture<TriangleTypeComponent>;
  let triangleTypeService:TriangleTypeService;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule],
      declarations: [ TriangleTypeComponent ],
      providers:[TriangleTypeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriangleTypeComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    triangleTypeService = injector.get(TriangleTypeService);
    fixture.detectChanges();
  });

   // create reusable function for a dry spec.
  function updateForm(sideOne, sideTwo, sideThree) {
    let triangleObj = component.triangleForm.controls['triangle']['controls'];
    triangleObj.sideOne.setValue(sideOne);
    triangleObj.sideTwo.setValue(sideTwo);
    triangleObj.sideThree.setValue(sideThree);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init should call the resetTriangleTypeResponseObj method and should inititalize the form', () => {
    spyOn(component, 'resetTriangleTypeResponseObj');
    spyOn(component, 'onChanges');
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.resetTriangleTypeResponseObj).toHaveBeenCalled();
    expect(component.triangleForm.value.triangle.sideOne).toEqual('');
    expect(component.triangleForm.value.triangle.sideOne).toEqual('');
    expect(component.triangleForm.value.triangle.sideTwo).toEqual('');
    expect(component.triangleForm.value.triangle.sideThree).toEqual('');
    expect(component.onChanges).toHaveBeenCalled();
  });

  it('changing any of the input in the form should call resetTriangleTypeResponseObj method', () => {
    component.ngOnInit();
    spyOn(component, 'resetTriangleTypeResponseObj');
    expect(component.resetTriangleTypeResponseObj).not.toHaveBeenCalled();
    updateForm(10,20,30);
    expect(component.resetTriangleTypeResponseObj).toHaveBeenCalled();
  });

  it('resetTriangleTypeResponseObj method should reset the triangleTypeResponseObj', () => {
    component.resetTriangleTypeResponseObj();
    expect(component.triangleTypeResponseObj.isValid).toEqual(false);
    expect(component.triangleTypeResponseObj.displayMessage).toEqual(instructions.displayMessage);
  });

  it('onclick of submit button it should call the getTriangleType from triangleTypeService', () => {
    fixture.detectChanges();
    spyOn(triangleTypeService, 'getTriangleType');
    updateForm(10,10,10);
    component.findTriangleType();
    let triangle:any = {};
    triangle.sideOne = 10;
    triangle.sideTwo = 10;
    triangle.sideThree = 10;
    expect(triangleTypeService.getTriangleType).toHaveBeenCalledWith(triangle);
  });

  it('should return valid flag as true when all the sides lengths are valid', () => {
    fixture.detectChanges();
    updateForm(10,10,10);
    component.findTriangleType();
    expect(component.triangleTypeResponseObj.isValid).toBeTruthy();
    updateForm(10,10,33);
    component.findTriangleType();
    expect(component.triangleTypeResponseObj.isValid).toBeTruthy();
    updateForm(10,22,33);
    component.findTriangleType();
    expect(component.triangleTypeResponseObj.isValid).toBeTruthy();
  });

  it('should return valid flag as false when form is updated with the improper values', () => {
    fixture.detectChanges();
    updateForm(0,0,0);
    component.findTriangleType();
    expect(component.triangleTypeResponseObj.isValid).toBeFalsy();
    updateForm(0,0,10);
    component.findTriangleType();
    expect(component.triangleTypeResponseObj.isValid).toBeFalsy();
  });

});
