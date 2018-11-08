import { Injectable } from '@angular/core';
import { TriangleModel } from "../model/triangle.model";
import { ResponseModel } from "../model/response.model";
import { errorMessages, info, typesOfTriangle } from "../application-constants/triangle-type-messages";



@Injectable()
export class TriangleTypeService {
  constructor() { }

   /**
   * getTriangleType() - Method to get the type of triangle and return the ResponseModel object 
   * @param triangleObj
   */
  getTriangleType(triangleObj: TriangleModel): ResponseModel {
    let typeOfTraingle = this.calculateTypeOfTriangle(triangleObj);
    
    if(!typeOfTraingle){
      return this.createResponseObj(false, errorMessages.invalidParamMessage, "");
    }
    return this.createResponseObj(true, info.typeFound, typeOfTraingle);
  }

   /**
   * calculateTypeOfTriangle() - Method to calculate and return type of triangle 
   * @param triangleObj
   */
  calculateTypeOfTriangle(triangleObj: TriangleModel): string {
    if (triangleObj.sideOne <= 0 || triangleObj.sideTwo <= 0 || triangleObj.sideThree <= 0) {
      return "";
    } else if (triangleObj.sideOne == triangleObj.sideTwo && triangleObj.sideTwo == triangleObj.sideThree) {
      return typesOfTriangle.equilateral;
    } else if (triangleObj.sideOne === triangleObj.sideTwo || triangleObj.sideTwo === triangleObj.sideThree || triangleObj.sideOne === triangleObj.sideThree) {
      return typesOfTriangle.isosceles;
    } else {
      return typesOfTriangle.scalene;
    }
  }

  /**
   * createResponseObj() - Method to build response object to return
   * @param valid
   * @param message
   * @param type
   */
  createResponseObj(valid: boolean, message: string, type: string) {
    let responseModelObj: ResponseModel = new ResponseModel();
    responseModelObj.isValid = valid;
    responseModelObj.displayMessage = message;
    if (valid && type) {
      responseModelObj.displayMessage = message + "'" + type + "'";
    }
    return responseModelObj;
  }
}
