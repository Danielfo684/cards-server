import { uiDrag } from "./uiDrag.js";
import { deckBuilder } from "./deckBuilder.js";
import { playerDeck } from "./playerDeck.js";
import { Connector } from "./Connector.js";
import { uiGame } from "./uiGame.js";


const connection = Connector.getInstance("http://localhost:3000");
await connection.getCards();
export {connection};



deckBuilder.builder();
playerDeck.deckShuffle();
uiGame.init("#button-section", "#post-positions", "#new-game");
uiDrag.init(".drop-zone", ".card");
