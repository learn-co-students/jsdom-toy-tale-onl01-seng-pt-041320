let addToy = false;

let apiUrl = 'http://localhost:3000/toys/'



document.addEventListener("DOMContentLoaded", () => {

  function getToys() {
    fetch(apiUrl)
    .then(resp => resp.json())

    .then(json => {
      json.forEach(toy => renderToy(toy))
    })
    .catch(function (error) {
      document.body.innerHTML = error.message
    });
  }


  function postToy(data) {
   
   

    let formData = {
      "name": data.name.value,
      "image": data.image.value,
      "likes": 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    return fetch(apiUrl, configObj)
      .then(resp => resp.json())
  
      .then(json => {
        // json = an object representing the single toy that was created
        renderToy(json)
  
      })
      .catch(function (error) {
        document.body.innerHTML = error.message
      });
  }

  

  function renderToy(toy) {
    const toyCollection = document.getElementById("toy-collection")
    const card = document.createElement('div')
    card.className = 'card'
    let h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    card.appendChild(h2)
    let img = document.createElement('img')
    img.className = "toy-avatar"
    img.src = toy.image
    card.appendChild(img)
    let likes = document.createElement('p')
    likes.className = "likes-count"
    likes.innerHTML = `${toy.likes} likes`
    card.appendChild(likes)
    let btn = document.createElement('BUTTON')
    btn.className = "like-btn"
    btn.innerHTML = `Like <3`
    card.appendChild(btn)
    toyCollection.appendChild(card)
    btn.addEventListener("click", event => {
      likes_tag = event.target.previousSibling 
      patchToy(likes_tag, toy) 
    })
  }

 getToys()

 function patchToy(likes_tag, toy) {

   toy.likes++
   fetch(apiUrl + "/" + `${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
   })
   .then(resp => resp.json())
   .then(json => {
    likes_tag.innerHTML = `${json.likes} likes` 
   });

  //  debugger
 }

 
 

 let toyForm = document.querySelector('.add-toy-form')
 toyForm.addEventListener('submit', event => {
   event.preventDefault()
   postToy(event.target)
 })

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
  
