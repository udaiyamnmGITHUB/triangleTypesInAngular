import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { TriangleTypeService } from "src/app/service/triangle-type.service";
import { TriangleModel } from "src/app/model/triangle.model";
import { errorMessages, info, typesOfTriangle } from "../application-constants/triangle-type-messages";


describe('TriangleTypeService', () => {
  let injector: TestBed;
  let service: TriangleTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
       imports: [
        
      ],
      providers: [
        TriangleTypeService
      ]
    });
    injector = getTestBed();
    service = injector.get(TriangleTypeService);
  });

  function createTriangleObj(sideOne, sideTwo, sideThree){
    let traingleObj = new TriangleModel();
    traingleObj.sideOne = sideOne;
    traingleObj.sideTwo = sideTwo;
    traingleObj.sideThree = sideThree;
    traingleObj.type = '';

    return traingleObj
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTriangleType method should return  responseModelObj and call the createResponseObj with the type', function () {
    let traingleObj = createTriangleObj(10, 10, 10);
    spyOn(service, 'createResponseObj');
    service.getTriangleType(traingleObj);
    expect(service.createResponseObj).toHaveBeenCalledWith(true, info.typeFound, typesOfTriangle.equilateral);
    
    traingleObj = createTriangleObj(0, 10, 10);
    service.getTriangleType(traingleObj);
    expect(service.createResponseObj).toHaveBeenCalledWith(false, errorMessages.invalidParamMessage, '');
  });

  it('createResponseObj method should return  responseModelObj and cook the responseModelObj', function () {
    let respObj = service.createResponseObj(true, info.typeFound, typesOfTriangle.equilateral);
    expect(respObj.isValid).toBeTruthy();
    expect(respObj.displayMessage).toEqual( info.typeFound + "'" + typesOfTriangle.equilateral + "'")
  });

  it('calculateTypeOfTriangle method should return type as equilateral when triangles have equal sides', function () {
    let traingleObj = createTriangleObj(10, 10, 10);
    expect(service.calculateTypeOfTriangle(traingleObj)).toEqual(typesOfTriangle.equilateral);
  });

  it('calculateTypeOfTriangle method should return type as isosceles when triangle only two sides are equal', function () {
    let traingleObj = createTriangleObj(10, 10, 20);
    expect(service.calculateTypeOfTriangle(traingleObj)).toEqual(typesOfTriangle.isosceles);
  });

  it('calculateTypeOfTriangle method should return type as scalene when triangle 3 sides are different ', function () {
    let traingleObj = createTriangleObj(10, 20, 30);
    expect(service.calculateTypeOfTriangle(traingleObj)).toEqual(typesOfTriangle.scalene);
  });

  it('calculateTypeOfTriangle method should return type as empty string when triangle side length are not proper', function () {
    let traingleObj = createTriangleObj(0, 20, 30);
    expect(service.calculateTypeOfTriangle(traingleObj)).toEqual('');
  });
});
