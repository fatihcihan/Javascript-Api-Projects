// Storage Controller
const StorageController = (function () {

    return {
        storeProduct: function (product) {
            let products;
            if (localStorage.getItem('products') === null) {
                products = [];
                products.push(product);
            } else {
                products = JSON.parse(localStorage.getItem('products'));
                products.push(product);
            }
            localStorage.setItem('products', JSON.stringify(products));
        },
        getProducts: function () {
            let products;
            if (localStorage.getItem('products') === null) {
                products = [];
            } else {
                products = JSON.parse(localStorage.getItem('products'));
            }
            return products;
        },
        updateProduct: function (product) {
            let products = JSON.parse(localStorage.getItem('products'));
            products.forEach(function (prd, index) {
                if (product.id == prd.id) {
                    products.splice(index, 1, product);
                }
            });
            localStorage.setItem('products', JSON.stringify(products));
        },
        deleteProduct: function (id) {
            let products = JSON.parse(localStorage.getItem('products'));
            products.forEach(function (prd, index) {
                if (id == prd.id) {
                    products.splice(index, 1);
                }
            });
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

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
        products: StorageController.getProducts(),
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
        setCurrentProduct: function (product) {
            data.selectedProduct = product;
        },
        getCurrentProduct: function () {
            return data.selectedProduct;
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
        updateProduct: function (name, price) {
            let product = null;
            data.products.forEach(function (prd) {
                if (prd.id == data.selectedProduct.id) {
                    prd.name = name;
                    prd.price = parseFloat(price);
                    product = prd;
                }
            });
            return product
        },
        deleteProduct: function (product) {
            data.products.forEach(function (prd, index) {
                if (prd.id == product.id) {
                    data.products.splice(index, 1);
                }
            });
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
        productListItems: "#item-list tr",
        addButton: ".addBtn",
        updateButton: ".updateBtn",
        deleteButton: ".deleteBtn",
        cancelButton: ".cancelBtn",
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
        updateProduct: function (prd) {
            let updatedItem = null
            let items = document.querySelectorAll(Selectors.productListItems);
            console.log(items, 'items')
            items.forEach(function (item) {
                if (item.classList.contains('bg-warning')) {
                    item.children[1].textContent = prd.name;
                    item.children[2].textContent = prd.price + ' $';
                    updatedItem = item;
                }
            });

            return updatedItem;
        },
        deleteProduct: function (product) {
            data.products.forEach(function (prd, index) {
                if (prd.id == product.id) {
                    data.products.splice(index, 1);
                }
            });
        },
        clearInputs: function () {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },
        clearWarnings: function () {
            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function (item) {
                if (item.classList.contains('bg-warning')) {
                    item.classList.remove('bg-warning')
                }
            })
        },
        hideCard: function () {
            document.querySelector(Selectors.productCard).style.display = 'none';
        },
        showTotal: function (total) {
            document.querySelector(Selectors.totalUsd).textContent = total;
            document.querySelector(Selectors.totalTl).textContent = total * 20;
        },
        addProductToForm: function () {
            const selectedProduct = ProductController.getCurrentProduct();
            document.querySelector(Selectors.productName).value = selectedProduct.name;
            document.querySelector(Selectors.productPrice).value = selectedProduct.price;
        },
        deleteProduct: function () {
            let items = document.querySelectorAll(Selectors.productListItems);
            items.forEach(function (item) {
                if (item.classList.contains('bg-warning')) {
                    item.remove();
                }
            })
        },
        addingState: function (item) {
            UIController.clearWarnings();
            if (item) {
                item.classList.remove('bg-warning');
            }
            UIController.clearInputs();
            document.querySelector(Selectors.addButton).style.display = 'inline';
            document.querySelector(Selectors.updateButton).style.display = 'none';
            document.querySelector(Selectors.deleteButton).style.display = 'none';
            document.querySelector(Selectors.cancelButton).style.display = 'none';
        },
        editState: function (tr) {
            tr.classList.add('bg-warning');
            document.querySelector(Selectors.addButton).style.display = 'none';
            document.querySelector(Selectors.updateButton).style.display = 'inline';
            document.querySelector(Selectors.deleteButton).style.display = 'inline';
            document.querySelector(Selectors.cancelButton).style.display = 'inline';
        }
    }
})();





// App Controller
const App = (function (ProductCtrl, UICtrl, StorageCtrl) {

    const UiSelectors = UICtrl.getSelectors();

    // Load event listeners
    const loadEventListeners = function () {
        // add product event
        document.querySelector(UiSelectors.addButton).addEventListener('click', productAddSubmit);
        // edit product click
        document.querySelector(UiSelectors.productList).addEventListener('click', productEditClick);
        // edit product subtmit
        document.querySelector(UiSelectors.updateButton).addEventListener('click', editProductSubmit);
        // cancel button click
        document.querySelector(UiSelectors.cancelButton).addEventListener('click', cancelUpdate);

        document.querySelector(UiSelectors.deleteButton).addEventListener('click', deleteProductSubmit);
    }

    const productAddSubmit = function (event) {
        const productName = document.querySelector(UiSelectors.productName).value;
        const productPrice = document.querySelector(UiSelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            // add product
            const newProduct = ProductController.addProduct(productName, parseFloat(productPrice));
            UICtrl.addProduct(newProduct);

            // add product to local storage
            StorageCtrl.storeProduct(newProduct);


            // get total
            const total = ProductController.getTotal();
            console.log(total);

            // show total
            UICtrl.showTotal(total);

            // clear inputs
            UICtrl.clearInputs();
        }

        event.preventDefault();
    }

    const productEditClick = function (event) {
        if (event.target.classList.contains('edit-product')) {

            const productId = event.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

            // get selected product
            const product = ProductController.getProductById(productId);
            console.log(product);

            // set current product
            ProductController.setCurrentProduct(product);

            UICtrl.clearWarnings();
            // add product to UI
            UICtrl.addProductToForm();

            UICtrl.editState(event.target.parentNode.parentNode);

        }
        event.preventDefault();
    }

    const editProductSubmit = function (event) {
        const productName = document.querySelector(UiSelectors.productName).value;
        const productPrice = document.querySelector(UiSelectors.productPrice).value;
        if (productName !== '' && productPrice !== '') {
            // update product
            const updatedProduct = ProductCtrl.updateProduct(productName, productPrice);
            // update ui
            let item = UIController.updateProduct(updatedProduct);
            // get total
            const total = ProductCtrl.getTotal();
            // show total
            UIController.showTotal(total);
            // update storage
            StorageController.updateProduct(updatedProduct);
            UIController.addingState();
        }
        event.preventDefault();
    }

    const cancelUpdate = function (event) {
        UIController.addingState();
        UIController.clearWarnings();
        event.preventDefault();
    }

    const deleteProductSubmit = function (event) {
        // get selected product
        const selectedProduct = ProductCtrl.getCurrentProduct();
        // delete product
        ProductCtrl.deleteProduct(selectedProduct);
        // delete ui
        UIController.deleteProduct(selectedProduct);
        // get total
        const total = ProductCtrl.getTotal();
        // show total
        UIController.showTotal(total);

        // delete from storage
        StorageCtrl.deleteProduct(selectedProduct.id);

        UIController.addingState();
        if (total == 0) {
            UIController.hideCard();
        }

        event.preventDefault();
    }
    return {
        init: function () {
            UICtrl.addingState();
            const products = ProductCtrl.getProdcuts();
            if (products.length == 0) {
                UICtrl.hideCard();
            } else {
                UICtrl.createProductList(products);
            }

            // Load event listeners
            loadEventListeners();
        }
    }
})(ProductController, UIController, StorageController);

App.init();