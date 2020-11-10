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

function addCard(toy) {
  const newToy = document.createElement("div")
  newToy.className = 'card'
  newToy.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p class='likes'>${toy.likes} Likes</p>
    <button class="like-btn">Like <3</button>
  `

  const likeBtn = newToy.querySelector('.like-btn')
  const likes = newToy.querySelector('.likes')

  likeBtn.addEventListener('click', () => {
    likes.innerText = `${toy.likes++} Likes`
    updateToy(toy)
  })
  toyCollection.appendChild(newToy)
}

// where does cards get passed in..?
function addCards(cards) {
  cards.forEach(addCard)
}

// adds event listener to form class add-toy-form to handle submit events
function addToyFormListener() {
  newToyForm.addEventListener('submit', event => {
    event.preventDefault()

    const toy = {
      name: newToyForm.name.value,
      image: newToyForm.image.value,
      likes: 0
    }

    createToy(toy).then(addCard) // why dont we pass in toy param here? 
    newToyForm.reset() // resets form fields 
  })
}

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

function updateToy(toy) {
  return fetch(TOYS_URL + `/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

function init() {
  getToys().then(addCards)
  addToyFormListener()
}

init()