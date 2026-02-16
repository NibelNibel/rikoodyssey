
export class Escena {
  constructor() {
    this.entidades = [];
    this.mundo = null;
    this.camara = null;
    this.listo = false;
  }

  async cargar() {
    // Método que debe ser sobrescrito por las escenas hijas
  }

  actualizar(dt, entrada) {}

  dibujar(renderizador) {
  if (!this.listo) return;
  
  renderizador.comenzar(this.camara);
  
  // Pasamos la cámara al mundo aquí
  this.mundo?.dibujar(renderizador, this.camara); 
  
  // También podrías aplicar culling a las entidades si tuvieras cientos
  this.entidades.forEach(e => e.dibujar?.(renderizador));
  
  renderizador.terminar();
}

  destruir() {
    this.entidades.length = 0;
    this.listo = false;
  }
}