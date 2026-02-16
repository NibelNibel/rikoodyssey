export class GestorEscenas {
  constructor() {
    this.escenaActual = null;
  }

  async cambiarEscena(nuevaEscena) {
    if (this.escenaActual) {
      this.escenaActual.destruir?.();
    }

    this.escenaActual = nuevaEscena;

    if (this.escenaActual.cargar) {
      await this.escenaActual.cargar();
    }
    
    if (!this.escenaActual.listo) {
      this.escenaActual.listo = true;
    }
  }

  actualizar(dt, controles) {
    if (!this.escenaActual || !this.escenaActual.listo) return;
    this.escenaActual.actualizar(dt, controles);
  }

  dibujar(renderizador) {
    if (!this.escenaActual || !this.escenaActual.listo) return;
    this.escenaActual.dibujar(renderizador);
  }
}