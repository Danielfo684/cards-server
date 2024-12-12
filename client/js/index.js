import { uiDrag } from "./uiDrag.js";
import { deckBuilder } from "./deckBuilder.js";
import { playerDeck } from "./playerDeck.js";
import { Connector } from "./Connector.js";
import { uiGame } from "./uiGame.js";


const connection = Connector.getInstance("http://localhost:3000");
connection.getCards();
deckBuilder.builder();
playerDeck.deckShuffle();

export {connection};





uiGame.init("#button-section", "#post-positions", "#new-game");
uiDrag.init(".drop-zone", ".card");
