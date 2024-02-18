/*
De nuevo vamos a usar JSON SERVER para simular nuestra api en local. Ejecuta ``json-server  --watch exercise-3.json`` y obtendremos de la url `http://localhost:3000` los datos del ejercicio.

En este caso tenemos 2 endpoints, o lo que es lo mismo, dos urls a las que llamar para recibir los datos.

El endpoint `http://localhost:3000/orders` nos devolverá una lista de pedidos de la tienda Mari & Juan y el endpoint `http://localhost:3000/products` que nos devuelve una lista de productos.

La intención es pintar todos los pedidos ordenados por fecha (ultimos pedidos al principio) y en los que pongamos tanto los productos que contiene el pedido como la cantidad pedida de cada uno de los productos.

Si os fijáis, en el endpoint de los pedidos no tenemos la información del producto, si no su id y cantidad pedida. Para obtener el nombre de los productos tendremos que hacer peticiones al endpoint de productos pasando el id del producto, por ejemplo ``http://localhost:3000/products/2``. De esta forma podremos obtener ya toda la información y pintarla en el html.
 */


let petitionToApi = async () => {
    try{ // try this
        let getOrders = await fetch('http://localhost:3000/orders'); // do a petition to api, save what it returns to getORders
        let getProducts = await fetch('http://localhost:3000/products'); // do a petition to api, save what it returns to getProducts

        let ordersJson = await getOrders.json(); // transform those data to json
        let productsJson = await getProducts.json(); // transform those data to json

        console.log("Orders", ordersJson);

        let sortedOrders = [...ordersJson].sort((masAntiguo, masReciente) => { // we declare a new variable named sortedOrders, we use the spreed operator (...) to create a shallow copy of the 'ordersJson' array. Doing this we avoid modifying the original array. sort takes a comparison function as an argument.
            return new Date(masReciente.date) - new Date (masAntiguo.date);
        }); // inside the comparison function, it converts the date property of each object into date objects using 'newDate' then it substracts the date object of the older date masAntiguo.date from the date object of the more recent date. 

        // In summary, after running this code, sortedOrders will contain a sorted version of orderJson, ordered by the data property, with the recent dates appearing first in the array and the most oldest dates appearing last.

        
        console.log("Ordenado por fecha", sortedOrders); // we check if it works
        console.log("Productos", productsJson); // check

        let mainDiv = document.createElement('div'); // añadimos el div en HTML
        mainDiv.className = 'mainDiv'; // le damos clase al div
        document.body.append(mainDiv); // añadimos el div al body

        let arrayProducts

        for (const basurero of sortedOrders) { // we create a loop that iterates sortedOrders which is an array with 3 objects
             
            for (const basureroProducts of basurero.products) {
                

                /* let divOrder = document.createElement('div'); // no explanation needed
                divOrder.className = 'divOrder';
                mainDiv.appendChild(divOrder);

                let pOrder = document.createElement('p');
                pOrder.className = 'pDiv';
                pOrder.textContent = basurero.date; // yep, this stil needs an explanation, sad? yep. we dan tell basurero to collect data from the plazaMayor sortedOrders.
                divOrder.appendChild(pOrder);

                const productsOrdered = {
                    productID: sortedOrders.products.productId,
                    productQuantity: sortedOrders.products.quantity,
                }
                
               arrayProducts.push(productsOrdered); */
            } 
        };


    } catch (error){
        console.log(`Sigue intentandolo babi <3 ${error}`)
    }
};

petitionToApi();



// ----------------------------------------------------------------------------

