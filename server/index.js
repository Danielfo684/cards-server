import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const cartasPosiciones = {
    lista: []
};


app.get('/', (req, res) => {
    console.log(cartasPosiciones.lista)
    res.json(cartasPosiciones.lista);
});


app.post('/cards', (req, res) => {
    const newItem = req.body;
    // Suponiendo que 'cartasPosiciones' es un array o un objeto donde guardas las posiciones

    const existingItem = cartasPosiciones.lista.find(item => item.id === newItem.id);
    if (existingItem) {
        existingItem.x = newItem.x;
        existingItem.y = newItem.y;
        res.status(200).json({
            status: 'OK',
            message: 'Item edited successfully',
            data: existingItem
        });
    } else {
        // Devuelve un JSON con el estado y el mensaje
        res.status(200).json({
            status: 'OK',
            message: 'Item created successfully',
            data: newItem
        });
        cartasPosiciones.lista.push(newItem);
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
