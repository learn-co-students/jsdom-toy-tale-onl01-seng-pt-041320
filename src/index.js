// *** on page load, run fetch that will make a get request to the toy API. 
//***make a <div class="card"> for each, !!forEach()!! toy
// For the Cards
// ***an <h2> for for the toys name
// ***<img src...> tag for toys image attribute and the class name "toy-avatar" <class="toy-avatar"
// ***<p> tag with how many likes the toy has 
// ***a <button> tag with a class="like-btn"

//add the card , or append it to, the <div class="card">
const URL = "http://localhost:3000/toys";
let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
 fetch(URL)
    .then( function(response){
      return response.json();
    })
    .then( function(toys){
      render(toys);
    });

  function render(toys) {
    let toyCollection = document.getElementById('toy-collection');
    toyCollection.innerHTML = "";

    toys.forEach((toy, toyIndex) => {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class='toy-avatar'></img>
    <p>Likes: ${toy.likes || 0} </p>
    <button class='like-btn'> Like! </button>
    <button class='delete-btn'> Delete! </button>
    `;
    toyCollection.append(card);

    let likeBtn = card.querySelector('.like-btn');
    likeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toy.likes = parseInt(toy.likes) + 1; 
      fetch(`${URL}/${toy.id}`, {
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(toy)
      });
      render(toys);
    });

    let deleteButton = card.querySelector('.delete-btn');
    deleteButton.addEventListener('click', (e) => {
      toys.splice(toyIndex, 1); 
      fetch(`${URL}/${toy.id}`, {
        method: 'delete'
      });
      render(toys);
    });


    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    const addToyForm = document.querySelector('.add-toy-form')
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let nameInput = document.getElementsByClassName('input-text')[0].value;
      let imageInput = document.getElementsByClassName('input-text')[1].value;

      fetch(URL, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput, 
          image: imageInput,
          likes: 0
        })
      });

      
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    });
})
}})
