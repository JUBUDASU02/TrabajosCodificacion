<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Gestión de Personas</title>
    <link rel="stylesheet" href="/css/estilos.css">
</head>
<body>
    <div class="contenedor-principal">
        <!-- Formulario de Registro -->
        <div id="seccion-formulario" class="seccion activo">
            <div class="encabezado">
                <h1>Sistema de Gestión de Personas</h1>
                <p>Registra tus datos y explora las diferentes acciones</p>
            </div>

            <form id="formulario-persona" class="formulario">
                <div class="campo-formulario">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" class="input-campo">
                    <span class="mensaje-error" id="error-nombre"></span>
                </div>

                <div class="campo-formulario">
                    <label for="apellido">Apellido:</label>
                    <input type="text" id="apellido" name="apellido" class="input-campo">
                    <span class="mensaje-error" id="error-apellido"></span>
                </div>

                <div class="campo-formulario">
                    <label for="fecha-nacimiento">Fecha de Nacimiento:</label>
                    <input type="date" id="fecha-nacimiento" name="fecha-nacimiento" class="input-campo">
                    <span class="mensaje-error" id="error-fecha"></span>
                </div>

                <div class="campo-formulario">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" class="input-campo">
                    <span class="mensaje-error" id="error-email"></span>
                </div>

                <div class="campo-formulario">
                    <label for="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono" class="input-campo">
                    <span class="mensaje-error" id="error-telefono"></span>
                </div>

                <div class="campo-formulario">
                    <label for="genero">Género:</label>
                    <select id="genero" name="genero" class="input-campo">
                        <option value="">Seleccionar...</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                    <span class="mensaje-error" id="error-genero"></span>
                </div>

                <button type="submit" class="boton-principal">Crear Persona</button>
            </form>
        </div>

        <!-- Sección de Información de la Persona -->
        <div id="seccion-informacion" class="seccion">
            <div class="encabezado">
                <h1>Información de la Persona</h1>
            </div>

            <div class="tarjeta-informacion">
                <div class="info-detalle">
                    <strong>Nombre Completo:</strong>
                    <span id="info-nombre-completo"></span>
                </div>
                <div class="info-detalle">
                    <strong>Edad:</strong>
                    <span id="info-edad"></span>
                </div>
                <div class="info-detalle">
                    <strong>Fecha de Nacimiento:</strong>
                    <span id="info-fecha-nacimiento"></span>
                </div>
                <div class="info-detalle">
                    <strong>Email:</strong>
                    <span id="info-email"></span>
                </div>
                <div class="info-detalle">
                    <strong>Teléfono:</strong>
                    <span id="info-telefono"></span>
                </div>
                <div class="info-detalle">
                    <strong>Género:</strong>
                    <span id="info-genero"></span>
                </div>
            </div>

            <div class="menu-acciones">
                <h2>Acciones Disponibles</h2>
                <div class="contenedor-botones">
                    <button class="boton-accion" onclick="ejecutarAccion('reir')">😄 Reír</button>
                    <button class="boton-accion" onclick="ejecutarAccion('comer')">🍽️ Comer</button>
                    <button class="boton-accion" onclick="ejecutarAccion('dormir')">😴 Dormir</button>
                    <button class="boton-accion" onclick="ejecutarAccion('estudiar')">📚 Estudiar</button>
                    <button class="boton-accion" onclick="ejecutarAccion('caminar')">🚶 Caminar</button>
                </div>
                <button class="boton-secundario" onclick="volverFormulario()">Crear Nueva Persona</button>
            </div>
        </div>

        <!-- Modal para mostrar acciones -->
        <div id="modal-accion" class="modal">
            <div class="modal-contenido">
                <div class="modal-encabezado">
                    <h2 id="modal-titulo"></h2>
                    <span class="boton-cerrar" onclick="cerrarModal()">&times;</span>
                </div>
                <div class="modal-cuerpo">
                    <p id="modal-mensaje"></p>
                </div>
                <div class="modal-pie">
                    <button class="boton-principal" onclick="cerrarModal()">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="/js/validaciones.js"></script>

    <?php
        require_once("Persona.php");
        if($_POST)
        {
            $nombre = $_POST['nombre'];
            $apellido = $_POST['apellido'];
            $fecha_nacimiento = $_POST['fecha-nacimiento'];
            $email = $_POST['email'];
            $telefono = $_POST['telefono'];
            $genero = $_POST['genero'];
            $per = new Persona($nombre,$apellido,$fecha_nacimiento,$email,$telefono,$genero); // instanciamiento del objeto, creación del objeto
            //imprimir en pantalla la informacón de la persona creada
            echo "El nombre de la persona ".$per->getNombre();
            echo "<br>";
            echo "El apellido de la persona ".$per->getApellido();
            //$per->setNombre("pepito");
            echo "<br>";
            echo "La fecha de nacimiento: ".$per->getFechaNacimiento();
            echo "<br>";
            echo "La edad de la persona con nombre ".$per->getNombre()." es: " .$per->getEdad();
            echo "<br>";
            echo $per->reir();
            echo $per->dormir();
        }    
    ?>
</body>
</html>