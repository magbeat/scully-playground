import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PrefetchedComponent} from './prefetched/prefetched.component';
import {EagerComponent} from './eager/eager.component';


const routes: Routes = [
  {path: '', redirectTo: '/prefetched', pathMatch: 'full'},
  {path: 'prefetched', component: PrefetchedComponent},
  {path: 'eager', component: EagerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
