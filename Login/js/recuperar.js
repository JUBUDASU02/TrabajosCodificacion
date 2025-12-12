// Manejo del formulario de recuperación de contraseña
document.addEventListener('DOMContentLoaded', function() {
    const recuperarForm = document.getElementById('recuperarForm');
    const emailInput = document.getElementById('emailRecuperar');
    const emailError = document.getElementById('emailRecuperarError');
    const mensajeExito = document.getElementById('mensajeExito');
    
    if (recuperarForm) {
        recuperarForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Resetear mensajes
            emailError.style.display = 'none';
            mensajeExito.classList.remove('show');
            
            let isValid = true;
            
            // Validar email
            if (!emailInput.value.trim()) {
                emailError.textContent = 'El correo electrónico es requerido';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                emailError.textContent = 'Ingresa un correo electrónico válido';
                emailError.style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Simular envío de formulario
                const submitButton = recuperarForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Enviando...';
                submitButton.disabled = true;
                
                // Simular una llamada a la API
                setTimeout(() => {
                    // Aquí iría la lógica real de recuperación
                    console.log('Email para recuperación:', emailInput.value);
                    
                    // Mostrar mensaje de éxito
                    mensajeExito.classList.add('show');
                    
                    // Ocultar formulario
                    recuperarForm.style.display = 'none';
                    
                    // Restaurar el botón (aunque el formulario esté oculto)
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Opcional: Redirigir después de un tiempo
                    setTimeout(() => {
                        // window.location.href = 'index.html';
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Mejorar la experiencia de usuario
    emailInput.addEventListener('input', function() {
        emailError.style.display = 'none';
    });
});