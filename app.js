//Products
class Product{
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

//User Interface
class UI{
    static addProduct(product){
        //Creating Product
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    static resetForm(){
        document.getElementById('product-form').reset();
    }

    static deleteProduct(e){
        if(e.name === "delete"){
            e.parentElement.parentElement.parentElement.remove()
        }
    }

    static showMessage(message, cssClass){
        //Creating Message
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));

        //Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        
        container.insertBefore(div, app);
        //Deleting after 3 seconds
        setTimeout(()=>{
            document.querySelector('.alert').remove()
        },3000);
    }
}

//DOM events
document.getElementById('product-form')
    .addEventListener('submit',(ev) => {
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;
    const year = document.getElementById('product-year').value;

    const product = new Product(name, price, year);
   
    if (name==='' || price==='' || year===''){
        return UI.showMessage("Complete Fields Please", "danger");
    }
    UI.addProduct(product);
    UI.resetForm();
    UI.showMessage("Product Created Succesfully", "success");

    ev.preventDefault();
});

document.getElementById('product-list')
    .addEventListener('click', (ev) => {

        UI.deleteProduct(ev.target);
        UI.showMessage("Your Product Has Been Deleted", "info");
});