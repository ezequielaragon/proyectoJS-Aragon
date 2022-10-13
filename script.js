const cargarJson = async() => {
    try {
        const response = await fetch("./stock.json");
        const json = await response.json();

        return json;
    } catch (error) {
        console.log('Error',error);
    }
    cargarJson();
};


let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

 async function renderizarProductos(){
    
    const tienda = document.getElementById('tienda');  
    const productos = await cargarJson();
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

async function agregarProductosAlCarrito(id){
    
    const productos = await cargarJson();

    let producto = productos.find(producto => producto.id === id);

    let productoEnCarrito = carrito.find(producto => producto.id === id);

    if(productoEnCarrito){
        
        productoEnCarrito.cantidad++;

        console.log(carrito);
        Toastify({
            text: `La cantidad del producto "${producto.nombre}" fue modificada`,
            duration: 3000
        }).showToast();

    }else {
        
        producto.cantidad = 1;

        carrito.push(producto);

        console.log(carrito);

        Toastify({
            text: `"${producto.nombre}" agregado correctamente al carrito`,
            duration: 3000
        }).showToast();
    }
    renderizarCarrito();
    calcularTotal();
};

async function renderizarCarrito(){
    
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
    Swal.fire({
        title: '¿Esta seguro?',
        text: `Va a eliminar el producto ${carrito[index].nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito[index].cantidad--;
            if(carrito[index].cantidad === 0){

                carrito.splice(index,1);
                Swal.fire(                
                    'Eliminado!',
                    'El producto ha sido eliminado',
                    'success'
                )
            }else{
                Swal.fire(
                    'Eliminado',
                    'La cantidad del producto disminuyó',
                    'success'
                )
            }
        }
        renderizarCarrito();
        calcularTotal();
    })
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