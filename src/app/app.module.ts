import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { DirectionPage } from '../pages/direction/direction';

import { ApiService } from '../services/api.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LocationSelectPage } from '../pages/location-select/location-select';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DirectionPage,
 
    LocationSelectPage
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DirectionPage,
   
    LocationSelectPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},  
  ]
})
export class AppModule {}
