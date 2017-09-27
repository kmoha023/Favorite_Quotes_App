import { Quote } from "../data/quote.interface";

export class QuotesService {
    // varName: type = []; empty array
    private favoriteQuotes: Quote[] = [];

    addQuoteToFavorites(quote: Quote){
        this.favoriteQuotes.push(quote);
        console.log(this.favoriteQuotes);
    }

    //Method to remove selected quote from the favorites
    removeQuoteFromFavorites(quote: Quote){
        //Finding the position of the selected element on the favoriteQuotes array[]
        let position = this.favoriteQuotes.findIndex((quoteEl: Quote)=>{
            return quoteEl.id == quote.id; // return the index of the element array where predicate is true, and -1 otherwise 
        });
        //Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
        //Remove element at position index, delete count 1
        this.favoriteQuotes.splice(position, 1);
    }

    getFavoriteQuotes() {
        //Copy  of the array
       return this.favoriteQuotes.slice()
    }
}