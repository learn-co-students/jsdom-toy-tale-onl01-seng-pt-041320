class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    getAllToys = () => fetch(`${this.baseURL}/toys`).then((res) => res.json());

    updateLikes = (id) =>
        fetch(`${this.baseURL}/toys/${id}`, { method: "PATCH" }).then((res) =>
            res.json()
        );

    createToy = (data) => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        };
        return fetch(`${this.baseURL}/toys`, config).then((res) => res.json());
        
    };
}