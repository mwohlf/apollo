import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// Main
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {Page1Component} from './pages/page1/page1.component';
import {Page2Component} from './pages/page2/page2.component';
import {Page3Component} from './pages/page3/page3.component';
import {KeycloakService} from './services/keycloak.service';
import {LoginComponent} from './pages/login/login.component';
import {FlexLayoutModule} from '@angular/flex-layout';

import {ApiModule, BASE_PATH} from '../generated';
import {IconsProvider, initIcons} from './config/icons.provider';
import {SidenavComponent} from './sidenav/sidenav.component';
import {ThemePickerComponent} from './widget/theme-picker/theme-picker.component';
import {Store, StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {AuthEffects} from './store/effects/auth.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {ThemeEffects} from './store/effects/theme.effects';
import {ToastEffects} from './store/effects/toast.effect';
import {ToastComponent} from './widget/toast/toast.component';
import {ToastContainerComponent} from './widget/toast/toast-container.component';
import {ConfigEffects} from './store/effects/config.effects';
import * as fromConfig from './store/reducers/config.reducer';
import {ConfigLoadAction} from './store/actions/config.actions';
import {State} from './store/reducers/config.reducer';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {DismissToastAction} from './store/actions/toast.actions';
import * as fromToast from './store/reducers/toast.reducer';
import {StoreRouterConnectingModule} from '@ngrx/router-store';


@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        LoginComponent,
        Page1Component,
        Page2Component,
        Page3Component,
        SidenavComponent,
        ThemePickerComponent,
        ToastComponent,
        ToastContainerComponent,
    ],
    imports: [
        ApiModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatInputModule,
        MatMenuModule,
        MatNativeDateModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        ReactiveFormsModule,
        // !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreModule.forRoot(
            reducers // contains router reducer
        ),
        // Connects RouterModule with StoreModule
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot([
            AuthEffects,
            ConfigEffects,
            ThemeEffects,
            ToastEffects
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
    ],
    providers: [
        IconsProvider,
        KeycloakService,

        { provide: APP_INITIALIZER, useFactory: initIcons, deps: [IconsProvider], multi: true },
        { provide: BASE_PATH, useValue: ' ' }
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    entryComponents: [ToastContainerComponent], // needed for the factory
    bootstrap: [AppComponent]
})
export class AppModule { }


// see: https://www.intertech.com/Blog/ngrx-tutorial-actions-reducers-and-effects/


// TODO: this is not working
export function initApplication(store: Store<fromConfig.State>): Function {
    return () => new Promise(resolve => {
        store.dispatch(new ConfigLoadAction());
        resolve(true);
    });
}

/*

                filter(users =>  users !== null && users !== undefined && users.length > 0),
                take(1)
            ).subscribe((users) => {
            store.dispatch(new FinishAppInitializer());

 */
