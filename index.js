
import express from 'express'

const app = express()

const PORT = 3000

const AUTHORIZATION_UUID = 'sombra'

let cars = [
    { id: 1, brand: 'Ford', model: 'Mustang', cylinders: 400, year: 1998 },
    { id: 2, brand: 'Audi', model: 'R8', cylinders: 300, year: 2021 },
    { id: 3, brand: 'BMW', model: 'M3', cylinders: 195, year: 2010 },
    { id: 4, brand: 'Fiat', model: 'Mobi', cylinders: 24, year: 2023 },
]

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toTimeString()}`);
    next()
})

app.use((req, res, next) => {
    if (req.headers.authorization !== AUTHORIZATION_UUID) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    next()
})

app.get('/cars', (req, res) => {
    res.json(cars)
});

app.post('/cars', (req, res) => {
    const newCar = req.body

    if (!newCar.brand || !newCar.model || !newCar.cylinders || !newCar.year) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    cars.push({
        ...newCar
        , id: cars.length + 1
    });

    res.json(newCar)
});

app.delete('/cars/:id', (req, res) => {
    const { id } = req.params;

    cars = cars.filter(car => car.id !== Number(id));

    res.json({ message: 'Car deleted' })
})

app.put('/cars/:id', (req, res) => {
    const { id } = req.params;
    const updatedCar = req.body;

    const updatedCarKeys = Object.keys(updatedCar);
    const updatedCarValues = Object.values(updatedCar);

    if (updatedCarKeys.some(key => !['id', 'brand', 'model', 'cylinders', 'year'].includes(key))) {
        return res.status(400).json({ message: 'Invalid fields' })
    }

    if (updatedCarValues.every(value => value)) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    cars = cars.map(car => {
        if (car.id === Number(id)) {
            return {
                ...car,
                ...updatedCar
            }
        }

        return car
    })

    res.json({ message: 'Car updated' })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})