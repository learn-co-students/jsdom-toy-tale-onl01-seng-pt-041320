class ToyForm {
    static container = document.querySelector(".container");
    constructor() {
        this.render();
        this.attachEventLister();
    }

    attachEventLister() {
        this.form.addEventListener("submit", this.handleOnSubmit);
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        const { name, image } = event.target;
        const data = {
            name: name.value,
            image: image.value,
        };
        api.createToy(data).then((toy) => new ToyCard(toy));
    };

    render() {
        const form = document.createElement("form");
        form.className = "add-toy-form";
        form.innerHTML = this.renderInnerHTML();
        this.form = form;
        this.constructor.container.append(form);
    }

    renderInnerHTML = () => {
        return `
        <h3>Create a toy!</h3>
        <input
            type="text"
            name="name"
            value=""
            placeholder="Enter a toy's name..."
            class="input-text"
        />
        <br />
        <input
            type="text"
            name="image"
            value=""
            placeholder="Enter a toy's image URL..."
            class="input-text"
        />
        <br />
        <input
            type="submit"
            name="submit"
            value="Create New Toy"
            class="submit"
        />
        `;
    };
}