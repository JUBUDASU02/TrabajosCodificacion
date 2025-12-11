<?php
/**
 * Clase Persona
 * Representa una persona con sus atributos y acciones
 */
class Persona {
    // Atributos privados (encapsulamiento)
    private $nombre;
    private $apellido;
    private $fechaNacimiento;
    private $email;
    private $telefono;
    private $genero;
    private $edad;
    
    /**
     * Constructor de la clase
     */
    public function __construct($nombre, $apellido, $fechaNacimiento, $email, $telefono, $genero) {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->fechaNacimiento = $fechaNacimiento;
        $this->email = $email;
        $this->telefono = $telefono;
        $this->genero = $genero;
        $this->edad = $this->calcularEdad();
    }
    
    // Métodos Getters (desencapsulamiento)
    public function getNombre() {
        return $this->nombre;
    }
    
    public function getApellido() {
        return $this->apellido;
    }
    
    public function getFechaNacimiento() {
        return $this->fechaNacimiento;
    }
    
    public function getEmail() {
        return $this->email;
    }
    
    public function getTelefono() {
        return $this->telefono;
    }
    
    public function getGenero() {
        return $this->genero;
    }
    
    public function getEdad() {
        return $this->edad;
    }
    
    public function getNombreCompleto() {
        return $this->nombre . ' ' . $this->apellido;
    }
    
    // Métodos Setters (encapsulamiento)
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    
    public function setApellido($apellido) {
        $this->apellido = $apellido;
    }
    
    public function setFechaNacimiento($fechaNacimiento) {
        $this->fechaNacimiento = $fechaNacimiento;
        $this->edad = $this->calcularEdad();
    }
    
    public function setEmail($email) {
        $this->email = $email;
    }
    
    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }
    
    public function setGenero($genero) {
        $this->genero = $genero;
    }
    
    /**
     * Método privado para calcular la edad
     */
    private function calcularEdad() {
        $fechaNac = new DateTime($this->fechaNacimiento);
        $hoy = new DateTime();
        $edad = $hoy->diff($fechaNac);
        return $edad->y;
    }
    
    /**
     * Método: Reír
     * La persona realiza la acción de reír
     */
    public function reir() {
        $mensaje = $this->nombre . ' está riendo a carcajadas. ¡Ja ja ja! La risa es contagiosa y alegra el día.';
        return [
            'accion' => 'reir',
            'titulo' => '😄 Reír',
            'mensaje' => $mensaje,
            'estado' => 'exitoso'
        ];
    }
    
    /**
     * Método: Comer
     * La persona realiza la acción de comer
     */
    public function comer() {
        $mensaje = $this->nombre . ' está disfrutando de una deliciosa comida. ¡Qué rico! La comida es una de las mejores experiencias de la vida.';
        return [
            'accion' => 'comer',
            'titulo' => '🍽️ Comer',
            'mensaje' => $mensaje,
            'estado' => 'exitoso'
        ];
    }
    
    /**
     * Método: Dormir
     * La persona realiza la acción de dormir
     */
    public function dormir() {
        $mensaje = $this->nombre . ' está descansando profundamente. Zzz... El descanso es fundamental para recuperar energías.';
        return [
            'accion' => 'dormir',
            'titulo' => '😴 Dormir',
            'mensaje' => $mensaje,
            'estado' => 'exitoso'
        ];
    }
    
    /**
     * Método: Estudiar
     * La persona realiza la acción de estudiar
     */
    public function estudiar() {
        $mensaje = $this->nombre . ' está estudiando con mucha concentración. ¡El conocimiento es poder! Cada día se aprende algo nuevo.';
        return [
            'accion' => 'estudiar',
            'titulo' => '📚 Estudiar',
            'mensaje' => $mensaje,
            'estado' => 'exitoso'
        ];
    }
    
    /**
     * Método: Caminar
     * La persona realiza la acción de caminar
     */
    public function caminar() {
        $mensaje = $this->nombre . ' está caminando al aire libre. ¡Qué saludable! El ejercicio mantiene el cuerpo y la mente en forma.';
        return [
            'accion' => 'caminar',
            'titulo' => '🚶 Caminar',
            'mensaje' => $mensaje,
            'estado' => 'exitoso'
        ];
    }
    
    /**
     * Método para convertir el objeto a un array asociativo
     */
    public function toArray() {
        return [
            'nombre' => $this->nombre,
            'apellido' => $this->apellido,
            'nombreCompleto' => $this->getNombreCompleto(),
            'fechaNacimiento' => $this->fechaNacimiento,
            'email' => $this->email,
            'telefono' => $this->telefono,
            'genero' => $this->genero,
            'edad' => $this->edad
        ];
    }
    
    /**
     * Método para convertir el objeto a JSON
     */
    public function toJSON() {
        return json_encode($this->toArray());
    }
}
?>