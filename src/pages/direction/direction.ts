import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { LocationSelectPage } from '../location-select/location-select';
import { ApiService } from '../../services/api.service'
import { TEMPLATE_DRIVEN_DIRECTIVES } from '@angular/forms/src/directives';
import { PlacePage } from '../place/place';

declare var google;

@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {

  constructor(private api: ApiService, private geolocation : Geolocation,public navCtrl: NavController) { }

  places: any;
  item:any;
  
  ionViewDidLoad(){
    
  }

  showMap(){
    this.navCtrl.push(LocationSelectPage,this.places);
  }

  showPlace(place){
    this.navCtrl.push(PlacePage,place);
  }
  
  placess(type){
    console.log(type)
    this.api.getPlacess(type).subscribe(res=>{
    this.places = res.results; 
    console.log(res) 
    console.log(this.places);
    }) 
  }

  
}
