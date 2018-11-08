import { RouterModule, Routes } from '@angular/router';
import {TriangleTypeComponent} from "./triangleType/triangle-type.component";

const routes: Routes = [
 { path: 'findTriangleType', component: TriangleTypeComponent },
  {path : '', component : TriangleTypeComponent}
];

export const routing = RouterModule.forRoot(routes);
