// prueba para ver si puedo hacer 3 pestañas xD
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    // Usuarios de PRUEBA (puedes cambiar contraseñas y destinos)
    const usuarios = [
      { email: "admin",    password: "1234", rol: "admin",    redirect: "venta.html" },
      { email: "empl", password: "1234", rol: "empleado", redirect: "empleado.html" },
      { email: "cli",  password: "1234", rol: "cliente",  redirect: "cliente.html" }
    ];

    const user = usuarios.find(u => u.email === email && u.password === password);

    if (user) {
      // Guarda datos básicos de sesión (por si luego quieres mostrar nombre/rol)
      sessionStorage.setItem("userEmail", email);
      sessionStorage.setItem("userRol", user.rol);

      // Redirige según rol
      window.location.href = user.redirect;
    } else {
      alert("Correo o contraseña incorrectos");
    }
  });
});

// Base de datos de productos (array)
let productos = [
  { id: 1, nombre: "Whisky", precio: 120000, stock: 10, imagen: "assets/producto1.jpg" },
  { id: 2, nombre: "Vodka", precio: 90000, stock: 15, imagen: "assets/producto2.jpg" },
  { id: 3, nombre: "Cerveza", precio: 12000, stock: 50, imagen: "assets/producto3.jpg" }
];

// Función para renderizar productos en ventas
function renderProductosVentas() {
  const contenedor = document.getElementById("productosVenta");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="col-md-4">
        <div class="card producto-card text-center" data-nombre="${p.nombre}">
          <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">$${p.precio.toLocaleString()}</p>
            <p class="text-muted">Stock: ${p.stock}</p>
            <button class="btn btn-outline-light btn-sm" onclick="agregarProducto('${p.nombre}', ${p.precio})">Añadir</button>
          </div>
        </div>
      </div>
    `;
  });
}

// Función para renderizar productos en gestión
function renderProductosGestion() {
  const tabla = document.getElementById("tablaProductos");
  if (!tabla) return;

  tabla.innerHTML = "";
  productos.forEach((p, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td><input type="text" value="${p.nombre}" class="form-control" onchange="editarProducto(${index}, 'nombre', this.value)"></td>
        <td><input type="number" value="${p.precio}" class="form-control" onchange="editarProducto(${index}, 'precio', this.value)"></td>
        <td><input type="number" value="${p.stock}" class="form-control" onchange="editarProducto(${index}, 'stock', this.value)"></td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// Función para editar producto
function editarProducto(index, campo, valor) {
  productos[index][campo] = (campo === "precio" || campo === "stock") ? parseInt(valor) : valor;
  renderProductosVentas();
  renderProductosGestion();
}

// Función para eliminar producto
function eliminarProducto(index) {
  productos.splice(index, 1);
  renderProductosVentas();
  renderProductosGestion();
}

// Función para añadir nuevo producto
function agregarNuevoProducto() {
  const nombre = document.getElementById("nuevoNombre").value;
  const precio = parseInt(document.getElementById("nuevoPrecio").value);
  const stock = parseInt(document.getElementById("nuevoStock").value);
  const imagen = document.getElementById("nuevoImagen").value || "assets/default.jpg";

  if (nombre && precio && stock) {
    productos.push({
      id: productos.length ? productos[productos.length - 1].id + 1 : 1,
      nombre, precio, stock, imagen
    });
    renderProductosVentas();
    renderProductosGestion();
    document.getElementById("formNuevoProducto").reset();
  }
}

