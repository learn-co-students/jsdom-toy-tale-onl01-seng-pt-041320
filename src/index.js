let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  fetchToys();
  
    function fetchToys()
    {
      return fetch("http://localhost:3000/toys")
        .then(resp => resp.json())
        .then(toysJson => renderToys(toysJson));
    }
    
    function renderToys(json)
    {
      json.forEach(toy => {createToy(toy)});
    }

        function createToy(toy)
    {
      const toyCollection = document.getElementById("toy-collection");
      const div = document.createElement("div");

      div.innerHTML =
        `<div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar">
          <p>${toy.likes} Likes </p>
          <button class="like-btn">Like <3</button>
        </div>`;
      
      toyCollection.append(div);
      
      const likebtn = div.querySelector(".like-btn");

      likebtn.addEventListener("click", function (e)
      {
        let currentLikes = Number(toy.likes) + 1;

        toy.likes = currentLikes;
        e.target.previousElementSibling.innerText = `${toy.likes} Likes`;

        fetch(`http://localhost:3000/toys/${toy.id}`,
        {
          method: "PATCH",
          headers: 
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(
          {
            likes: currentLikes
          })
        })
      })
    }

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
  })

const form = document.querySelector(".add-toy-form");

  form.addEventListener("submit", (e) => 
  {
    e.preventDefault();

    const name = form.elements.name.value;
    const image = form.elements.image.value;

    submitData(name, image);

    function submitData(name, image) {
      const data =
      {
        name: name,
        image: image,
        likes: 0
      };

      const configObj =
      {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      };

      fetch("http://localhost:3000/toys", configObj)
        .then(resp => resp.json())
        .then(function (object)
      {
          createToy(object);
      })
  }
  })
});
