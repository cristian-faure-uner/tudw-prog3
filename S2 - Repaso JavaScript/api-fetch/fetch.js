const urlApi = 'https://fakestoreapi.com/products';

fetch(urlApi)
    .then((response) => {
        // vemos la respueta del fetch
        // console.log(response)
        
        // sera verdadero en caso de alguna respuesta 2xx
        if (!response.ok){ 
            throw new Error('Error ' + response.status)
        }

        // convierto la respuesta a un formato json para poder trabajar con los datos
        return response.json(); // retorna una promesa, la capturo en el siguiente then()
    })
    .then((datos) => {
        console.log(datos);
    })
    .catch((error) => console.log(error));

    