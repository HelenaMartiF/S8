/* Si tienes windows. Lo primero que tienes que hacer es abrir powerShell como ADMINISTRADOR y ejecutar el comando `Set-ExecutionPolicy Unrestricted`. Elige la opciòn SI y dale a intro. Si tu ordenador está en español La opción SI será escribiendo una `S` y si está en ingles una `Y`.

Ahora vamos a trabajar con JSON SERVER para simular una api. Es muy fácil de usar. Simplemente instálalo de manera global usando el comando  `npm i -g json-server` y una vez lo tengas instalado, ejecuta este comando `json-server --watch exercise-2.json` en la posición donde esté el archivo exercise-2.json. Los datos que nos brindará serán los alojados en el archivo exercise-2.json y estarán accesibles por defecto en la url localhost:3000.

Si tienes windows tendrás que ejecutar `set-executionpolicy unrestricted –force` en una terminal abierta como administrador.
 
Para este ejercicio vamos a obtener y pintar en el html una serie de notas del diario de nuestro queridísimo Eliot. Para ello deberemos ejecutar el comando que comentabamos anteriormente y hacer un .fetch() a la url `http://localhost:3000/diary`.

Una vez tengas los datos tenemos que ordenarlos por fecha de menor a mayor con la propiedad .date. Nuestro carismático personaje es un poco caótico y escribe las notas en páginas salteadas...
  
Cuando lo tengas crea un div para cada nota del diario e introduce un ``<h3>``, un  ``<h5>`` y un ``<p>`` para su .title, .date y .description respectivamente.
  
Finalmente añade un botón para poder eliminar las notas del diario. En concreto hay una que a Eliot no le apetece recordar mucho...
*/

let thisIsScaringMe = async () => {
    try{
    let petitionToApi = await fetch (`http://localhost:3000/diary`);
    let apiToJson = await petitionToApi.json();
   
    let ordenarPorFecha = [...apiToJson].sort((masAntiguo, masReciente) => {
        return new Date(masAntiguo.date) - new Date(masReciente.date);
    });
    console.log("Ordenado por fecha de más antiguo a más reciente:", ordenarPorFecha);
    console.log(apiToJson);

    let mainDiv = document.createElement("div");
    mainDiv.className = "mainDiv";
    document.body.append(mainDiv);

    ordenarPorFecha.forEach(nota => {
        let divNota = document.createElement("div");
        divNota.className = "divNota";
        mainDiv.appendChild(divNota);

        let noteTitle = document.createElement("h3");
        noteTitle.textContent = nota.title;
        noteTitle.className = "noteTittle";
        divNota.appendChild(noteTitle);

        let noteDate = document.createElement("h5");
        noteDate.textContent = new Date(nota.date).toLocaleDateString();
        noteDate.className = "noteDate";
        divNota.appendChild(noteDate);

        let noteDescription = document.createElement("p");
        noteDescription.textContent = nota.description;
        noteDescription.className = "noteDescription";
        divNota.appendChild(noteDescription);

        let notaCensored = document.createElement("button");
        notaCensored.textContent = "Eliminar esta nota.";
        notaCensored.className = "removeNote";
        divNota.appendChild(notaCensored);

        notaCensored.addEventListener("click", () => {   //hay que ponerlo dentro del bucle ya que las variables notaCensored y divNota solo existen aquí dentro. 
            divNota.remove(); 
        });
    
    },);
    

    } catch (error){
        console.log("You had reasons to be scared. Hopefully you are not beeing hacked.");
    }
};



thisIsScaringMe();