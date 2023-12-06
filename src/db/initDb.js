// Creamos el script de inicialización de la base de datos, con las tablas.

/* async function main () {
    let connection

    try{
        connection = await getPool() --> Sería equivalente a nuestra variable pool
    } catch (error){
        console.error(error)
    } finally{
        if(connection) {
            connection.release() --> pool.release() Para forzar la desconexión al finalizar el proceso de creación en la base de datos
            process.exit()
        }
    }
}

main()
*/
