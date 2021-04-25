 const Cards = require('./cards');

 class Pile extends Cards {

   constructor() {
     super([]);
     this.onePointCards = 0;
     this.twoPointsCards = 0;
   }
   add(card) {
    this.cards.push(card);
   }
   
   add(cards) {
     for (let c of cards) {
       this.cards.push(c);
     }
   }

//    TODO: Proveri da li moze da se baci karta

 }
 
 module.exports = Pile;
 