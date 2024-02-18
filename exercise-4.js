/* Vamos a usar de nuevo JSON SERVER para crear un listado de personajes de la serie Dragon Ball.

Para ello, ejecutemos `json-server --watch exercise-4.json`. En este caso el endpoint con los personajes es `http://localhost:3000/characters`.

La idea es crear una galería con los planetas, que podemos obtener del endpoint `http://localhost:3000/planets` y, que si el usuario hace click en alguno de los planetas, salga debajo los personajes que están asociados por el .idPlanet a ese planeta en cuestión, mostrando tanto sus imágenes .avatar como sus nombres .name. Para poder obtener la información de los personajes podemos hacer un filtro de los personajes llamando a la url, por ejemplo `http://localhost:3000/characters?idPlanet=1` y, teniendo en cuenta que el idPlanet variará dependiendo del planeta seleccionado.
 
Además de esto, agrega un buscador para poder filtrar los personajes por nombre una vez que has seleccionado el planeta. Por lo tanto, deberemos incluir el input debajo del planeta y encima de los personajes listados.

Como extra podríamos hacer que si haces click a un personaje salga la descripción debajo. Como extra del extra haz que la descripción se oculte si vuelves a hacer click en el mismo personaje. */



// __________________________ APPROACH ________________________________

/* planet cards with image, name. it need to be interactive, once you click (addevent) on a planet card needs to show the characters associated to it. so display none once click change diplay? also needs to have a search input so you can serach for the character name inside the planet. optional to provide character info once clicked on it. another addevent for character that contains character info */

/* 
1. get planets from api, assign them to html with dom and design the card
2. we need to add an addeventlistener planetsMainDiv so when user clicks on it responds
3. respond need to show the characters realted to them, so first we need to get them -- this needs to go inside the addeventlisener as it activates when click is dettected
4. petition to get characters and somehow we need to vincluate the data from characters to idplanet, avatar and name needs to be shown
5. add a search input for characters name only shown when user clicked on planet card
6. don't even know how to keep approaching this. so i'll start doing thing and see where it takes me. 
 */

// so far so good, when clicked on eventlistener assigned to planetsMainDiv characters appear. however we need to add a filter as only the characters of each planet need to be shown when clicked on the correct planet. so for example, earth has 2 characters so those are the only ones that can appear when clicked on earth, not all of them. So as the exercises requires we need to use .filter. how? let's find out. 
// what if we create 3 arrays one for each planet? so we filter the planet id from the character and we push the filtered characters into that planet array? so then we can call that array, we would need a conditional here too, if click deteced on planet1 show this, if planet 2 show this if not show that. so this means we need to also keep the planets on separated variables? so we can specify which variable is clicked on? 
// how  can we tell JS to be conscious of where the user clicks? 
// if we keep the each planet on its own variable then we do not need a loop. just by creating an addeventlistener to the variable once this one already related to a div would work, won't it?
// now how do we do the DOM thing with each planet? we do not need a loop as each variable only contains its planet info so it doesn't need to iterate inside diferent objects does it? 
// we do have know each div vinculated to a planet, I know there must be another way for doing it but I couldn't think of it and I really don't want to ask chati this early, I want to get this by myself, no matter how it's done. I'll ask her later but won't modify mine if it works how it is. 
// now we need to get characters array and filter it so we can get 3 arrays with the 3 different planet characters.
// we do have 3 diffent arrays with the characters of each planet filtered. we do need now, to vinculate those characters to its planet. how can we do that? what if we create an eventlistener for each div? let's try that
// ACHTUNG! meanwhile characters are sorted inside an ARRAY although there is only one, planets are not inside an array but an OBJECT! 


// Llamamientos from HTML
const planetsMainDiv$$ = document.querySelector('[data-function="planets"]');
planetsMainDiv$$.className = "planetsMainDiv";

const vegetaDiv$$ = document.createElement('div');
const earthDiv$$ = document.createElement('div');
const namekDiv$$ = document.createElement('div');

