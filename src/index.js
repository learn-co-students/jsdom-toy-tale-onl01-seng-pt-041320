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

    button.addEventListener("click", function(event) {
      let likeText = button.previousSibling.innerHTML;
      let likeNumber = likeText.match(/[0-9]+/g);
      button.previousSibling.innerHTML = `${parseInt(likeNumber) + 1} Likes`;
    
      let configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "likes": parseInt(likeNumber) + 1
            })
          }
      
        fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
          .then(function(response) {
              return response.json();
          })
          .then(function(object) {

          });
     
        });
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
      let form = document.querySelector(".add-toy-form")
      form.addEventListener('submit', function(event) {
        let nameInput = document.querySelector('input[name="name"]').value
        let imageInput = document.querySelector('input[name="image"]').value
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

let buttons = document.querySelectorAll(".like-btn")

for (let button of buttons) {
  button.addEventListener("click", function(event) {
      let likeText = button.previousSibling.innerHTML;
      let likeNumber = likeText.match(/[0-9]+/g);
      button.previousSibling.innerHTML = `${parseInt(likeNumber) + 1} Likes`;
    
      let configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            "likes": parseInt(likeNumber) + 1
          }
      
        fetch("http://localhost:3000/toys/:id", configObj)
          .then(function(response) {
              return response.json();
          })
          .then(function(object) {
          });
     
        });
        }