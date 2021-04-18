const Cards = require('./cards');

 class Hands extends Cards {
   constructor() {
     super([]);
   }
 
   add(cards) {
     for (let c of cards) {
       this.cards.push(c);
     }
   }
 
   remove(card) {
     let pos = -1;
     for (let i = 0; i < this.size(); i++) {
       if (card.getRank() == this.cards[i].getRank()
         && card.getSuit() == this.cards[i].getSuit()) {
         pos = i;
         break;
       }
     }
 
     if (pos >= 0) {
       this.cards.splice(pos, 1);
       return true;
     }
     else
       return false;
   }
 }
 
 module.exports = Hands;
 