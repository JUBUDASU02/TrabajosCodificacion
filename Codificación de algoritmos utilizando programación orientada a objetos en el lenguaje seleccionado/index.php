<?php
/**
 * Clase base Prestamo
 * Encapsula la información general de cualquier préstamo.
 */

class Prestamo {
    // Encapsulamiento: Atributos privados
    private float $monto;
    private float $tasaAnual;
    private int $meses;

    /**
     * Constructor con valores obligatorios
     */
    public function __construct(float $monto, float $tasaAnual, int $meses) {
        $this->monto = $monto;
        $this->tasaAnual = $tasaAnual;
        $this->meses = $meses;
    }

    // Getters y Setters (acceso controlado)
    public function getMonto(): float { return $this->monto; }
    public function getTasaAnual(): float { return $this->tasaAnual; }
    public function getMeses(): int { return $this->meses; }

    public function setMonto(float $valor) { $this->monto = $valor; }
    public function setTasaAnual(float $valor) { $this->tasaAnual = $valor; }
    public function setMeses(int $valor) { $this->meses = $valor; }

    /**
     * Método para calcular la cuota mensual
     * Puede ser sobrescrito por clases hijas → Polimorfismo
     */
    public function calcularCuota(): float {
        $i = ($this->tasaAnual / 100) / 12;

        if ($i == 0) {
            return $this->monto / $this->meses;
        }

        return $this->monto * ($i / (1 - pow(1 + $i, -$this->meses)));
    }
}

/**
 * Clase hija PrestamoAmortizable.
 * Implementa la tabla de amortización.
 * Aplica HERENCIA + POLIMORFISMO
 */
class PrestamoAmortizable extends Prestamo {

    /**
     * Genera una tabla de amortización completa
     */
    public function generarTabla(): array {
        $tabla = [];
        $saldo = $this->getMonto();

        $i = ($this->getTasaAnual() / 100) / 12;
        $cuota = $this->calcularCuota();

        for ($mes = 1; $mes <= $this->getMeses(); $mes++) {
            $interes = $saldo * $i;
            $capital = $cuota - $interes;
            $saldo -= $capital;

            if ($saldo < 0) $saldo = 0;

            $tabla[] = [
                "mes" => $mes,
                "cuota" => $cuota,
                "interes" => $interes,
                "capital" => $capital,
                "saldo" => $saldo
            ];
        }

        return $tabla;
    }

    /**
     * Polimorfismo (sobrescribir método del padre)
     * Ejemplo educativo: cuota sin intereses (simulación opcional)
     */
    public function calcularCuotaSinInteres(): float {
        return $this->getMonto() / $this->getMeses();
    }
}

/**
 * Clase Formateador (responsabilidad única)
 * Sobrecarga "simulada": formatea números según la cantidad de decimales
 */
class Formateador {

    public static function numero($valor, $decimales = 2): string {
        return number_format($valor, $decimales, '.', ',');
    }

}
// Ejemplo de uso
$prestamo = new PrestamoAmortizable(10000, 5, 12);
$tablaAmortizacion = $prestamo->generarTabla();