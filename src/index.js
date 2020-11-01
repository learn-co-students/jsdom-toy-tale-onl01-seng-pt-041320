let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-toy-form");
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
  form.addEventListener("submit", function(event){
    event.preventDefault();
    const name = form.name.value
    const image = form.image.value
    submitData(name, image) // calling a function that submits data to the db, creates a card and appends it to the container.
    form.reset();
  });
  fetchToys(); 
});

//FETCHING AND DISPLAYING TOYS

function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => renderToys(json));
}

function renderToys(data) {
  console.log(data)
  const toyCollection = document.getElementById("toy-collection")
  for(i=0; i<data.length; i++){
    //call a function that will generate cards and append them to DOM element
    toyCollection.append(generateCards(data[i]))
  }
}


//this function generates HTML for each card
function generateCards(cardInfo) {
  const card = document.createElement("div")
  card.setAttribute("class", "card")
  //generate toy cards HTML
    card.innerHTML = `<h2>${cardInfo.name}</h2>
    <img src=${cardInfo.image} class="toy-avatar" />
    <p data-number="${cardInfo.id}">${cardInfo.likes} </p>
    <button class="like-btn" data-id="${cardInfo.id}">Like <3</button>`
    const likeButton = document.querySelector(`[data-id="${cardInfo.id}"]`)
    console.log(likeButton)
    likeButton.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      likes(e)
    })

  return card
}

//ADDING A NEW TOY HERE

function submitData(toyName, imgURL) {
  const toyCollection = document.getElementById("toy-collection")

  let formData = {
      name: toyName,
      image: imgURL,
      likes: 0
    };
     
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
     
    return fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(json => toyCollection.append(generateCards(json)))
    .catch(function(error) {
          document.body.innerHTML = error.message
      }); 
}



//LIKING A TOY

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}