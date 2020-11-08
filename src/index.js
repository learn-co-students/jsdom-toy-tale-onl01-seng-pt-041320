let addToy = false;
const toyUrl = ("http://localhost:3000/toys");
const collection = document.getElementById("toy-collection");
const newToy = document.getElementById("new-toy-btn");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  let toyForm = toyFormContainer.querySelector(".add-toy-form")
  let submitBtn = document.getElementsByName("submit");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  submitBtn.forEach(button => {
    button.addEventListener("click", function() {
      let name = toyForm.name.value
      let image = toyForm.image.value
      birthdayGift(name, image)
    })
  })
    fetchToys()
});

function createElements(friend) {
  const card = document.createElement('div');
  card.className = "card"
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const img = document.createElement('img');
  img.className = "toy-avatar"
  const button = document.createElement('button')
  button.addEventListener("click", (e) => {
    addLikes(e)
  })
  h2.innerHTML = friend.name
  img.src = friend.image
  p.innerHTML = friend.likes
  button.className = `like-btn-${friend.id}`
  card.append(h2, img, p, button)
  collection.append(card)
};

function addLikes(e) {
  let like = parseInt(e.target.previousSibling.innerText) + 1
  let id = e.target.className.split("-").splice(2)
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"likes": `${like}`})
  };
  fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      e.target.previousSibling.innerText = object.likes
    })
}

function birthdayGift(name, image) {
  let data = {
    name: `${name}`,
    image: `${image}`,
    likes: 0
  };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  };
  debugger
  fetch(toyUrl, configObj)
    .then(function(response) {
      response.json();
    })
    .then(function(object) {
      createElements(object)
    })
};

function listToys(toys) {
  const friends = toys
  friends.forEach(friend =>
    {
      createElements(friend)
  });
};

function fetchToys() {
  fetch(toyUrl)
  .then(resp => resp.json())
  .then(json => listToys(json))
};