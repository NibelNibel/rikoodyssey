
export class Escena {
  constructor() {
    this.entidades = [];
    this.mundo = null;
    this.camara = null;
    this.listo = false;
  }

  async cargar() {
    
  }

  actualizar(dt, entrada) {}

  dibujar(renderizador) {
  if (!this.listo) return;
  
  renderizador.comenzar(this.camara);
  
  this.mundo?.dibujar(renderizador, this.camara); 
  
  this.entidades.forEach(e => e.dibujar?.(renderizador));
  
  renderizador.terminar();
}

  destruir() {
    this.entidades.length = 0;
    this.listo = false;
  }
}