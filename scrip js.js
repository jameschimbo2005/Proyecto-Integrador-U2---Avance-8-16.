// ==========================================
// ARREGLO DE PRODUCTOS
// ==========================================

let productos = [

    {
        id: 1,
        nombre: "Computadora portátil",
        descripcion: "Equipo portátil para actividades académicas y profesionales.",
        categoria: "Tecnología",
        precio: 850
    },

    {
        id: 2,
        nombre: "Escritorio de oficina",
        descripcion: "Escritorio práctico para trabajar o estudiar.",
        categoria: "Oficina",
        precio: 180
    }

];


// ==========================================
// ELEMENTOS DEL DOM
// ==========================================

const formulario = document.getElementById("formularioProducto");

const nombre = document.getElementById("nombre");

const descripcion = document.getElementById("descripcion");

const categoria = document.getElementById("categoria");

const precio = document.getElementById("precio");

const contenedorProductos =
    document.getElementById("contenedorProductos");

const contador =
    document.getElementById("contador");

const mensajeVacio =
    document.getElementById("mensajeVacio");

const alerta =
    document.getElementById("alerta");

const spinner =
    document.getElementById("spinner");


// ==========================================
// FUNCIÓN PARA MOSTRAR ALERTAS
// ==========================================

function mostrarAlerta(mensaje, tipo) {

    alerta.textContent = mensaje;

    alerta.className = `alert alert-${tipo}`;

    setTimeout(() => {

        alerta.classList.add("d-none");

    }, 3000);

}


// ==========================================
// VALIDACIÓN DEL NOMBRE
// ==========================================

function validarNombre() {

    if (nombre.value.trim().length < 3) {

        nombre.classList.add("is-invalid");

        nombre.classList.remove("is-valid");

        return false;

    }

    nombre.classList.remove("is-invalid");

    nombre.classList.add("is-valid");

    return true;

}


// ==========================================
// VALIDACIÓN DE DESCRIPCIÓN
// ==========================================

function validarDescripcion() {

    if (descripcion.value.trim() === "") {

        descripcion.classList.add("is-invalid");

        descripcion.classList.remove("is-valid");

        return false;

    }

    descripcion.classList.remove("is-invalid");

    descripcion.classList.add("is-valid");

    return true;

}


// ==========================================
// VALIDACIÓN DE CATEGORÍA
// ==========================================

function validarCategoria() {

    if (categoria.value === "") {

        categoria.classList.add("is-invalid");

        categoria.classList.remove("is-valid");

        return false;

    }

    categoria.classList.remove("is-invalid");

    categoria.classList.add("is-valid");

    return true;

}


// ==========================================
// VALIDACIÓN DE PRECIO
// ==========================================

function validarPrecio() {

    if (precio.value === "" || Number(precio.value) <= 0) {

        precio.classList.add("is-invalid");

        precio.classList.remove("is-valid");

        return false;

    }

    precio.classList.remove("is-invalid");

    precio.classList.add("is-valid");

    return true;

}


// ==========================================
// EVENTOS DE VALIDACIÓN DINÁMICA
// ==========================================

nombre.addEventListener("input", validarNombre);

nombre.addEventListener("blur", validarNombre);

descripcion.addEventListener("input", validarDescripcion);

descripcion.addEventListener("blur", validarDescripcion);

categoria.addEventListener("change", validarCategoria);

precio.addEventListener("input", validarPrecio);

precio.addEventListener("blur", validarPrecio);


// ==========================================
// RENDERIZADO DINÁMICO
// ==========================================

function renderizarProductos() {

    contenedorProductos.innerHTML = "";

    contador.textContent = productos.length;


    if (productos.length === 0) {

        mensajeVacio.classList.remove("d-none");

        return;

    }


    mensajeVacio.classList.add("d-none");


    productos.forEach(producto => {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("col-12", "col-md-6");


        tarjeta.innerHTML = `

            <div class="card producto-card shadow-sm h-100">

                <div class="card-body">

                    <h5 class="card-title fw-bold">
                        ${producto.nombre}
                    </h5>

                    <p class="card-text">
                        ${producto.descripcion}
                    </p>

                    <p>
                        <span class="badge bg-primary">
                            ${producto.categoria}
                        </span>
                    </p>

                    <h5 class="text-success">
                        $${producto.precio.toFixed(2)}
                    </h5>

                    <div class="d-grid gap-2 mt-3">

                        <button
                            class="btn btn-outline-primary"
                            onclick="mostrarDetalles(${producto.id})"
                        >
                            👁️ Ver detalles
                        </button>

                        <button
                            class="btn btn-danger"
                            onclick="eliminarProducto(${producto.id})"
                        >
                            🗑️ Eliminar
                        </button>

                    </div>

                </div>

            </div>

        `;


        contenedorProductos.appendChild(tarjeta);

    });

}


// ==========================================
// REGISTRAR PRODUCTO
// ==========================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();


    const nombreValido = validarNombre();

    const descripcionValida = validarDescripcion();

    const categoriaValida = validarCategoria();

    const precioValido = validarPrecio();


    if (
        !nombreValido ||
        !descripcionValida ||
        !categoriaValida ||
        !precioValido
    ) {

        mostrarAlerta(
            "Por favor, complete correctamente todos los campos.",
            "danger"
        );

        return;

    }


    // MOSTRAR SPINNER

    spinner.classList.remove("d-none");


    setTimeout(() => {


        const nuevoProducto = {

            id: Date.now(),

            nombre: nombre.value.trim(),

            descripcion: descripcion.value.trim(),

            categoria: categoria.value,

            precio: Number(precio.value)

        };


        productos.push(nuevoProducto);


        renderizarProductos();


        formulario.reset();


        nombre.classList.remove("is-valid");

        descripcion.classList.remove("is-valid");

        categoria.classList.remove("is-valid");

        precio.classList.remove("is-valid");


        spinner.classList.add("d-none");


        mostrarAlerta(
            "Producto registrado correctamente.",
            "success"
        );


    }, 1000);

});


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

function eliminarProducto(id) {

    const confirmar = confirm(
        "¿Está seguro de eliminar este producto?"
    );


    if (!confirmar) {

        return;

    }


    productos = productos.filter(producto => producto.id !== id);


    renderizarProductos();


    mostrarAlerta(
        "Producto eliminado correctamente.",
        "warning"
    );

}


// ==========================================
// MOSTRAR MODAL
// ==========================================

function mostrarDetalles(id) {

    const producto = productos.find(
        producto => producto.id === id
    );


    const contenidoModal =
        document.getElementById("contenidoModal");


    contenidoModal.innerHTML = `

        <p>
            <strong>Nombre:</strong>
            ${producto.nombre}
        </p>

        <p>
            <strong>Descripción:</strong>
            ${producto.descripcion}
        </p>

        <p>
            <strong>Categoría:</strong>
            ${producto.categoria}
        </p>

        <p>
            <strong>Precio:</strong>
            $${producto.precio.toFixed(2)}
        </p>

    `;


    const modal = new bootstrap.Modal(
        document.getElementById("modalDetalles")
    );


    modal.show();

}


// ==========================================
// BOTÓN LIMPIAR
// ==========================================

document
    .getElementById("btnLimpiar")
    .addEventListener("click", function() {

        nombre.classList.remove("is-valid", "is-invalid");

        descripcion.classList.remove("is-valid", "is-invalid");

        categoria.classList.remove("is-valid", "is-invalid");

        precio.classList.remove("is-valid", "is-invalid");

    });


// ==========================================
// CARGAR PRODUCTOS INICIALMENTE
// ==========================================

renderizarProductos();