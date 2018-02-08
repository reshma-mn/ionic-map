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
  public selectedItem:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation,public apiService:ApiService) {
      this.selectedItem=this.navParams.data;
      console.log(this.selectedItem.length);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
    
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
      console.log(this.selectedItem.length)
      for (var i = 0; i < this.selectedItem.length; i++) {
        console.log("sree")
        this.createMarker(this.selectedItem[i]);
      }
});
}
 
      
    
  
  
  createMarker(place){ 
      
   let latlng = new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng);
     
   var markers = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position:latlng
            });

            let content = "<p>Pace you are looking !</p>"+ "<b>"+ place.name +"<b>"+"<p>" +place.vicinity+"</p>" 
                    ;          
                    let infoWindow = new google.maps.InfoWindow({
                    content: content
                    });
                
                    google.maps.event.addListener(markers, 'click', () => {
                    infoWindow.open(this.map, markers);
                    });
      }

}
