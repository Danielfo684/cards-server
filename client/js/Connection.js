export class Connection {
  constructor(url) {
    this._url = url;
    this._lastQueryStatus = null;
  }

  // setNewGame() {
  //   fetch(`http://localhost:3000/new-game`)
  //     .then((response) => response.json())
  //     .then((response) => {
  //       this._lastQueryStatus = true;
  //     })
  // }

  getCards() {
    fetch(`http://localhost:3000/`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)

        for (const card of response) {
          console.log(card);

          const cardElement = document.querySelector(`#${card.id}`);
          const dropZone = document.getElementById(card.suit);
          dropZone.appendChild(cardElement);
          // Asegúrate de que la "dropZone" tenga un estilo apropiado
          const dropZoneRect = dropZone.getBoundingClientRect(); // Obtén la posición de la zona de caída

          cardElement.style.position = 'absolute';
          cardElement.style.left = `${card.x}px`;  // Usa dropZoneRect.left
          cardElement.style.top = `${card.y}px`;    // Usa dropZoneRect.top
        };

        this._lastQueryStatus = true;
      })
      .catch((error) => {
        this._lastQueryStatus = false;
      });
  }

  sendCards(cardsPosition) {
    fetch('http://localhost:3000/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardsPosition)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Ítem creado:', data);
      })
      .catch(error => {
        console.error('Error al crear el ítem:', error);
      });
  }
}