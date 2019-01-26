import {ApiModule, BASE_PATH} from '../generated';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {AuthEffects} from './store/effects/auth.effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ConfigEffects} from './store/effects/config.effects';
import {EffectsModule} from '@ngrx/effects';
import {environment} from '../environments/environment';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FooterComponent} from './footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {IconsProvider, initIcons} from './config/icons.provider';
import {KeycloakService} from './services/keycloak.service';
import {LoginComponent} from './pages/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
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
import {Page1Component} from './pages/page1/page1.component';
import {Page2Component} from './pages/page2/page2.component';
import {Page3Component} from './pages/page3/page3.component';
import {reducers} from './store/reducers';
import {RegisterComponent} from './pages/register/register.component';
import {SidenavComponent} from './sidenav/sidenav.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {ThemeEffects} from './store/effects/theme.effects';
import {ThemePickerComponent} from './widget/theme-picker/theme-picker.component';
import {ToastComponent} from './widget/toast/toast.component';
import {ToastContainerComponent} from './widget/toast/toast-container.component';
import {ToastEffects} from './store/effects/toast.effect';
import {CustomRouteSerializer} from './store/state/custom-route-serializer';

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
        RegisterComponent,
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
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            serializer: CustomRouteSerializer,
        }),
        EffectsModule.forRoot([
            AuthEffects,
            ConfigEffects,
            ThemeEffects,
            ToastEffects,
        ]),
        !environment.production
            ? StoreDevtoolsModule.instrument({
                maxAge: 25, // Retains last 25 states
                logOnly: environment.production, }) // Restrict extension to log-only mode
            : [],
    ],
    providers: [
        IconsProvider,
        KeycloakService,
        { provide: APP_INITIALIZER, useFactory: initIcons, deps: [IconsProvider], multi: true },
        { provide: BASE_PATH, useValue: ' ' },
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    entryComponents: [ToastContainerComponent], // needed for the factory
    bootstrap: [AppComponent]
})

export class AppModule { }
