import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Quote } from "../../data/quote.interface";
import { QuotesService } from "../../services/quotes.service";


@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
quotesGot: {category: string, quotes: Quote[], icon: string };
  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public alert: AlertController,
               private quotesService: QuotesService
              ){}
  ngOnInit(){
    this.quotesGot = this.navParams.data;
  }

  // ionViewDidLoad(){
  //   this.quotesGot = this.navParams.data;
  // Add Elvis operator(?) in the template to use this approach to prevent breaking the app
  // }

  onFavoriteclick(quoteSelected){
    //console.log(" Added to Favorite "+JSON.stringify(quoteSelected));
    let confirm = this.alert.create({
      title:'Add Quote',
      message: 'Are you sure you want to add the quote ?',
      buttons: [
        {
          text: 'Yes, go ahead !',
          handler: () => {
            this.quotesService.addQuoteToFavorites(quoteSelected);
          }
        },
        {
          text: 'No, I"ve Changed my mind',
          //role will tell angular to run this handler if even clicked anywhere on the screen
          role: 'cancel',
          handler: ()=>{
            console.log('Cancelled!');
          }
        } 
      ]
    });
    confirm.present();
  }
}
