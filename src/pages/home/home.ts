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
  // tab0Root: any =  HomePage;
  // tab1Root: any =  LocationSelectPage;
  // tab2Root: any =DirectionPage;

  public currentLocation;
  /**userposition */
  options : GeolocationOptions;
  currentPos :locDetail;


  search: boolean = false;
  toggled: boolean;
  searchTerm: String = '';
  items: string[];

 
  
  


  public searchLocTerm:string;
  public searchLocationDetail:Geoposition;
  

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  places: Array<any> ;
  placelist: Array<any> ;

  constructor(public navCtrl: NavController,public navParams: NavParams,
     public geolocation: Geolocation,private apiService: ApiService) {
    this.toggled = false;
     
 
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
    }, (err) => {
      console.log(err);
    });
 
  }

  addMarker(postn?:any){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position:  this.map.getCenter(),
    });
  }


  // getUserPosition(){
  //   console.log("hello")
  //   this.options = {
  //   enableHighAccuracy : false
  //   };
  //   this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
  //     console.log(pos.coords.latitude);
  //     // this.currentPos = (pos.coords.latitude,pos.coords.longitude) ;   

  //       console.log(pos);
  //       this.apiService.addMarker(this.currentPos);

  //   },(err : PositionError)=>{
  //       console.log("error : " + err.message);
  //   ;
  //   })
  // }

  


  // addInfoWindow(marker, content){
 
  //   let infoWindow = new google.maps.InfoWindow({
  //     content: content
  //   });
   
  //   google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //   });
   
  // }
}