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
    },
    deleteCar: async (id) => {
        const text = 'DELETE FROM carros WHERE id = $1';

        const values = [id];

        await query(text, values);
    },
    updateCar: async (id, car) => {
        const text = 'UPDATE carros SET brand = $1, model = $2, cylinders = $3, year = $4 WHERE id = ${id} RETURNING *';

        const values = [car.brand, car.model, car.cylinders, car.year];

        const updated = await query(text, values);

        return updated.rows[0];
    }
}

export default CarsRepository;
