import * as PIXI from 'pixi.js';

export let table = new PIXI.Sprite();

export const loader = PIXI.Loader.shared;

loader.add('table', './Images/dealem-table.png');

loader.load(() => {
  table = new PIXI.Sprite(loader.resources['table'].texture);
});
