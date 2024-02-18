/* En base a la api de Breaking Bad (https://breakingbadapi.com/), vamos a desarrollar una página dinámicamente en la que visualizar una galería con las imagenes y los nombres de los personajes de la serie. Para ellos es necesario usar el endpoint 'https://breakingbadapi.com/api/characters'.

Si te fijas en la respuesta de la api, la imagen está en la propiedad 'img' y el título en la propiedad 'name'. */



const pleaseDontBanMe = async () => {
    try{
    let petitionToApi = await fetch (`https://breakingbadapi.com/api/characters`);
    let apiToJson = await petitionToApi.json();

    let mainDiv = document.createElement("div");
    mainDiv.className = "mainDiv";
    document.body.appendChild(mainDiv);

    apiToJson.forEach(character => {
        let characterDiv = document.createElement("div");
        characterDiv.className = "characterDiv";
        mainDiv.appendChild(characterDiv);

        let characterImg = document.createElement("img");
        characterImg.src = character.img;
        characterImg.alt = character.name;
        characterDiv.appendChild(characterImg);

        let characterName = document.createElement("h4");
        characterName.className = "characterName";
        characterName.textContent = character.name;
        characterDiv.appendChild(characterName);
    });

    console.log(apiToJson);
    } catch (error) {
        console.log("¿Habrás sido baneado otra vez?", error);
    };
};





pleaseDontBanMe();

// ----------------------------- THIS API DOES NOT WANT ME TO GET IT'S INFO. BLOQUED FOR NO-CORS OR SOMETHING LIKE THIS. --------------------------- #NICETRY
// ----------------------------- Ivan says: APPI DIED a loong ago, so good luck. ------------------------------------