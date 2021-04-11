class Card {

   constructor(cardString) {
     
    this.suit = cardString.charAt(1);
    this.value = cardString.charAt(0);

   }
 
   getSuit() {
     return this.suit;
   }
 
   getValue() {
     return this.value;
   }
 
   toString() {
     return this.suit + this.value;
   }
 }
 
 module.exports = Card;