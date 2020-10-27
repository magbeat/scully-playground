import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { PrefetchedComponent } from './prefetched/prefetched.component';
import { EagerComponent } from './eager/eager.component';

@NgModule({
  declarations: [
    AppComponent,
    PrefetchedComponent,
    EagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
