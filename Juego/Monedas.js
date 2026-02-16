import { Entidad } from "../Motor/Entidad.js";

export class Moneda extends Entidad {
  constructor(x, y, recursos, animador) {
    super(x, y, 96, 96); // Un poco más pequeña que un bloque
    this.imagen = recursos.obtenerImagen("nota_musical0");
    this.valor = 1;
    this.recolectada = false;
    this.animador = animador;
    this.recursos = recursos;
  }

  actualizar(dt, mundo) {
    this.animador.actualizar(dt);
  }

  dibujar(renderizador) {
    // Amarillo puro como pediste
    //renderizador.rectangulo(this.x, this.y, this.ancho, this.alto, "#ffff00");
    const frame = this.animador.frame;  
    this.imagen = this.recursos.obtenerImagen(`nota_musical${frame}`);
    renderizador.dibujarImagen(this.imagen, this.x - 50, this.y - 50, 200, 200);
  }
}
