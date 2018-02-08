import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ApiService } from '../../services/api.service'
import { PlacePage } from '../place/place';



@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {

  constructor(private api: ApiService,public navCtrl: NavController) { }

  places: any;
  item:any;
  
  ionViewDidLoad(){
    
  }

showMap(type){

this.api.getPlacess(type).subscribe(res=>{
this.places = res.results; 
this.navCtrl.push(PlacePage,this.places);

});


}

showPlace(place){
let p=[place];
this.navCtrl.push(PlacePage,p);
}


placess(type){
this.api.getPlacess(type).subscribe(res=>{
this.places = res.results; 
});
}

}
