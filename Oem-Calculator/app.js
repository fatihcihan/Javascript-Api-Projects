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
        products: [],
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
        },
        addProduct: function (name, price) {
            let id;

            if (data.products.length > 0) {
                id = data.products[data.products.length - 1].id + 1;
            } else {
                id = 0;
            }

            const newProduct = new Product(id, name, price);
            data.products.push(newProduct);
            return newProduct;
        }
    }

})();





// UI Controller
const UIController = (function () {

    const Selectors = {
        productList: "#item-list",
        addButton: ".addBtn",
        productName: '#productName',
        productPrice: '#productPrice',
        productCard: '#productCard'
    }

    return {
        createProductList: function (products) {
            let html = '';

            products.forEach(product => {
                html += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price} $</td>
                    <td class="text-right">
                        <button type="submit" class="btn btn-warning btn-sm">
                            <i class="far fa-edit"></i>
                        </button>
                    </td>
                </tr>
                `;
            });

            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors: function () {
            return Selectors;
        },
        addProduct: function (product) {
            document.querySelector(Selectors.productCard).style.display = 'block';
            var item = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.price} $</td>
                    <td class="text-right">
                        <button type="submit" class="btn btn-warning btn-sm">
                            <i class="far fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;

            document.querySelector(Selectors.productList).innerHTML += item;
        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = 'none';
        }
    }
})();





// App Controller
const App = (function (ProductCtrl, UICtrl) {

    const UiSelectorors = UIController.getSelectors();

    // Load event listeners
    const loadEventListeners = function () {
        // add product event
        document.querySelector(UiSelectorors.addButton).addEventListener('click', productAddSubmit);
    }

    const productAddSubmit = function (event) {
        const productName = document.querySelector(UiSelectorors.productName).value;
        const productPrice = document.querySelector(UiSelectorors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            // add product
            const newProduct = ProductController.addProduct(productName, parseFloat(productPrice));
            UIController.addProduct(newProduct);
            // clear inputs
            UIController.clearInputs();
        }


        console.log(productName);
        console.log(productPrice);
        event.preventDefault();
    }

    return {
        init: function () {
            console.log('starting app');
            const products = ProductCtrl.getProdcuts();

            if (products.length == 0) {
                UIController.hideCard();
            } else {
                UIController.createProductList(products);
            }

            // Load event listeners
            loadEventListeners();
        }
    }
})(ProductController, UIController);

App.init();