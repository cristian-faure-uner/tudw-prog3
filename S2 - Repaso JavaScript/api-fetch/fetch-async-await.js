const urlApi = 'https://fakestoreapi.com/products';

// declaro la función asicrona
async function buscarProductos() {
    try{
        // espero el resultado de la promesa
        const response = await fetch(urlApi);
        if (!response.ok){ 
            throw new Error('Error ' + response.status)
        }
                
        const datos = await response.json();
        console.log(datos);
    }catch(error){
        console.log('error ', error);
    }
}

buscarProductos();

// declaro la función asicrona
async function buscarUnProducto(id) {
    try{
        // espero el resultado de la promesa
        const response = await fetch(`${urlApi}/${id}`);
        if (!response.ok){ 
            throw new Error('Error ' + response.status)
        }
                
        const datos = await response.json();
        console.log(datos);
    }catch(error){
        console.log('error ', error);
    }
}
buscarUnProducto(6);