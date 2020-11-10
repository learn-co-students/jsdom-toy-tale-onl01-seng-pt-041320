let addToy = false;
const toyCollection = document.querySelector('#toy-collection')
const newToyForm = document.querySelector('.add-toy-form')
const TOYS_URL = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Individudally creates a card for each toy in toy json.
function addCard(toy) {
  const newToy = document.createElement("div") // creates a new div to be inserted
  newToy.className = 'card' // sets class name of div
  newToy.innerHTML = ` 
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p class='likes'>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
  ` // sets the html of div to ^ 

  const likeBtn = newToy.querySelector('.like-btn') // selects the like button class
  const likes = newToy.querySelector('.likes')  // selects the likes class

  likeBtn.addEventListener('click', () => { // adds an eventlistener to the click of like button
    likes.innerText = `${toy.likes++} Likes`
    updateToy(toy) // updates the json of that toy and does a PATCH on the toy's data in server
  })
  toyCollection.appendChild(newToy)
}

// creates cards for each toy in toy json
function addCards(cards) {
  cards.forEach(addCard)
}

// adds event listener to form class add-toy-form to handle submit events
function addToyFormListener() {
  newToyForm.addEventListener('submit', event => {
    event.preventDefault() // upon submit does not erase all data, allows  to show new/changed data

    const toy = {
      name: newToyForm.name.value,
      image: newToyForm.image.value,
      likes: 0
    }

    createToy(toy).then(addCard) // creates a new toy json, then does addCard on that new toy json
    newToyForm.reset() // resets form fields 
  })
}

// goes to server containing all the data in json
// does a GET to get all data, then returns it in json form
function getToys() {
  return fetch(TOYS_URL).then(resp => resp.json())
}

function createToy(toy) {
  return fetch(TOYS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

// sends a PATCH request to update the toy information
function updateToy(toy) {
  return fetch(TOYS_URL + `/${toy.id}`, { // gets the url to do a PATCH on: toy/:id
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

function init() {
  getToys().then(addCards) // getToys() returns a json full of the toys
  addToyFormListener()
}

init()