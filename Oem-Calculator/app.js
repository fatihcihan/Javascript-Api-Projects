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
        getProductById: function (productId) {
            let product = null;

            data.products.forEach(function (prd) {
                if (prd.id == productId) {
                    product = prd;
                }
            })

            return product;
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
        },
        getTotal: function () {
            let total = 0;

            data.products.forEach(function (product) {
                total += product.price;
            })

            data.totalPrice = total;
            return data.totalPrice;
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
        productCard: '#productCard',
        totalTl: '#total-tl',
        totalUsd: '#total-usd'
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
                        <i class="far fa-edit edit-product"></i>                       
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
                        <i class="far fa-edit edit-product"></i>  
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
        },
        showTotal: function (total) {
            document.querySelector(Selectors.totalUsd).textContent = total;
            document.querySelector(Selectors.totalTl).textContent = total * 20;

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
        // edit product event
        document.querySelector(UiSelectorors.productList).addEventListener('click', productEditSubmit)
    }

    const productAddSubmit = function (event) {
        const productName = document.querySelector(UiSelectorors.productName).value;
        const productPrice = document.querySelector(UiSelectorors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            // add product
            const newProduct = ProductController.addProduct(productName, parseFloat(productPrice));
            UIController.addProduct(newProduct);

            // get total
            const total = ProductController.getTotal();
            console.log(total);

            // show total
            UIController.showTotal(total);

            // clear inputs
            UIController.clearInputs();
        }

        event.preventDefault();
    }

    const productEditSubmit = function (event) {
        if (event.target.classList.contains('edit-product')) {

            const productId = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

            // get selected product
            const product = ProductController.getProductById(productId);
            console.log(product);

        }
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