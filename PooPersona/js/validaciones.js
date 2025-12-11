// validaciones.js - Sistema de validaciones con SweetAlert2

// =============================================
// FUNCIONES DE VALIDACIÓN
// =============================================

function validarFormulario(event) {
    event.preventDefault();
    
    const campos = [
        { nombre: 'nombre', tipo: 'texto' },
        { nombre: 'apellido', tipo: 'texto' },
        { nombre: 'fechaNacimiento', tipo: 'fecha' },
        { nombre: 'email', tipo: 'email' },
        { nombre: 'telefono', tipo: 'telefono' },
        { nombre: 'genero', tipo: 'select' }
    ];

    let errores = [];
    let esValido = true;

    // Validar todos los campos
    campos.forEach(campo => {
        const input = document.getElementsByName(campo.nombre)[0];
        const resultado = validarCampo(input, campo.nombre);
        if (!resultado.esValido) {
            errores.push(resultado.mensaje);
            esValido = false;
        }
    });

    if (!esValido) {
        // Mostrar alerta con todos los errores
        mostrarErroresSweetAlert(errores);
        return false;
    } else {
        // Si todo está válido, enviar el formulario
        Swal.fire({
            title: '¡Perfecto!',
            text: 'Todos los datos son válidos. Creando persona...',
            icon: 'success',
            confirmButtonText: 'Continuar',
            timer: 2000,
            timerProgressBar: true
        }).then(() => {
            document.getElementById('formPersona').submit();
        });
        return true;
    }
}

function validarCampo(input, tipo) {
    const valor = input.value.trim();
    let esValido = true;
    let mensaje = '';

    switch(tipo) {
        case 'nombre':
        case 'apellido':
            if (valor === '') {
                esValido = false;
                mensaje = `El ${tipo} es obligatorio`;
            } else if (valor.length < 2) {
                esValido = false;
                mensaje = `El ${tipo} debe tener al menos 2 caracteres`;
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
                esValido = false;
                mensaje = `El ${tipo} solo puede contener letras y espacios`;
            } else if (valor.length > 50) {
                esValido = false;
                mensaje = `El ${tipo} no puede exceder 50 caracteres`;
            }
            break;

        case 'fechaNacimiento':
            if (valor === '') {
                esValido = false;
                mensaje = 'La fecha de nacimiento es obligatoria';
            } else {
                const fechaNacimiento = new Date(valor);
                const fechaActual = new Date();
                const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

                if (fechaNacimiento > fechaActual) {
                    esValido = false;
                    mensaje = 'La fecha de nacimiento no puede ser futura';
                } else if (edad < 1) {
                    esValido = false;
                    mensaje = 'La persona debe tener al menos 1 año';
                } else if (edad > 120) {
                    esValido = false;
                    mensaje = 'La edad no puede ser mayor a 120 años';
                }
            }
            break;

        case 'email':
            if (valor === '') {
                esValido = false;
                mensaje = 'El email es obligatorio';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                esValido = false;
                mensaje = 'Formato de email inválido (ejemplo: usuario@dominio.com)';
            } else if (valor.length > 100) {
                esValido = false;
                mensaje = 'El email no puede exceder 100 caracteres';
            }
            break;

        case 'telefono':
            if (valor === '') {
                esValido = false;
                mensaje = 'El teléfono es obligatorio';
            } else {
                const soloNumeros = valor.replace(/\D/g, '');
                if (soloNumeros.length < 10) {
                    esValido = false;
                    mensaje = 'El teléfono debe tener al menos 10 dígitos';
                } else if (soloNumeros.length > 15) {
                    esValido = false;
                    mensaje = 'El teléfono no puede exceder 15 dígitos';
                }
            }
            break;

        case 'genero':
            if (valor === '') {
                esValido = false;
                mensaje = 'Debe seleccionar un género';
            }
            break;
    }

    // Actualizar interfaz
    const errorElement = document.getElementById(`error${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`);
    if (errorElement) {
        if (!esValido) {
            errorElement.textContent = mensaje;
            errorElement.style.display = 'block';
            input.classList.add('input-error');
            input.classList.remove('input-success');
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            input.classList.remove('input-error');
            input.classList.add('input-success');
        }
    }

    return { esValido, mensaje };
}

