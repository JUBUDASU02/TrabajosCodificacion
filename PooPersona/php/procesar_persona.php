<?php
/**
 * Archivo para procesar la creación de una persona
 * Recibe datos por POST en formato JSON
 */

// Incluir la clase Persona
require_once 'Persona.php';

// Configurar headers para JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Función para validar y sanitizar datos
function validarDatos($datos) {
    $errores = [];
    
    // Validar nombre
    if (empty($datos['nombre'])) {
        $errores[] = 'El nombre es requerido';
    } elseif (!preg_match("/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/", $datos['nombre'])) {
        $errores[] = 'El nombre solo debe contener letras';
    }
    
    // Validar apellido
    if (empty($datos['apellido'])) {
        $errores[] = 'El apellido es requerido';
    } elseif (!preg_match("/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/", $datos['apellido'])) {
        $errores[] = 'El apellido solo debe contener letras';
    }
    
    // Validar fecha de nacimiento
    if (empty($datos['fechaNacimiento'])) {
        $errores[] = 'La fecha de nacimiento es requerida';
    } else {
        $fechaNac = new DateTime($datos['fechaNacimiento']);
        $fechaActual = new DateTime();
        
        if ($fechaNac > $fechaActual) {
            $errores[] = 'La fecha de nacimiento no puede ser mayor a la fecha actual';
        }
        
        // Calcular edad
        $edad = $fechaActual->diff($fechaNac)->y;
        
        if ($edad < 1) {
            $errores[] = 'La persona debe tener al menos 1 año';
        }
        
        if ($edad > 120) {
            $errores[] = 'La edad no puede ser mayor a 120 años';
        }
    }
    
    // Validar email
    if (empty($datos['email'])) {
        $errores[] = 'El email es requerido';
    } elseif (!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)) {
        $errores[] = 'El email no es válido';
    }
    
    // Validar teléfono
    if (empty($datos['telefono'])) {
        $errores[] = 'El teléfono es requerido';
    } elseif (!preg_match("/^\d{7,15}$/", preg_replace("/[\s\-\(\)]/", "", $datos['telefono']))) {
        $errores[] = 'El teléfono debe contener entre 7 y 15 dígitos';
    }
    
    // Validar género
    if (empty($datos['genero'])) {
        $errores[] = 'El género es requerido';
    } elseif (!in_array($datos['genero'], ['masculino', 'femenino', 'otro'])) {
        $errores[] = 'El género seleccionado no es válido';
    }
    
    return $errores;
}

// Función para sanitizar datos
function sanitizarDatos($datos) {
    return [
        'nombre' => htmlspecialchars(trim($datos['nombre']), ENT_QUOTES, 'UTF-8'),
        'apellido' => htmlspecialchars(trim($datos['apellido']), ENT_QUOTES, 'UTF-8'),
        'fechaNacimiento' => $datos['fechaNacimiento'],
        'email' => filter_var(trim($datos['email']), FILTER_SANITIZE_EMAIL),
        'telefono' => preg_replace("/[^\d]/", "", $datos['telefono']),
        'genero' => htmlspecialchars(trim($datos['genero']), ENT_QUOTES, 'UTF-8')
    ];
}

// Procesar la solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Obtener datos JSON del cuerpo de la solicitud
        $datosJSON = file_get_contents('php://input');
        $datos = json_decode($datosJSON, true);
        
        if (!$datos) {
            throw new Exception('Datos inválidos');
        }
        
        // Validar datos
        $errores = validarDatos($datos);
        
        if (!empty($errores)) {
            echo json_encode([
                'exito' => false,
                'mensaje' => 'Error en la validación de datos',
                'errores' => $errores
            ]);
            exit;
        }
        
        // Sanitizar datos
        $datosSanitizados = sanitizarDatos($datos);
        
        // Crear instancia de Persona
        $persona = new Persona(
            $datosSanitizados['nombre'],
            $datosSanitizados['apellido'],
            $datosSanitizados['fechaNacimiento'],
            $datosSanitizados['email'],
            $datosSanitizados['telefono'],
            $datosSanitizados['genero']
        );
        
        // Guardar en sesión (en un caso real, se guardaría en base de datos)
        session_start();
        $_SESSION['persona'] = serialize($persona);
        
        // Responder con los datos de la persona
        echo json_encode([
            'exito' => true,
            'mensaje' => 'Persona creada exitosamente',
            'persona' => $persona->toArray()
        ]);
        
    } catch (Exception $e) {
        echo json_encode([
            'exito' => false,
            'mensaje' => 'Error al procesar la solicitud: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'exito' => false,
        'mensaje' => 'Método no permitido'
    ]);
}
?>