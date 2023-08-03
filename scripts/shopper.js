let products = [
{
    id: '1',
    image:'images/products/backpack.jpg',
    name: 'Backpack',
    rating: 4.5,
    price: 1010
},
{
    id: '2',
    image:'images/products/bathroom-rug.jpg',
    name: 'Bathroom rug',
    rating: 5,
    price: 11000
},
{
    id: '3',
    image:'images/products/men-athletic-shoes-green.jpg',
    name: 'Men athletic shoes',
    rating: 3,
    price: 101000
},
{
    id: '4',
    image:'images/products/round-sunglasses-black.jpg',
    name: 'Sunglasses',
    rating: 2,
    price: 1000
},
{
    id: '5',
    image:'images/products/kitchen-paper-towels-30-pack.jpg',
    name: 'Kitchen paper towel',
    rating: 4.5,
    price: 1500
},
{
    id: '6',
    image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Cotton shirt',
    rating: 3,
    price: 101000
},
{
    id: '7',
    image:'images/products/dinner-set.jpg',
    name: 'Dinner set',
    rating: 2,
    price: 10450
},
{
    id: '8',
    image:'images/products/baking-set.webp',
    name: 'Baking set',
    rating: 4.5,
    price: 150000
}
];

let productsHTML = ``;
products.forEach((product) => {
    productsHTML = productsHTML + 
    `<div class="col-md-4 col-lg-3 mt-3 js-product-${product.id}"">
    <div class="card" style="height:30em">
        <img class="card-img-top" 
        src="${product.image}" alt="Card image cap" style="height:17em">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">₹ ${(product.price/100).toFixed(2)}</p>
            <div class="py-2">
                <img class="product-rating-stars" src="images/ratings/rating-${product.rating*10}.png" style="width:5em">
            </div>
            <button class="add-to-cart btn btn-primary m-3"
            data-product-id="${product.id}">
            Add to cart
            </button>
        </div>
    </div>
</div>
`;
});

if(document.querySelector('.js-products')!=null)
    document.querySelector('.js-products').innerHTML=productsHTML;

let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
    cart = [{
            prodId: '5',
            quantity: 1
        },
        {
            prodId: '4',
            quantity: 2
        }];
}


function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

updateCartQuantity();

function updateCartQuantity(){    
    let cartQuantity = 0;
    let total = 0;
    cart.forEach((item) =>{
        cartQuantity += item.quantity;
        products.forEach((product) =>{        
            if(product.id === item.prodId){                
                total += item.quantity*product.price;
            }
        });
    });
    if(document.getElementById("item-total")!=null)
        document.getElementById("item-total").innerHTML=`₹ ${(total/100).toFixed(2)}`
    
    if(document.getElementById("tax")!=null)
        document.getElementById("tax").innerHTML=`₹ ${(total/1000).toFixed(2)}`
        
    if(document.getElementById("order-total")!=null)
        document.getElementById("order-total").innerHTML=`₹ ${(total/100+total/1000).toFixed(2)}`


    document.querySelector(".cart-count")
    .innerHTML=cartQuantity;

}

function addToCart(productId){
    let matchedProduct;

        cart.forEach((product) =>{
            if(product.prodId === productId){
                matchedProduct=product;
            }
        })
        if(matchedProduct){
            matchedProduct.quantity += 1;
        }
        else{
            cart.push({
                prodId: productId,
                quantity: 1
            });
        }

        saveToStorage();
        updateCartQuantity();
}

document.querySelectorAll('.add-to-cart')
.forEach((button) =>{
    button.addEventListener('click', () =>{
        const productId = button.dataset.productId;        
        addToCart(productId); 
        displayCart();       
    });
});

function deleteFromCart(productId){
    const newCart = [];
    cart.forEach((product) =>{
        if(product.prodId !== productId){
            newCart.push(product);
        }
    });

    cart=newCart; 
    
    saveToStorage();
    updateCartQuantity();
}

displayCart();

function displayCart(){
    let cartsHTML = ``;
    let total = 0;
    cart.forEach((item) => {      
        products.forEach((product) =>{        
            if(product.id === item.prodId){
                cartsHTML = cartsHTML + 
                `<div class="col-md-4 col-lg-3 mt-3 js-item-${product.id}">
                <div class="card" style="height:22em;">
                    <img class="card-img-top" 
                    src="${product.image}" alt="Card image cap" style="height:10em;">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">₹ ${(product.price/100).toFixed(2)}<br>
                        Quantity: ${(item.quantity)}</p>
                        <button class="delete-item btn btn-primary m-3"
                        data-product-id="${product.id}">
                        Delete
                        </button>
                    </div>
                </div>
            </div>
            `;
            total += item.quantity*product.price;
            }
        });
    });
    if(document.querySelector('.js-cart-products')!=null)
        document.querySelector('.js-cart-products').innerHTML=cartsHTML;

    if(document.getElementById("item-total")!=null)
        document.getElementById("item-total").innerHTML=`₹ ${(total/100).toFixed(2)}`
    
    if(document.getElementById("tax")!=null)
        document.getElementById("tax").innerHTML=`₹ ${(total/1000).toFixed(2)}`
        
    if(document.getElementById("order-total")!=null)
        document.getElementById("order-total").innerHTML=`₹ ${(total/100+total/1000).toFixed(2)}`

}

document.querySelectorAll('.delete-item').forEach((button) =>{
    button.addEventListener('click', () =>{
        const productId = button.dataset.productId;        
        deleteFromCart(productId);
        console.log(cart);
        const itemContainer = document.querySelector(`.js-item-${productId}`);
        itemContainer.remove();        
    });
});

