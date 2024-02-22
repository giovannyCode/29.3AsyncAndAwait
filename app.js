class Game {
  constructor() {
      this.deck_id = null;
      this.addCardToBoard = this.addCardToBoard.bind(this);
 }

  async createNewDeck() {
    let response  = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    this.deck_id = response.data.deck_id;
    console.log(`Deck id Created: ${this.deck_id}`);
}

  async shuffleDeck() {
    let response  = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_id}/shuffle`);
    response.data.success
    ? console.log(`Deck id ${response.data.deck_id} has been shuffled`)
    : console.error("Error shuffling the deck");
}

async drawCard()
{
  let response = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=1`)

  return {
    image: response.data.cards[0].image,
    remaining: response.data.remaining
}

}

async addCardToBoard(event)
{

const remaining = document.getElementById("remaining");
const mainRow= document.getElementById("mainrow");
const col1 = document.createElement("div");
col1.classList.add('col-1');
const image = document.createElement("img");
let response  = await this.drawCard()
image.setAttribute("src", response.image);
col1.append(image);
mainRow.append(col1);
remaining.innerHTML = response.remaining;

}

setupEventListener() {
 
  const button = document.getElementById('gameButton');
  button.addEventListener('click', this.addCardToBoard);
}

}

async function mainGame() {
const myGame = new Game();
await myGame.createNewDeck();
await myGame.shuffleDeck();
myGame.setupEventListener();
}

mainGame();


