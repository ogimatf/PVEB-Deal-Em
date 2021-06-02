import * as PIXI from 'pixi.js';
import spritesheet from './Images/spritesheet.json';
import cardNums from './jsons/cardNums.json';
import ranks from './jsons/ranks.json';

export let cardsSprites = {};
export let cardsRanks = {};
export let table = new PIXI.Sprite();
export let home_btn = new PIXI.Sprite();

export const loader = PIXI.Loader.shared;

loader.add('table', './Images/dealem-table.png');
loader.add(spritesheet);
loader.add('cardNums', cardNums);
loader.add('ranks', ranks);
loader.add('home_btn', './Images/home_button.png');

loader.load(() => {
  table = new PIXI.Sprite(loader.resources['table'].texture);

  let cardNums = loader.resources['cardNums'].data;
  let sheet = loader.resources[spritesheet].spritesheet;

  for (let code in cardNums) {
    let pos = cardNums[code]
    const card = new PIXI.Sprite(sheet.textures[`cards-${pos - 1}.png`]);
    card.interactive = true;

    cardsSprites[code] = card;
  }
  home_btn = new PIXI.Sprite(loader.resources['home_btn'].texture);

  cardsRanks = loader.resources['ranks'].data;
});
