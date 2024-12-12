import { connection } from './index.js'; // Importa la instancia creada en index.js
import { playerDeck } from './playerDeck.js';


export const uiGame = {
    init: (dropZones, notes) => {

        document.getElementById('post-positions').addEventListener('click', () => {

        
            connection.sendCards(cardPositionsJson);
        });


        document.getElementById('new-game').addEventListener('click', () => {
            connection.setNewGame();
            playerDeck.deckShuffle();
        });


    },
    



}
