const carritoItems = [];
const carritoTotal = [];

class Producto{
    constructor(categoria, nombre, precio){
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
    }
}

const producto1 = new Producto('Combos PS5', 'PlayStation 5 Standart 825gb + 2 Joysticks + Juego físico de regalo', 300000)
const producto2 = new Producto('Combos PS5', 'PlayStation 5 Digital 825gb + Joystick', 280000)
const producto3 = new Producto('Combos PS5', 'PlayStation 5 Digital 825gb', 270000)
const producto4 = new Producto('Accesorios', 'Joystick DualSense (color a elección)', 15000)
const producto5 = new Producto('Accesorios', '2 Joystick DualSense (color a elección)', 28000)
const producto6 = new Producto('Accesorios', 'Auriculares PS5 Sony Pulse 3D', 60000)

function seleccionarConsola(){
    function opcionesConsolas (){
        let combosConsolas = prompt(
            `Elija la opción deseada
            \n 1- ${producto1.nombre}, $${producto1.precio}
            \n 2- ${producto2.nombre}, $${producto2.precio}
            \n 3- ${producto3.nombre}, $${producto3.precio}
            \nPresioná X para salir.`
        )
        return combosConsolas;
    }

    combosConsolas = opcionesConsolas();
    while (combosConsolas != 'X' && combosConsolas != 'x'){
        
        let comboSeleccionado = null;
        
        switch(combosConsolas){
            case '1':
                comboSeleccionado = producto1;
                carritoItems.push(producto1.nombre);
                carritoTotal.push(producto1.precio);
                alert(`Se ha agregado "${producto1.nombre}" a su carrito.`);
                break;
            case '2':
                comboSeleccionado = producto2;
                carritoItems.push(producto2.nombre);
                carritoTotal.push(producto2.precio);
                alert(`Se ha agregado "${producto2.nombre}" a su carrito.`);
                break;
            case '3':
                comboSeleccionado = producto3;
                carritoItems.push(producto3.nombre);
                carritoTotal.push(producto3.precio);
                alert(`Se ha agregado "${producto3.nombre}" a su carrito.`);
                break;
            default:
                alert('Opción inválida')
                break;
        }
        combosConsolas = opcionesConsolas();
    }
}

function seleccionarAccesorios(){
    function opcionesAccesorios(){
        let accesoriosConsola = prompt(
            `Elija la opción deseada
            \n 1- ${producto4.nombre}, $${producto4.precio}
            \n 2- ${producto5.nombre}, $${producto5.precio}
            \n 3- ${producto6.nombre}, $${producto6.precio}
            \nPresioná X para salir.`
        )
        return accesoriosConsola;
    }
    accesoriosConsola = opcionesAccesorios();
    while (accesoriosConsola != 'X' && accesoriosConsola != 'x'){
        
        let comboSeleccionado = null;
        
        switch(accesoriosConsola){
            case '1':
                comboSeleccionado = producto4;
                carritoItems.push(producto4.nombre);
                carritoTotal.push(producto4.precio);
                alert(`Se ha agregado "${producto4.nombre}" a su carrito.`);
                break;
            case '2':
                comboSeleccionado = producto5;
                carritoItems.push(producto5.nombre);
                carritoTotal.push(producto5.precio);
                alert(`Se ha agregado "${producto5.nombre}" a su carrito.`);
                break;
            case '3':
                comboSeleccionado = producto6;
                carritoItems.push(producto6.nombre);
                carritoTotal.push(producto6.precio);
                alert(`Se ha agregado "${producto6.nombre}" a su carrito.`);
                break;
            default:
                alert('Opción inválida')
                break;
        }
        accesoriosConsola = opcionesAccesorios();
    }
}

function seleccionarCarrito(){
    let precioFinal = carritoTotal.reduce(
        (acumulador, elemento) => acumulador + elemento, 0
    );
    function opcionesCarrito(){
        let carrito = prompt(
            `Su carrito tiene acumulado un total de $${precioFinal}
            \nElija una opción.
            \n1- Comprar.
            \n2- Eliminar Carrito.
            \nPresioná X para salir.`
        );
    return carrito;
    }
    carrito = opcionesCarrito();
    while (carrito != "X" && carrito != "x"){
        switch(carrito){
            case '1':
                if (carritoItems == ''){
                    alert('El carrito está vacío');
                    break;
                }else{
                    comprar = alert('El total será de $' + precioFinal)
                    carritoItems.length = 0;
                    carritoTotal.splice(0, carritoTotal.length);
                    precioFinal = 0;
                    break;
                };
            case '2':
                if (carritoItems != "") {
                    carritoItems.length = 0;
                    carritoTotal.splice(0, carritoTotal.length);
                    precioFinal = 0;
                    alert("Carrito vaciado");
                    break;
                }else{
                    alert('El carrito ya está vacío')
                };
                break;
            default:
                alert('Opción inválida');
                break;
        }
        carrito = opcionesCarrito();
    }

}

function opcionesMenu(){
    let opcionesMenu = prompt(
        `¿Qué desea comprar?
        \n1- Consolas PS5.
        \n2- Accesorios PS5.
        \n3- Carrito.
        \nPresione X para salir.`
    );
    return opcionesMenu;
}

let opcion = opcionesMenu();
while (opcion != "X" && opcion != "x") {
    switch(opcion){
        case "1":
            seleccionarConsola();
            break;
        case "2": 
            seleccionarAccesorios();
            break;
        case "3":
            seleccionarCarrito();
            break;
        default:
            alert('Opción inválida');
            break;  
    }
    opcion = opcionesMenu();
}
