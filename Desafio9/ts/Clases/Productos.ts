interface Producto{
    title: string,
    price: number,
    thumbnail: string
};

export default class Productos {
    Id: number;
    Title: string;
    Price: number;
    Thumbnail: string;
    constructor(id: number, producto: Producto) {
        this.Id = id;
        this.Title = producto.title;
        this.Price = producto.price;
        this.Thumbnail = producto.thumbnail;
    }
}