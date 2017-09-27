import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {
  person: string;
  text: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl : ViewController) {
  }

  //Even though this is a modal not a page, these ionic life cycle hooks execute, coz ionic treats this as a page while displaying.
  ionViewDidLoad(){
    this.person = this.navParams.get('person');
    this.text = this.navParams.get('text');
  }

  onClose(remove = false){
    // pass data to beneath page
    this.viewCtrl.dismiss(remove);
  }

}
