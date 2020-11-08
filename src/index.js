document.addEventListener('DOMContentLoaded', function() {

  fetch('http://localhost:3000/toys')
        .then(function(response) {
          return response.json();
        })
        .then(function(array) {
          for (const toy of array) {
            renderToy(toy)
          }
        })
  });


function renderToy(toy) {
  const collection = document.getElementById("toy-collection")

    const newDiv = document.createElement('div')
    newDiv.className = 'card'
    const name = document.createElement('h2')
    name.innerHTML = `${toy.name}`
    newDiv.appendChild(name)
    const image = document.createElement('img')
    image.src = toy.image
    image.className = 'toy-avatar'
    newDiv.appendChild(image)
    const likes = document.createElement('p')
    likes.innerHTML = `${toy.likes} Likes`
    newDiv.appendChild(likes)
    const button = document.createElement('button')
    button.innerHTML = `Like <3`
    button.className = 'like-btn'
    newDiv.appendChild(button)
  
    collection.appendChild(newDiv)
  
}

  

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {

    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }      
      let form = document.querySelector("#add-toy-form")
      form.addEventListener('submit', function(event) {
        let nameInput = document.querySelector('text#name').value
        let imageInput = document.querySelector('text#image').value
        let formData = {
          "name": nameInput,
          "image": imageInput,
          "likes": 0
          };
        let configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(formData)
          };
      
        fetch("http://localhost:3000/toys", configObj)
          .then(function(response) {
              return response.json();
          })
          .then(function(object) {
              renderToy(object);
          });

          event.preventDefault();
        })
      })
    
});



// add new toy: put existing toys into an array, push new toy to array from form, clear innerHTML on page, rerender all toys in array. like in pod exercise.