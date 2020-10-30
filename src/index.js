let addToy = false;
const toyCollection = document.getElementById("toy-collection");
const addToyBtn = document.getElementById("new-toy-btn");
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

function getToys() { 
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
}

function postToys(toyStory) {
  fetch("http://localhost:3000/toys", {
    method: "Post", 
    headers: 
    {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyStory.name.value,
      image: toyStory.image.value,
      likes: 0
    })
  })
    .then(resp => resp.json())
    .then((toy) => {
      let newToy = renderToys(toy);
      toyCollection.append(newToy)
    })
}

// addToyBtn.addEventListener("click", () => {

// }


function renderToys(toy) {
  let h2Card = document.createElement("h2");
  h2Card.innerText = toy.name;

  let imgCard = document.createElement("img");
  imgCard.src = toy.image;
  imgCard.setAttribute("class", "toy-avatar");

  let buttonCard = document.createElement("button");
  buttonCard.setAttribute("class", "like-btn");
  buttonCard.setAttribute("id", toy.id);
  buttonCard.innerText = "<3";
  buttonCard.addEventListener("click", likes());

  let pCard = document.createElement("p");
  pCard.innerText = `${toy.likes} Pixar Hearts`

  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card");
  divCard.append(h2Card, imgCard, buttonCard, pCard)
  toyCollection.append(divCard)
}

function likes() {

}

getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})

