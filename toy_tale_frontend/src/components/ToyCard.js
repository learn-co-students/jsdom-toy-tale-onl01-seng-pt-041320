class ToyCard {
    static container = document.getElementById("toy-collection");

    constructor(toy) {
        this.toy = toy;
        this.render();
        this.attachEventListener();
    }

    static getAll() {
        api.getAllToys().then((data) =>
            data.forEach((toy) => new ToyCard(toy))
        );
    }

    attachEventListener() {
        this.card.addEventListener("click", this.handleOnClick);
    }

    handleOnClick = (event) => {
        if (event.target.className == "like-btn") {
            const id = this.card.dataset.id;
            api.updateLikes(id).then((toy) => this.updateLikesHTML(toy.likes));
        }
    };

    updateLikesHTML = (number) => {
        this.card.children[2].innerHTML = `${number} Likes`;
    };

    render() {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = this.toy.id;
        this.card = card;
        this.renderInnerHTML();
        this.constructor.container.append(card);
    }

    renderInnerHTML() {
        const { name, image, likes } = this.toy;
        this.card.innerHTML = `
            <h2>${name}</h2>
            <img src=${image} class="toy-avatar" />
            <p>${likes} Likes </p>
            <button class="like-btn">Like <3</button>
        `;
    }
}