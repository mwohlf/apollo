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
import {initProperties, PropertiesProvider} from './config/properties.provider';
import {initIcons, IconsProvider} from './config/icons.provider';
import {SidenavComponent} from './sidenav/sidenav.component';
import {ThemePickerComponent} from './widget/theme-picker/theme-picker.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { AuthEffects } from './store/effects/auth.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {ThemeEffects} from './store/effects/theme.effects';
import {ToastEffects} from './store/effects/toast.effect';
import {ToastComponent} from './widget/toast/toast.component';


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
        // StoreModule.forRoot(),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            AuthEffects,
            ThemeEffects,
            ToastEffects
        ]),
    ],
    providers: [
        IconsProvider,
        KeycloakService,
        PropertiesProvider,

        { provide: APP_INITIALIZER, useFactory: initProperties, deps: [PropertiesProvider], multi: true },
        { provide: APP_INITIALIZER, useFactory: initIcons, deps: [IconsProvider], multi: true },
        { provide: BASE_PATH, useValue: PropertiesProvider.BASE_PATH }
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    entryComponents: [ToastComponent], // needed for the factory
    bootstrap: [AppComponent]
})
export class AppModule { }


// see: https://www.intertech.com/Blog/ngrx-tutorial-actions-reducers-and-effects/