function mostrarErroresSweetAlert(errores) {
    const listaErrores = errores.map(error => `• ${error}`).join('<br>');
    
    Swal.fire({
        title: 'Errores en el Formulario',
        html: `<div style="text-align: left;">
                <p style="color: #dc2626; font-weight: 600; margin-bottom: 15px;">
                     Por favor corrige los siguientes errores:
                </p>
                <div style="background: #fef2f2; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #dc2626;">
                    ${listaErrores}
                </div>
              </div>`,
        icon: 'error',
        iconColor: '#dc2626',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#dc2626',
        width: '600px',
        background: '#fff',
        customClass: {
            popup: 'sweet-alert-error'
        }
    });
}

// =============================================
// INICIALIZACIÓN
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Sistema de validaciones cargado correctamente');
});

// =============================================
// FUNCIONES DE ELIMINACIÓN CON SweetAlert2
// =============================================

function confirmarEliminacion(index, nombrePersona) {
    Swal.fire({
        title: 'Eliminar Persona',
        html: `
            <div style="text-align: center;">
                <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #dc2626; margin-bottom: 20px;"></i>
                <p style="font-size: 1.1rem; margin-bottom: 10px; color: #dc2626; font-weight: 600;">
                    ¿Estás seguro de eliminar a <strong>${nombrePersona}</strong>?
                </p>
                <p style="color: #666; font-size: 0.9rem;">
                     Esta acción no se puede deshacer.
                </p>
            </div>
        `,
        icon: 'warning',
        iconColor: '#dc2626',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6c757d',
        reverseButtons: true,
        width: '500px',
        background: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Eliminado',
                text: `${nombrePersona} ha sido eliminado correctamente.`,
                icon: 'success',
                confirmButtonText: 'Continuar',
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: '#16a34a'
            }).then(() => {
                window.location.href = `?eliminar=${index}`;
            });
        }
    });
}

function confirmarEliminacionTotal() {
    Swal.fire({
        title: 'Restablecer Todo',
        html: `
            <div style="text-align: center;">
                <i class="fas fa-trash-alt" style="font-size: 4rem; color: #dc2626; margin-bottom: 20px;"></i>
                <p style="font-size: 1.1rem; margin-bottom: 10px; color: #dc2626; font-weight: 600;">
                    ¿Estás seguro de eliminar <strong>TODAS las personas</strong>?
                </p>
                <p style="color: #666; font-size: 0.9rem;">
                     Se restaurarán los datos por defecto (Jair, Maria, Hector).
                </p>
            </div>
        `,
        icon: 'warning',
        iconColor: '#dc2626',
        showCancelButton: true,
        confirmButtonText: 'Sí, restablecer',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6c757d',
        reverseButtons: true,
        width: '500px',
        background: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Restablecido',
                text: 'Todos los datos han sido restablecidos a los valores por defecto.',
                icon: 'success',
                confirmButtonText: 'Continuar',
                timer: 2000,
                timerProgressBar: true,
                confirmButtonColor: '#16a34a'
            }).then(() => {
                window.location.href = '?eliminar=todos';
            });
        }
    });
}

// =============================================
// ALERTAS DE ÉXITO DESPUÉS DE ELIMINACIÓN
// =============================================

// Mostrar alerta si se acaba de eliminar una persona
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay parámetros de eliminación en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const eliminarParam = urlParams.get('eliminar');
    
    if (eliminarParam && eliminarParam !== 'todos') {
        // Eliminación individual ya fue procesada por PHP
        setTimeout(() => {
            Swal.fire({
                title: 'Eliminado',
                text: 'La persona ha sido eliminada correctamente.',
                icon: 'success',
                confirmButtonText: 'Continuar',
                timer: 3000,
                timerProgressBar: true
            });
        }, 500);
    }
    
    if (eliminarParam === 'todos') {
        // Eliminación total ya fue procesada por PHP
        setTimeout(() => {
            Swal.fire({
                title: '🔄 Restablecido',
                text: 'Todos los datos han sido restablecidos correctamente.',
                icon: 'success',
                confirmButtonText: 'Continuar',
                timer: 3000,
                timerProgressBar: true
            });
        }, 500);
    }
});<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once 'persona.php';