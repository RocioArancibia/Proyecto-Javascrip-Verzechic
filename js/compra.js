const compra = new Carrito();
const listaCompra = document.querySelector("#lista-compra tbody");
const carrito = document.getElementById('carrito');


//para usarlas cuando termite la pag compra, recordar colocarle los id para vincularlos
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente'); 
const correo = document.getElementById('correo'); 


cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });

}

function procesarCompra() {
    // e.preventDefault();
    if (compra.obtenerProductosLocalStorage().length === 0) { //que no te deje avanzar con el carrito vacio
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno para avanzar con tu compra',
            showConfirmButton: false,
            timer: 2000
        }).then(function () {
            window.location = "../paginas/tienda.html";
        })
    }
    else if (cliente.value === '' || correo.value === '') { //para cuando termine la pagina de la compra (check out)
        Swal.fire({
            type: 'error',
            text: 'Ingrese todos los campos requeridos',
            showConfirmButton: false,
            timer: 2000
        })
    }


    /* obtencion de ip*/
    fetch('https://apisgratis.com/ip/')
.then(res => res.json())
.then(res => console.log(res));
.catch( err => console.error(err));