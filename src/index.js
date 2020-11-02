// let addToy = false;




// document.addEventListener("DOMContentLoaded", () => {


//   function fetchToys(data) {

//     const toyCollection = document.getElementById("toy-collection")

//     let formData = {
//       "name": data.name.value,
//       "image": data.image.value,
//       "likes": 0
//     }

//     let configObj = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       },
//       body: JSON.stringify(formData)
//     }

//     return fetch('http://localhost:3000/toys', configObj)
//       .then(resp => resp.json()
//       )
//       .then(json => {
//         let new_toy = renderToys(json)
//         toyCollection.append(new_toy)
//       })
//       .catch(function (error) {
//         document.body.innerHTML = error.message
//       });
//   }


//   function renderToys(toy) {

//     const card = document.createElement('div')
//     card.className = 'card'
//     let h2 = document.createElement('h2')
//     h2.innerHTML = toy.name
//     card.appendChild(h2)
//     let img = document.createElement('img')
//     img.className = "toy-avatar"
//     img.src = toy.image
//     card.appendChild(img)
//     let likes = document.createElement('p')
//     likes.innerHTML = `${toy.likes} likes`
//     card.appendChild(likes)
//     let btn = document.createElement('BUTTON')
//     btn.className = "like-btn"
//     btn.innerHTML = `Like <3`
//     card.appendChild(btn)

//     toyCollection.appendChild(card)
//   }

//   fetchToys()


//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form

//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//       toyForm.addEventListener('submit', event => {
//         event.preventDefault()
//         fetchToys(event.target)
//       })
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });

//   fetchToys

// });
  
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')


function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
    
}

function postToy(toy_data) {

    let formData = {
      
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      }
    
    let configObj = {
      method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
          },
          body: JSON.stringify(formData)
        }

  fetch('http://localhost:3000/toys', configObj) 
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

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
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}


// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// start by getting all toys

getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})