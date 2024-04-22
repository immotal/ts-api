import { Pool, Client } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_name',
    password: 'password',
    port: 5438,
});


async function query(text: string, params: any[] = []) {
    const client = await pool.connect();
    try {
        return await client.query(text, params);
    } finally {
        client.release();
    }
}

async function insertData(name: string, age: number) {
    try {
        await query('INSERT INTO test (name, age) VALUES ($1, $2)', [name, age]);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

async function getData() {
    try {
        const result = await query('SELECT * FROM test');
        console.log('Data retrieved successfully:', result.rows);
    } catch (error) {
        console.error('Error getting data:', error);
    }
}

async function updateData(id: number, name: string, age: number) {
    try {
        await query('UPDATE test SET name = $1, age = $2 WHERE id = $3', [name, age, id]);
        console.log('Data updated successfully');
    } catch (error) {
        console.error('Error updating data:', error);
    }
}

async function deleteData(id: number) {
    try {
        await query('DELETE FROM test WHERE id = $1', [id]);
        console.log('Data deleted successfully');
    } catch (error) {
        console.error('Error deleting data:', error);
    }
}

export async function demo() {
    // await createTable();
    await insertData('John', 30);
    await getData();
    await updateData(1, 'Jane', 25);
    await getData();
    await deleteData(1);
    await getData();
}
