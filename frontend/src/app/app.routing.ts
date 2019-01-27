// Modules 3rd party
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page1Component} from './pages/page1/page1.component';
import {Page2Component} from './pages/page2/page2.component';
import {Page3Component} from './pages/page3/page3.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {AuthGuardService} from './services/auth-guard.service';


// Routing
const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
    { path: 'page1', component: Page1Component },
    { path: 'page2', component: Page2Component },
    { path: 'page3', component: Page3Component },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}
