import mysql from 'mysql2/promise';

// creamos la conexión a la base de datos
export const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'reclamos', 
    database: 'reclamos', 
    password:  '*2024.reclamos*'
});
