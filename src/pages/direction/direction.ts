import { Component, NgZone, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import { LocationSelectPage } from '../location-select/location-select';
import { ApiService } from '../../services/api.service'

declare var google;

@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {

  
 
  
 
  constructor(private api: ApiService, private geolocation : Geolocation,public navCtrl: NavController) { }

  places: any;
  

  ionViewDidLoad(){
    
    
  }

  showMap(){
    this.navCtrl.push(LocationSelectPage,this.places);
  }
  
  placess(type){
    console.log(type);
    this.api.getPlacess(type).subscribe(res=>{
      // console.log(res);
      this.places = res.results;
      // console.log(this.places)
    })
  
  }
 
 

}
