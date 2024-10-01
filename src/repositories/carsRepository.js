import { cars, query } from '../db/db.js';

const CarsRepository = {
    addCar: async (car) => {
        const text = 'INSERT INTO carros (id, brand, model, cylinders, year) RETURNNING *';

        const values = [car.id, car.brand, car.model, car.cylinders, car.year];

        const updated = await query(text, values);

        return updated.rows[0];
    },
    getCars: async () => {
        const text = 'SELECT * FROM carros';

        const result = await query(text);

        console.info(result);

        return result.rows;
    }
}

export default CarsRepository;
