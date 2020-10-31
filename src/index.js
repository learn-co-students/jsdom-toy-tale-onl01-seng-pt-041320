let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {

  const toyCollection = document.querySelector("#toy-collection")
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toys => {
    //take my toys array make HTML with them in ORDER TO ADD THEM TO THE DOM
    let toysHTML = toys.map(function(toy) {
      return `
      <div class="card">
       <h2>${toy.name}</h2>
       <img src=${toy.image} class="toy-avatar" />
       <p>${toy.likes} likes </p>
       <button data-id="${toy.id}" class="like-btn">Like <3</button>
       <button data-id="${toy.id}" class="delete-btn">Delete </button>
      </div>
      `
    })
    toyCollection.innerHTML = toysHTML.join('')
  })

  toyFormContainer.addEventListener("submit", function(e){
    e.preventDefault()
    // Grab the inouts from form
    const toyName = e.target.name.value
    const toyImage = e.target.image.value 

    fetch("http://localhost:3000/toys", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
    })
    .then( r => r.json())
    .then( newToy => {
      // fetch updated the DB
      // now I need to UPDATE that DOM
      // covert the newToy from JSON to HTML in ORDER TO ADD TO THE DOM

      let newToyHTML = `
      <div class="card">
       <h2>${newToy.name}</h2>
       <img src=${newToy.image} class="newToy-avatar" />
       <p>${newToy.likes} likes </p>
       <button data-id="${newToy.id}" class="like-btn">Like <3</button>
       <button data-id="${newToy.id}" class="delete-btn">Delete </button>
       </div>
      `
      toyCollection.innerHTML += newToyHTML
    })
  })

toyCollection.addEventListener("click", (e) => {
  if (e.target.className === "like-btn") {
    let currentLikes = 
    parseInt(e.target.previousElementSibling.innerText)
    let newLikes = currentLikes + 1
    e.target.previousElementSibling.innerText = newLikes + " likes"

    fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: newLikes
      })
    })
  }

    if (e.target.className === "delete-btn") {
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "DELETE", 
      })
      .then(r => {
        e.target.parentElement.remove()
      })
    }
})

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
