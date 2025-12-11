document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            clearErrors();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            let isValid = true;
            
            if (!username) {
                showError('username', 'El correo o usuario es obligatorio');
                isValid = false;
            } else if (!isValidEmail(username) && username.length < 3) {
                showError('username', 'Ingresa un correo válido o usuario de al menos 3 caracteres');
                isValid = false;
            }
            
            if (!password) {
                showError('password', 'La contraseña es obligatoria');
                isValid = false;
            } else if (password.length < 4) {
                showError('password', 'La contraseña debe tener al menos 4 caracteres');
                isValid = false;
            }
            
            // CREDENCIALES ESPECÍFICAS
            const credencialesValidas = [
                { user: 'admin', pass: '1234' },
                { user: 'admin@midnightcode.com', pass: '1234' },
                { user: 'administrador', pass: '1234' }
            ];
            
            let credencialCorrecta = false;
            
            if (isValid) {
                // Verificar credenciales específicas
                for (const cred of credencialesValidas) {
                    if (username === cred.user && password === cred.pass) {
                        credencialCorrecta = true;
                        break;
                    }
                }
                
                // También permitir cualquier usuario si la contraseña es 1234 (para demo)
                if (password === '1234' && username.length >= 3) {
                    credencialCorrecta = true;
                }
                
                if (credencialCorrecta) {
                    // Guardar datos del usuario
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user', username);
                    localStorage.setItem('userRole', 'administrador');
                    
                    // Guardar datos adicionales si es admin
                    if (username === 'admin' || username === 'admin@midnightcode.com') {
                        const adminData = {
                            nombre: 'Administrador',
                            apellido: 'Sistema',
                            email: 'admin@midnightcode.com',
                            rol: 'Administrador',
                            avatar: 'https://ui-avatars.com/api/?name=Admin+Sistema&background=d4af37&color=000&bold=true'
                        };
                        localStorage.setItem('userData', JSON.stringify(adminData));
                    }
                    
                    showMessage('success', 'Inicio de sesión exitoso. Redirigiendo...');
                    
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    showError('password', 'Credenciales incorrectas. Usa: admin / 1234');
                    isValid = false;
                }
            }
        });
    }
    
    checkLoginStatus();
});
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Limpiar errores anteriores
            clearErrors();
            
            // Obtener valores
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            let isValid = true;
            
            // Validar usuario/correo
            if (!username) {
                showError('username', 'El correo o usuario es obligatorio');
                isValid = false;
            } else if (!isValidEmail(username) && username.length < 3) {
                showError('username', 'Ingresa un correo válido o usuario de al menos 3 caracteres');
                isValid = false;
            }
            
            // Validar contraseña
            if (!password) {
                showError('password', 'La contraseña es obligatoria');
                isValid = false;
            } else if (password.length < 6) {
                showError('password', 'La contraseña debe tener al menos 6 caracteres');
                isValid = false;
            }
            
            // Si todo es válido, redirigir al dashboard
            if (isValid) {
                // En un sistema real, aquí harías una petición al servidor
                // Por ahora, simulamos una autenticación exitosa
                
                // Guardar en localStorage (simulación de sesión)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', username);
                
                // Mostrar mensaje de éxito
                showMessage('success', 'Inicio de sesión exitoso. Redirigiendo...');
                
                // Redirigir al dashboard después de 1.5 segundos
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
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
        errorElement.classList.remove('hidden');
        errorElement.classList.add('show');
        inputElement.classList.add('input-error');
    }
}

function clearErrors() {
    // Limpiar todos los errores
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('show');
        el.textContent = '';
    });
    
    // Quitar clases de error de inputs
    document.querySelectorAll('.input-error').forEach(el => {
        el.classList.remove('input-error');
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(type, message) {
    // Crear elemento de alerta si no existe
    let alertDiv = document.querySelector('.alert');
    
    if (!alertDiv) {
        alertDiv = document.createElement('div');
        alertDiv.className = 'alert';
        document.querySelector('form').insertAdjacentElement('beforebegin', alertDiv);
    }
    
    // Configurar alerta según tipo
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

function checkLoginStatus() {
    // Verificar si ya está logueado
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // Si está en páginas de login/registro, redirigir al dashboard
        if (window.location.pathname.includes('index.html') || 
            window.location.pathname.includes('registro.html') ||
            window.location.pathname.includes('recuperar.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        // Si no está logueado y está en dashboard, redirigir al login
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'index.html';
        }
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}