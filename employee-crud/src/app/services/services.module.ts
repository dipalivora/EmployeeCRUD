import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { CoreHttpService } from './core-http.service';
import { LoaderService } from './loader.service';

@NgModule({
  imports: [

   
  ],
  declarations: [
  
  ],
  providers: [CoreHttpService, LoaderService]
})
export class ServicesModule {
}
