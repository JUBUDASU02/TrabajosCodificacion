// Manejo del formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Resetear mensajes de error
            usernameError.classList.add('hidden');
            passwordError.classList.add('hidden');
            
            let isValid = true;
            
            // Validar usuario/correo
            if (!usernameInput.value.trim()) {
                usernameError.textContent = 'El correo o usuario es requerido';
                usernameError.classList.remove('hidden');
                isValid = false;
            } else if (!isValidEmailOrUsername(usernameInput.value.trim())) {
                usernameError.textContent = 'Ingresa un correo o usuario válido';
                usernameError.classList.remove('hidden');
                isValid = false;
            }
            
            // Validar contraseña
            if (!passwordInput.value) {
                passwordError.textContent = 'La contraseña es requerida';
                passwordError.classList.remove('hidden');
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
                passwordError.classList.remove('hidden');
                isValid = false;
            }
            
            if (isValid) {
                // Simular envío de formulario
                const submitButton = loginForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Iniciando sesión...';
                submitButton.disabled = true;
                
                // Simular una llamada a la API
                setTimeout(() => {
                    // Aquí iría la lógica real de autenticación
                    console.log('Datos del formulario:', {
                        username: usernameInput.value,
                        password: passwordInput.value
                    });
                    
                    // Mostrar mensaje de éxito
                    alert('¡Inicio de sesión exitoso! Redirigiendo...');
                    
                    // En un caso real, redirigiríamos al usuario
                    // window.location.href = 'dashboard.html';
                    
                    // Restaurar el botón
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Función para validar email o usuario
    function isValidEmailOrUsername(input) {
        // Validar si es un email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input)) {
            return true;
        }
        
        // Validar si es un nombre de usuario (al menos 3 caracteres alfanuméricos)
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        return usernameRegex.test(input);
    }
    
    // Mejorar la experiencia de usuario
    usernameInput.addEventListener('input', function() {
        usernameError.classList.add('hidden');
    });
    
    passwordInput.addEventListener('input', function() {
        passwordError.classList.add('hidden');
    });
    
    // Permitir mostrar/ocultar contraseña (opcional)
    const passwordToggle = document.createElement('span');
    passwordToggle.className = 'material-symbols-outlined cursor-pointer';
    passwordToggle.textContent = 'visibility_off';
    passwordToggle.style.cursor = 'pointer';
    passwordToggle.style.marginLeft = '8px';
    
    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.textContent = 'visibility';
        } else {
            passwordInput.type = 'password';
            passwordToggle.textContent = 'visibility_off';
        }
    });
    
    // Agregar el toggle al contenedor del input de contraseña
    const passwordContainer = passwordInput.parentNode.querySelector('.flex.items-center.justify-center');
    if (passwordContainer) {
        passwordContainer.appendChild(passwordToggle);
    }
});