/* const planetsDiv$$ = document.createElement('div'); */ // needs to be declared outside as we need to use it for an addeventlistener, if it is inside the loop it will only exist there.
const charactersMainDiv$$ = document.querySelector('[data-function="characters"]');
const charactersDiv$$ = document.createElement('div');

const planetsPetitionToApi = async () => {
    try{
        const planetsFromApi = await fetch('http://localhost:3000/planets'); 
        const planetsJson = await planetsFromApi.json();
        console.log("Planets", planetsJson) // array with 3 objects, each object: id, name, image src

        const planetVegeta = planetsJson[0];
        const planetEath = planetsJson[1];
        const planetNamek = planetsJson[2];
        console.log("Vegeta", planetVegeta) // nice, it works, 1 object with vegeta planet info. 

// ----------------------------- VEGETA ----------------------------------------------------
        
        vegetaDiv$$.className = "vegetaDiv";
        planetsMainDiv$$.appendChild(vegetaDiv$$);

        const vegetaName$$ = document.createElement('h2');
        vegetaName$$.className = "vegetaName";
        vegetaName$$.textContent = planetVegeta.name;
        vegetaDiv$$.appendChild(vegetaName$$);

        const vegetaImg$$ = document.createElement('img');
        vegetaImg$$.className = "vegetaImg";
        vegetaImg$$.src = planetVegeta.image;
        vegetaDiv$$.appendChild(vegetaImg$$);

// ------------------------------ EARTH ----------------------------------------------------
     
        earthDiv$$.className = "earthDiv";
        planetsMainDiv$$.appendChild(earthDiv$$);

        const earthName$$ = document.createElement('h2');
        earthName$$.className = "eartName";
        earthName$$.textContent = planetEath.name;
        earthDiv$$.appendChild(earthName$$);

        const earthImg$$ = document.createElement('img');
        earthImg$$.className = "eartImg";
        earthImg$$.src = planetEath.image;
        earthDiv$$.appendChild(earthImg$$);

// ----------------------------- NAMEK ---------------------------------------------------

        namekDiv$$.className = "namekDiv";
        planetsMainDiv$$.appendChild(namekDiv$$);

        const namekName$$ = document.createElement('h2');
        namekName$$.className = "namekName";
        namekName$$.textContent = planetNamek.name;
        namekDiv$$.appendChild(namekName$$);

        const namekImg$$ = document.createElement('img');
        namekImg$$.className = "namekImg";
        namekImg$$.src = planetNamek.image;
        namekDiv$$.appendChild(namekImg$$);
    
    }catch (error){
        console.log("Keep trying babi, you can!", error); // some nice message so we don't cry that much.
    };
    
};

let charactersVegeta; //contains all vegeta characters
let charactersEarth; // contains all earth characters
let charactersNamek; // contains all namek characters

const characterPetitionToApi = async () => {

    const charactersFomApi = await fetch('http://localhost:3000/characters');
        const charactersJson = await charactersFomApi.json();
        console.log("Characters", charactersJson) // array with 9 objects, each: id, name, description, avatar(url), idPlanet.

        charactersVegeta = charactersJson.filter(basurero => basurero.idPlanet == 1);
        // okay I had to search for this. when using filter it needs a callback function (=>) cause it returns a boolean value, depends on that boolean valeu it pushes the value found by basurero inside the variable or not. In this basurero says hey, this is == to 1 so it's true we'll put it inside charactersVegeta, when says hey, this is != to 1 so it's false we don't push it. If we only put basurero.idPlanet == 1 without a callback function it only returns a boolean value, does not push anything inside the new variable.
        console.log("CharactersVegeta", charactersVegeta) // contains the 2 characters assigned to planetid 1

        charactersEarth = charactersJson.filter(basurero => basurero.idPlanet == 2); 
        console.log("CharactersEarth", charactersEarth); // 6 characteres

        charactersNamek = charactersJson.filter (basurero => basurero.idPlanet == 3);
        console.log("CharactersNamek", charactersNamek); // only piccooooolo

}

vegetaDiv$$.addEventListener("click", () => {

})


planetsPetitionToApi()
characterPetitionToApi()