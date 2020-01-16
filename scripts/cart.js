'use strict';


let cart = {

    products: [],

    run() {
        this.addButtonListener();
    },

    render() {

        let table = document.querySelector('.drop_cart__menu');
        table.innerHTML = `<li class="drop_cart__menu_list_last">
        <p class="drop_cart_total__p"><span>TOTAL</span><span>${cart.sum()}$
        </span></p>
        <a class="drop_cart__button" href="checkout.html">Checkout</a>
        <a class="drop_cart__button" href="shopping_cart.html">Go to cart</a>
        </li>`;


        this.products.forEach(elem => {
            let row = `
            <li class="drop_cart__menu_list">
            <a class="drop_cart__menu_link" href="single_page.html">
                <img class="small_img" src="${elem.img}" alt="image" title="id: ${elem.id}">
                <div class="drop_cart__text">
                    <h3 class="drop_cart__h3">${elem.name}</h3>
                    <div class="rating" title="Item rating: ${elem.rating}">
                    ${cart.ratingRender(elem.rating)}
                    </div>

                    <p class="drop_cart__p">${elem.count} x ${elem.price}$</p>
                </div>
                </a>
                <i class="fas fa-times-circle"><span class="hidden_id">${elem.id}</span></i>
                
            
        </li>
            `
            table.insertAdjacentHTML("afterbegin", row);
        });
    },

    ratingRender(rating) {

        Number(rating);
        let integer = Math.floor(rating);
        let decimal = rating % 1;
        let emptyStars = Math.round(4.99 - integer - decimal);

        let str = '';

        for (let i = 0; i < integer; i++) {
            str += '<i class="fas fa-star"></i>';
        }

        if (decimal >= 0.5) {
            str += '<i class="fas fa-star-half-alt"></i>'
        }

        
        for (let i = 0; i < emptyStars; i++) {
            str += '<i class="far fa-star"></i>';
        }

        return str;
    },


    sum() {

        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },


    addButtonListener() {

        let addButton = document.querySelectorAll('.toBasketBtn');


        addButton.forEach(elem => { //если убрать elem, то на клик будут срабатывать все кнопки

            elem.addEventListener('click', function () {

                let id = elem.dataset.id;

                let product = {
                    id: id,
                    price: elem.dataset.price,
                    name: elem.dataset.name,
                    rating: elem.dataset.rating,
                    img: elem.dataset.img,
                    count: 1,
                };

                cart.add(id, product);

            });
        });
    },

    addRemoveListener() {

        let deleteButton = document.querySelectorAll('.fa-times-circle');


        deleteButton.forEach(elem => { //если убрать elem, то на клик будут срабатывать все кнопки

            elem.addEventListener('click', function () {

                let id = Number(this.textContent);
                cart.remove(id);
            });
        });

    },

    add(id, product) {
        if (this.products[id] !== undefined) {
            this.products[id].count++;
        } else {
            this.products[id] = product;
        }
        this.sum();
        this.render();
        this.addRemoveListener();

    },


    remove(id) {
        if (cart.products[id].count == 1) {
            delete cart.products[id];
            this.render();
            this.insertEmpty();

        } else {
            this.products[id].count--;
            this.render();
        }

        this.addRemoveListener();
    },


    insertEmpty() {
        let menu = document.querySelector('.drop_cart__menu').children;
        if (menu.length == 1) {
            menu[0].insertAdjacentHTML("afterbegin", `<li class="empty">Empty</li>`);
        }
    },
}


cart.run();

