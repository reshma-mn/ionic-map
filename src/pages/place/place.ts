import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../services/api.service';
import { Geolocation, GeolocationOptions, Geoposition,PositionError  } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  markers:any;
  public selectedItem;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation,public apiService:ApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
    this.selectedItem=this.navParams.data;
    console.log(this.selectedItem);
    this.placeChoose(this.selectedItem);
  }

  placeChoose(item:any){

      this.geolocation.getCurrentPosition().then((position) => {
                
      let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      
      let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
      this.createMarker(item)
      }, (err) => {
      console.log(err);
      });

  }
 
      
    
  
  
  createMarker(place){ 
      
   let latlng = new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng);
     
  var markers = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position:latlng
            });
      }

}
