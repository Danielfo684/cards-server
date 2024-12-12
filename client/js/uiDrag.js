import { connection } from './index.js'; // Importa la instancia creada en index.js


export const uiDrag = {
    init: (dropZones, notes) => {



        //Notes Section
        document.querySelectorAll(notes).forEach((note) => {
            // Draggable
            note.setAttribute('draggable', 'true');

            //DragStart event
            note.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', event.target.id);
                note.classList.add('dragging');
            });

            //DragEnd event
            note.addEventListener('dragend', () => {
                note.classList.remove('dragging');
            });
        });

        //Drop Zones Section
        document.querySelectorAll(dropZones).forEach((zone) => {
            //DragOver event
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.style.backgroundColor = '#e0f7fa';
            });

            zone.addEventListener('dragleave', () => {
                zone.style.backgroundColor = '#f4f4f4';
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                let card = e.dataTransfer.getData('text/plain');
                let idCard = document.getElementById(card);
                if (zone.id === idCard.dataset.suit) {
                    // let extension = zone.getElementsByClassName('card').length;
                    // if (idCard.dataset.value == (1 + zone.getElementsByClassName('card').length) ) {


                    const draggingNote = document.querySelector('.dragging');
                    //    const x = e.clientX - zone.getBoundingClientRect().left -50;
                    const x = e.clientX - zone.getBoundingClientRect().left - (draggingNote.offsetWidth / 2);
                    const y = e.clientY - zone.getBoundingClientRect().top - (draggingNote.offsetWidth / 2);

                    draggingNote.style.position = 'absolute';
                    draggingNote.style.textAlign = 'left';

                    draggingNote.style.left = `${x}px`;
                    draggingNote.style.top = `${y}px`;
                    zone.style.backgroundColor = '#fff';

                    //crea un objeto con la posición de la carta
                    const cardPosition = {
                        "id": card,
                        "suit": zone.id,
                        "x": x,
                        "y": y
                    };

                    //llama a la conexión singleton y envía la posición de la carta
                    try {
                        connection.sendCards(cardPosition);
                        zone.appendChild(draggingNote);
                    } catch (error) {
                        console.error('Error sending card position:', error);
                    }

                    // }
                }
            });
        });

    }
}