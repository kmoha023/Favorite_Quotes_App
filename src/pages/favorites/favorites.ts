import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { QuotesService } from "../../services/quotes.service";
import { Quote } from "../../data/quote.interface";
import { QuotePage } from "../quote/quote";

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  favQuotesList: Quote[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private quotesService: QuotesService, private modalCtrl: ModalController) {
  }

  ionViewWillEnter(){
  this.favQuotesList =  this.quotesService.getFavoriteQuotes();
  }

  onModalView(quote: Quote){
    let modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    //Modal is actually a view, so all the methods for a view can be used for modal, e.g dismiss()
    //If want to pass data through ViewController use onDidDismiss(), if only wants to check if view was closed didLeave().
    //Since ViewController hooks can be used not only on modals but components and pages, where the scenario(passing the data) could be different
    modal.onDidDismiss((remove: boolean) => {
      if(remove){
      this.unFavorite(quote);
      }
    });
//**Dont use didLeave since using onDidDismiss
  //   modal.didLeave.subscribe((remove: boolean) => 
  //   console.log(remove)
  // );
    /* View controller hooks 
    * willEnter -> Observable - fired when component is about to become active
    * didEnter -> Obs - fired when component has become active
    * willLeave -> obs - fired when component is about to become inactive
    * didLeave -> obs -fired when component has become inactive
    * willUnload - obs - when comp as been destroyed
    * onWillDismiss - (callBack) Called when current ViewController will be dismissed
    * onDidDismiss -(callBack) Called when current ViewController was dismissed
    */
  }

  unFavorite(quote){
    this.quotesService.removeQuoteFromFavorites(quote);
    //This is just to get full quotes again, an alternate would be
    // this.quotesService.getFavoriteQuotes();
    const position = this.favQuotesList.findIndex((quoteEl: Quote)=> {
      return quoteEl.id == quote.id;
    });
    this.favQuotesList.splice(position, 1);
  }
}
