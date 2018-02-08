import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition,PositionError  } from '@ionic-native/geolocation';
import { DirectionPage } from '../direction/direction';

import { ApiService } from '../../services/api.service';
import { locDetail } from '../../services/searchLocationDetail';
import { LocationSelectPage } from '../location-select/location-select';
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html',

})
export class HomePage {


  public currentLocation;
  /**userposition */
  options : GeolocationOptions;
  currentPos :locDetail;

  public searchLocTerm:string;
  public searchLocationDetail:Geoposition;
  

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  places: Array<any> ;
  placelist: Array<any> ;

  constructor(public navCtrl: NavController,public navParams: NavParams,
     public geolocation: Geolocation,private apiService: ApiService) {
 
  }

  ionViewDidLoad(){
    console.log( 'ionViewDidLoad HomePage' )
    this.loadMap();  
    }

  listPlace() {
    this.navCtrl.push(DirectionPage);
    }

  loadMap(){
 
          this.geolocation.getCurrentPosition().then((position) => {
          this.apiService.latlng = position.coords.latitude+','+position.coords.longitude;
          let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
          this.addMarker();
          }
        );
 
  }

  addMarker(postn?:any){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position:  this.map.getCenter(),
    });
  }
}