// Storage Controller
const StorageController = (function () {

})();




// Product Controller
const ProductController = (function () {

    // private 
    const Product = function (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {
        products: [
            { id: 0, name: 'Monitor', price: 200 },
            { id: 1, name: 'Ram', price: 500 },
            { id: 2, name: 'Mouse', price: 100 }
        ],
        selectedProduct: null,
        totalPrice: 0
    }

    // public
    return {
        getProdcuts: function () {
            return data.products;
        },
        getData: function () {
            return data;
        }
    }

})();





// UI Controller
const UIController = (function () {

})();





// App Controller
const App = (function (ProductCtrl, UICtrl) {
    return {
        init: function () {
            console.log('starting app');
            const products = ProductCtrl.getProdcuts();

            UIController.createProductList(products);
        }
    }
})(ProductController, UIController);

App.init();