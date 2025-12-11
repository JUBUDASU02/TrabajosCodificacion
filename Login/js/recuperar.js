document.addEventListener('DOMContentLoaded', function() {
    const recuperarForm = document.getElementById('recuperarForm');
    const mensajeExito = document.getElementById('mensajeExito');
    
    if (recuperarForm) {
        recuperarForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar errores anteriores
            clearErrors();
            
            // Obtener valores
            const email = document.getElementById('emailRecuperar').value.trim();
            
            let isValid = true;
            
            // Validar email
            if (!email) {
                showError('emailRecuperar', 'El correo electrónico es obligatorio');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailRecuperar', 'Ingresa un correo electrónico válido');
                isValid = false;
            }
            
            if (isValid) {
                // Simular envío de correo
                showMessage('success', '¡Enlace enviado! Revisa tu correo electrónico para restablecer tu contraseña.');
                
                // Mostrar mensaje de éxito
                if (mensajeExito) {
                    mensajeExito.classList.remove('hidden');
                    mensajeExito.classList.add('show');
                }
                
                // Deshabilitar el botón por 30 segundos
                const submitButton = recuperarForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.disabled = true;
                submitButton.innerHTML = 'Espera 30 segundos...';
                
                let seconds = 30;
                const countdown = setInterval(() => {
                    seconds--;
                    submitButton.innerHTML = `Espera ${seconds} segundos...`;
                    
                    if (seconds <= 0) {
                        clearInterval(countdown);
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalText;
                    }
                }, 1000);
                
                // Redirigir al login después de 5 segundos
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 5000);
            }
        });
    }
    
    // Verificar si ya está logueado
    checkLoginStatus();
});

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const inputElement = document.getElementById(fieldId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputElement.classList.add('input-error');
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
    
    // Ocultar mensaje de éxito
    const mensajeExito = document.getElementById('mensajeExito');
    if (mensajeExito) {
        mensajeExito.classList.add('hidden');
        mensajeExito.classList.remove('show');
    }
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
    }, 5000);
}

// Función para checkLoginStatus ya está en auth.js