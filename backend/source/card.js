class Card {

   constructor(cardString) {
     
    this.suit = cardString.charAt(1);
    this.rank = cardString.charAt(0);

   }
 
   getSuit() {
     return this.suit;
   }
 
   getRank() {
     return this.rank;
   }
 
   toString() {
     return this.suit + this.rank;
   }
 }
 
 module.exports = Card;