export class Game {
  public players: string[] = ['Martin', 'Nika', 'Berndi', 'Horni'];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;

  constructor() {
    for (let i = 1; i < 14; i++) {
      this.stack.push('clubs_' + i);
      this.stack.push('diamonds_' + i);
      this.stack.push('hearts_' + i);
      this.stack.push('spade_' + i);
      shuffle(this.stack);
    }
  }
}
function shuffle(array) {
  var currentIndex = array.length,
    temporayValue,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    temporayValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporayValue;
  }

  return array;
}