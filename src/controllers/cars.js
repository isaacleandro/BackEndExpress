import CarsRepository from '../repositories/carsRepository.js';

const CarsController = {
    getCars: async (req, res) => {
        const cars = await CarsRepository.getCars();

        res.json(cars);
    },

    newCar: (req, res) => {
        const newCar = req.body;

        if (!newCar.brand || !newCar.model || !newCar.cylinders || !newCar.year) {
            return res.status(400).json({ message: 'All fields are required' })
        }

      try {
        CarsRepository.addCar(newCar);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      
        res.status(201).json(newCar)
    },
    deleteCar: (req, res) => {
        const { id } = req.params;

        cars = cars.filter(car => car.id !== Number(id));

        res.json({ message: 'Car deleted' })
    },

    updateCar:  (req, res) => {
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
    }
}

export default CarsController;



