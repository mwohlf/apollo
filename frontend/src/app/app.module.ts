import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatSelectModule
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
import { SidenavComponent } from './sidenav/sidenav.component';
import { ThemePickerComponent } from './widget/theme-select/theme-picker.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        Page1Component,
        Page2Component,
        Page3Component,
        LoginComponent,
        SidenavComponent,
        ThemePickerComponent,
    ],
    imports: [
        ApiModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatInputModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatDialogModule,
        MatSidenavModule,
        MatNativeDateModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        FlexLayoutModule,
    ],
    providers: [
        KeycloakService,
        PropertiesProvider,
        IconsProvider,

        { provide: APP_INITIALIZER, useFactory: initProperties, deps: [PropertiesProvider], multi: true },
        { provide: APP_INITIALIZER, useFactory: initIcons, deps: [IconsProvider], multi: true },
        { provide: BASE_PATH, useValue: PropertiesProvider.BASE_PATH }
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
