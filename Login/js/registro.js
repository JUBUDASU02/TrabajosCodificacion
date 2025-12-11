document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.querySelector('form');
    
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearErrors();
            
            // Obtener valores
            const nombre = document.querySelector('input[placeholder*="nombre"]')?.value.trim();
            const apellido = document.querySelector('input[placeholder*="apellido"]')?.value.trim();
            const documento = document.querySelector('input[placeholder*="documento"]')?.value.trim();
            const usuario = document.querySelector('input[placeholder*="usuario"]')?.value.trim();
            const email = document.querySelector('input[type="email"]')?.value.trim();
            const telefono = document.querySelector('input[type="tel"]')?.value.trim();
            const password = document.querySelector('input[type="password"]')?.value.trim();
            
            let isValid = true;
            
            // Validaciones
            if (!nombre || nombre.length < 2) {
                showFieldError('nombre', 'El nombre debe tener al menos 2 caracteres');
                isValid = false;
            }
            
            if (!apellido || apellido.length < 2) {
                showFieldError('apellido', 'El apellido debe tener al menos 2 caracteres');
                isValid = false;
            }
            
            if (!documento || !/^\d{8,15}$/.test(documento)) {
                showFieldError('documento', 'Documento inválido (8-15 dígitos)');
                isValid = false;
            }
            
            if (!usuario || usuario.length < 3) {
                showFieldError('usuario', 'Usuario debe tener al menos 3 caracteres');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                showFieldError('email', 'Correo electrónico inválido');
                isValid = false;
            }
            
            if (!telefono || !/^[\d\s\-\+\(\)]{10,20}$/.test(telefono)) {
                showFieldError('telefono', 'Teléfono inválido');
                isValid = false;
            }
            
            if (!password || password.length < 6) {
                showFieldError('password', 'La contraseña debe tener al menos 6 caracteres');
                isValid = false;
            }
            
            if (isValid) {
                // Simular registro exitoso
                showMessage('success', 'Registro exitoso. Redirigiendo al login...');
                
                // Aquí normalmente enviarías los datos al servidor
                const userData = {
                    nombre,
                    apellido,
                    documento,
                    usuario,
                    email,
                    telefono,
                    fechaRegistro: new Date().toISOString()
                };
                
                localStorage.setItem('userData', JSON.stringify(userData));
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        });
    }
    
    // Verificar si ya está logueado
    checkLoginStatus();
});

function showFieldError(fieldName, message) {
    // Buscar el input correspondiente
    const input = document.querySelector(`input[placeholder*="${fieldName.toLowerCase()}"]`);
    if (input) {
        // Crear o mostrar mensaje de error
        let errorElement = input.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            input.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
        input.classList.add('input-error');
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    
    document.querySelectorAll('.input-error').forEach(el => {
        el.classList.remove('input-error');
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(type, message) {
    let alertDiv = document.querySelector('.alert');
    
    if (!alertDiv) {
        alertDiv = document.createElement('div');
        alertDiv.className = 'alert';
        document.querySelector('form').insertAdjacentElement('beforebegin', alertDiv);
    }
    
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;
    
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}