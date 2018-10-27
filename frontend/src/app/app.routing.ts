// Modules 3rd party
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page1Component} from "./pages/page1/page1.component";
import {Page2Component} from "./pages/page2/page2.component";
import {Page3Component} from "./pages/page3/page3.component";


// Routing
const appRoutes: Routes = [
  { path: '', redirectTo: '/page1', pathMatch: 'full' },
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: 'page3', component: Page3Component },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})


export class AppRoutingModule {}
