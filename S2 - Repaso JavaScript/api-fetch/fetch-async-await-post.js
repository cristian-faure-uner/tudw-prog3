const urlApi = 'https://fakestoreapi.com/products';

async function crearProducto(producto) {
    try{
        const response = await fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // especifica que el cuerpo de la solicitud es JSON
            },
            body: JSON.stringify(producto) // convierto el objeto JavaScript a una cadena de texto JSON
        })
        if (!response.ok){ 
            throw new Error('Error ' + response.status)
        }
        
        const datos = await response.json();
        console.log(datos);
    }catch(error){
        console.log('error ', error);
    }
}

const producto =  {
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronic'
}

crearProducto(producto);