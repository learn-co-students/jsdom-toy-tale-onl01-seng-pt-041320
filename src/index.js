let addToy = false;
let divCollect = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".add-toy-form");
  let divCollect = document.querySelector('#toy-collection')
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
  .then(toys => {
    toys.forEach(toy => {
      //function to render toys goes here or something
      renderToys(toy)
    })
  })
}

// getToys().then(toys => {
//   toys.forEach(toy => {
//     //function to render toys goes here or something
//     renderToys(toy)
//   })
// })


// function renderToys(data) {
//   const toyCollection = document.getElementById("toy-collection")
//   for(i=0; i<data.length; i++){
//     //call a function that will generate cards and append them to DOM element
//     toyCollection.append(generateCards(data[i]))
//   }
// }
// function generateCards(cardInfo) {
//   const card = document.createElement("div")
//   card.setAttribute("class", "card")
//   //generate toy cards HTML
//     card.innerHTML = `<h2>${cardInfo.name}</h2>
//     <img src=${cardInfo.image} class="toy-avatar" />
//     <p data-number="${cardInfo.id}">${cardInfo.likes} </p>
//     <button class="like-btn" data-id="${cardInfo.id}">Like <3</button>`
//     const likeButton = document.querySelector(`[data-id="${cardInfo.id}"]`)
    
//    // console.log(likeButton)
//     card.addEventListener('click', (event) => {
//      //toyLikeDOM(cardInfo)
     
//      let likes = parseInt(event.target.previousElementSibling.innerText)
//      likes++
//      console.log(likes)
//     } )

//   return card
// }


//this function generates HTML for each card
function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
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

function likes(e){
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  e.target.previousElementSibling.innerText = `${more} likes`;
}

function toyLikeDOM(objectVar) {
  let incrementedLikes = objectVar.likes + 1
  pVar.innerText = incrementedLikes
}

function toyLikeServerUpdate() {

}
