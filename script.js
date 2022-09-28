const productos = [
    {
        id: 1,
        categoria: "Combos PS5",
        nombre: "PlayStation 5 Standart 825gb + 2 Joysticks + Juego físico de regalo",
        precio: 300000,
        img: "./assets/img/ps5-2joy-1juego.jpeg",
        cantidad: 1
    },
    {
        id: 2,
        categoria: "Combos PS5",
        nombre: "PlayStation 5 Digital 825gb + Joystick",
        precio: 280000,
        img: "./assets/img/ps5-1joy.jpg",
        cantidad: 1
    },
    {
        id: 3,
        categoria: "Combos PS5",
        nombre: "PlayStation 5 Digital 825gb",
        precio: 270000,
        img: "./assets/img/ps5-digital.JPG",
        cantidad: 1
    },
    {
        id: 4,
        categoria: "Accesorios",
        nombre: "Joystick DualSense (color a elección)",
        precio: 15000,
        img: "./assets/img/1joy.JPG",
        cantidad: 1
    },
    {
        id: 5,
        categoria: "Accesorios",
        nombre: "2 Joystick DualSense (color a elección)",
        precio: 28000,
        img: "./assets/img/2joy.png",
        cantidad: 1
    },
    {
        id: 6,
        categoria: "Accesorios",
        nombre: "Auriculares PS5 Sony Pulse 3D",
        precio: 60000,
        img: "./assets/img/auris.jpeg",
        cantidad: 1
    }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderizarProductos(){
    
    const tienda = document.getElementById('tienda');  

    productos.forEach((p) => {
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <p>$${p.precio}</p>
                <button class="btn btn-primary" id="${p.id}">Añadir al carrito</button>
            </div>
        </div>
        `

        tienda.appendChild(producto);

        producto.querySelector('button').addEventListener('click', ()=>{
            
            agregarProductosAlCarrito(p.id);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        })
        
    })
};

renderizarProductos();

function agregarProductosAlCarrito(id){
    
    let producto = productos.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if(productoEnCarrito){
        
        productoEnCarrito.cantidad++;

        console.log(carrito);

        alert(`La cantidad del producto ${producto.nombre} fue modificada`);

    }else {
        
        producto.cantidad = 1;

        carrito.push(producto);

        console.log(carrito);

        alert('Producto agregado correctamente al carrito')
    }
    renderizarCarrito();
    calcularTotal();
};

function renderizarCarrito(){

    const d = document;
    let carritoHTML = d.querySelector('#carrito');

    carritoHTML.innerHTML = '';

    carrito.forEach((p, index)=> {
    
        let producto = document.createElement('div');
        producto.classList.add('col-12');
        producto.classList.add('col-md-4');
        producto.classList.add('mb-5');
        producto.classList.add('d-flex');
        producto.classList.add('justify-content-center');

        producto.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p>$${p.precio}</p>
                <p>Cantidad: ${p.cantidad}</p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        </div>
        `

        producto.querySelector('button').addEventListener('click', ()=>{
        
            eliminarProducto(index)
            localStorage.setItem("carrito", JSON.stringify(carrito));
        })

        carritoHTML.appendChild(producto);
    })
};


function eliminarProducto(index){

    carrito[index].cantidad--;
    alert(`La cantidad del producto ${carrito[index].nombre} disminuyo`);

    if(carrito[index].cantidad === 0){

        carrito.splice(index,1);
        alert('El producto fue eliminado del carrito');
    }

    renderizarCarrito();
    calcularTotal()
};

function calcularTotal(){

    let total = 0;

    carrito.forEach((p)=>{
    
        total += p.precio * p.cantidad;
    })

    console.log(total);

    const t = document.getElementById('total');

    t.innerHTML = `<h5>$${total}</h5>`

};

renderizarCarrito();