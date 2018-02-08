import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { Geolocation, GeolocationOptions, Geoposition,PositionError  } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-location-select',
  templateUrl: 'location-select.html',
})
export class LocationSelectPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers:any;

  public currentLocation;
  public options : GeolocationOptions;
  public  currentPos : Geoposition;
  public selectedplace:any[];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation,public apiService:ApiService) {
  }

  ionViewDidLoad() {
              this.selectedplace=this.navParams.data;
      this.nearbyPlace(this.selectedplace);
              }
  


loadMap(){

this.geolocation.getCurrentPosition().then((position) => {

let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

let mapOptions = {
center: latLng,
zoom: 15,
mapTypeId: google.maps.MapTypeId.ROADMAP
}
this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

}, (err) => {
console.log(err);
});
}

nearbyPlace(results){
this.loadMap();
this.markers = [];

            this.callback(results);
  
}

callback(results) {
  for (var i = 0; i < results.length; i++) {
    this.createMarker(results[i]);
  }
}

createMarker(place){
    console.log(place)
    console.log(place.geometry.location.lat)
    var positionn = new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng);
var markers = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: positionn,
    
          });

  }

}
