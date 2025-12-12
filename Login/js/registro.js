// Manejo del formulario de registro
document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    
    if (registroForm) {
        registroForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Resetear mensajes de error
            resetErrorMessages();
            
            // Validar todos los campos
            let isValid = validateForm();
            
            if (isValid) {
                // Simular envío de formulario
                const submitButton = registroForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Registrando...';
                submitButton.disabled = true;
                
                // Simular una llamada a la API
                setTimeout(() => {
                    // Aquí iría la lógica real de registro
                    const formData = {
                        nombre: document.getElementById('nombre').value,
                        apellido: document.getElementById('apellido').value,
                        documento: document.getElementById('documento').value,
                        usuario: document.getElementById('usuario').value,
                        email: document.getElementById('email').value,
                        telefono: document.getElementById('telefono').value,
                        password: document.getElementById('password').value,
                        terminos: document.getElementById('terminos').checked
                    };
                    
                    console.log('Datos del formulario:', formData);
                    
                    // Mostrar mensaje de éxito
                    alert('¡Registro exitoso! Serás redirigido a la página de inicio de sesión.');
                    
                    // En un caso real, redirigiríamos al usuario
                    // window.location.href = 'index.html';
                    
                    // Restaurar el botón
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Función para resetear mensajes de error
    function resetErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.style.display = 'none';
            element.textContent = '';
        });
    }
    
    // Función para mostrar error
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Función para validar el formulario
    function validateForm() {
        let isValid = true;
        
        // Validar nombre
        const nombre = document.getElementById('nombre').value.trim();
        if (!nombre) {
            showError('nombreError', 'El nombre es requerido');
            isValid = false;
        } else if (nombre.length < 2) {
            showError('nombreError', 'El nombre debe tener al menos 2 caracteres');
            isValid = false;
        }
        
        // Validar apellido
        const apellido = document.getElementById('apellido').value.trim();
        if (!apellido) {
            showError('apellidoError', 'El apellido es requerido');
            isValid = false;
        } else if (apellido.length < 2) {
            showError('apellidoError', 'El apellido debe tener al menos 2 caracteres');
            isValid = false;
        }
        
        // Validar documento
        const documento = document.getElementById('documento').value.trim();
        if (!documento) {
            showError('documentoError', 'El documento de identidad es requerido');
            isValid = false;
        } else if (!/^\d+$/.test(documento)) {
            showError('documentoError', 'El documento debe contener solo números');
            isValid = false;
        }
        
        // Validar usuario
        const usuario = document.getElementById('usuario').value.trim();
        if (!usuario) {
            showError('usuarioError', 'El nombre de usuario es requerido');
            isValid = false;
        } else if (usuario.length < 3) {
            showError('usuarioError', 'El usuario debe tener al menos 3 caracteres');
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(usuario)) {
            showError('usuarioError', 'El usuario solo puede contener letras, números y guiones bajos');
            isValid = false;
        }
        
        // Validar email
        const email = document.getElementById('email').value.trim();
        if (!email) {
            showError('emailError', 'El correo electrónico es requerido');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Ingresa un correo electrónico válido');
            isValid = false;
        }
        
        // Validar teléfono
        const telefono = document.getElementById('telefono').value.trim();
        if (!telefono) {
            showError('telefonoError', 'El teléfono es requerido');
            isValid = false;
        } else if (!/^[\d\s\-\+\(\)]+$/.test(telefono)) {
            showError('telefonoError', 'Ingresa un número de teléfono válido');
            isValid = false;
        }
        
        // Validar contraseña
        const password = document.getElementById('password').value;
        if (!password) {
            showError('passwordError', 'La contraseña es requerida');
            isValid = false;
        } else if (password.length < 6) {
            showError('passwordError', 'La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
            showError('passwordError', 'La contraseña debe contener letras y números');
            isValid = false;
        }
        
        // Validar términos
        const terminos = document.getElementById('terminos').checked;
        if (!terminos) {
            showError('terminosError', 'Debes aceptar los términos y condiciones');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Mejorar la experiencia de usuario - limpiar errores al escribir
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const errorId = this.id + 'Error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    });
    
    // Limpiar error de términos al hacer click
    const terminosCheckbox = document.getElementById('terminos');
    if (terminosCheckbox) {
        terminosCheckbox.addEventListener('change', function() {
            const errorElement = document.getElementById('terminosError');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    }
});