import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeaheadComponent} from './typeahead.component';



@NgModule({
  declarations: [TypeaheadComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TypeaheadComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TypeaheadModule { }
