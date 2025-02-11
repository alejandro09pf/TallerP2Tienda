document.addEventListener("DOMContentLoaded", function () {
    const carritoIcon = document.getElementById("carrito-icon");
    const carrito = document.getElementById("carrito");
    const listaCarrito = document.getElementById("lista-carrito");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    const formAgregar = document.getElementById("form-agregar");
    const tienda = document.getElementById("tienda");

    let carritoCompras = [];

    // Función para agregar productos al carrito
    function agregarAlCarrito(producto) {
        const nombre = producto.querySelector("h3").textContent;
        const precio = producto.querySelector("p:nth-of-type(4)").textContent;
        const imagenSrc = producto.querySelector("img").src;

        const itemExistente = carritoCompras.find((item) => item.nombre === nombre);

        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carritoCompras.push({ nombre, precio, imagenSrc, cantidad: 1 });
        }

        actualizarCarrito();
    }

    // Función para actualizar el carrito
    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        carritoCompras.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${item.imagenSrc}" width="30">
                ${item.nombre} - ${item.precio} (x${item.cantidad})
            `;
            listaCarrito.appendChild(li);
        });
    }

    // Función para asignar eventos a los botones de "Agregar al carrito"
    function asignarEventosAgregar() {
        const botonesAgregar = document.querySelectorAll(".cart-button");
        botonesAgregar.forEach((boton) => {
            boton.addEventListener("click", function () {
                const producto = boton.closest(".producto");
                agregarAlCarrito(producto);
                boton.classList.add("agregado");
                setTimeout(() => boton.classList.remove("agregado"), 500);
            });
        });
    }

    // Asignar eventos a los botones existentes al cargar la página
    asignarEventosAgregar();

    // Función para agregar un nuevo producto a la tienda
    formAgregar.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const precio = parseFloat(document.getElementById("precio").value); // Convertir a número
        const imagen = document.getElementById("imagen").value;
        const atributo1 = document.getElementById("atributo1").value;
        const atributo2 = document.getElementById("atributo2").value;
        const atributo3 = document.getElementById("atributo3").value;

        // Validar que el precio sea mayor o igual a 1.000
        if (precio < 1000) {
            alert("El precio del artículo debe ser mayor o igual a 1.000.");
            return; // Detener la ejecución si el precio es menor a 1.000
        }

        // Crear el nuevo producto
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList.add("producto");
        nuevoProducto.innerHTML = `
            <img src="${imagen}" alt="${nombre}">
            <h3>${nombre}</h3>
            <p>Género: ${atributo1}</p>
            <p>Plataforma: ${atributo2}</p>
            <p>Clasificación: ${atributo3}</p>
            <p>Precio: $${precio.toLocaleString()}</p> <!-- Formatear el precio -->
            <button class="cart-button">
                <div class="glass-effect"></div>
                <span class="button-text">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 80 9" height="19" width="170">
                        <path fill="currentColor" d="M2.976 6.956V4.916H0.804V3.716H2.976V1.412H4.2V3.716H6.384V4.916H4.2V6.956H2.976ZM10.3177 8.144V2.6H11.4097V1.52H12.4897V0.427999H13.7137V1.52H14.7937V2.6H15.8977V8.144H14.6737V5.972H11.5297V8.144H10.3177ZM11.5297 4.76H14.6737V2.72H13.5937V1.64H12.6097V2.72H11.5297V4.76ZM18.4409 8.144V7.064H17.3489V3.692H18.4409V2.6H21.7169V0.427999H22.9289V7.064H21.8249V8.144H18.4409ZM18.5609 6.944H21.7049V3.8H18.5609V6.944ZM25.2378 8.144V7.064H24.1458V3.692H25.2378V2.6H28.5138V0.427999H29.7258V7.064H28.6218V8.144H25.2378ZM25.3578 6.944H28.5018V3.8H25.3578V6.944ZM35.7514 8.144V7.064H34.6714V3.8H33.5794V2.6H34.6714V0.427999H35.8714V2.6H39.1594V3.8H35.8714V6.944H39.0394V5.852H40.2514V7.064H39.1594V8.144H35.7514ZM42.4292 8.144V7.064H41.3372V3.692H42.4292V2.6H45.8132V3.692H46.9172V7.064H45.8132V8.144H42.4292ZM42.5492 6.944H45.6932V3.8H42.5492V6.944ZM51.8628 8.144V7.064H50.7708V3.692H51.8628V2.6H55.2468V3.692H56.3508V4.88H55.1268V3.8H51.9828V6.944H55.1268V5.852H56.3508V7.064H55.2468V8.144H51.8628ZM58.5308 8.144V7.064H57.4388V3.692H58.5308V2.6H61.9148V3.692H63.0188V6.944H64.1108V8.144H62.8988V7.064H61.9148V8.144H58.5308ZM58.6508 6.944H61.7948V3.8H58.6508V6.944ZM65.5598 8.144V3.692H66.6518V2.6H70.0358V3.692H71.1398V4.88H69.9158V3.8H66.7718V8.144H65.5598ZM74.7631 8.144V7.064H73.6831V3.8H72.5911V2.6H73.6831V0.427999H74.8831V2.6H78.1711V3.8H74.8831V6.944H78.0511V5.852H79.2631V7.064H78.1711V8.144H74.7631Z"></path>
                    </svg>
                </span>
            </button>
        `;

        // Agregar el nuevo producto a la tienda
        tienda.appendChild(nuevoProducto);

        // Asignar evento al botón del nuevo producto
        asignarEventosAgregar();

        // Limpiar el formulario
        formAgregar.reset();
    });

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", function () {
        carritoCompras = [];
        actualizarCarrito();
    });
});