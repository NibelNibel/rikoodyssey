export class Bloque {
  constructor(x, y, recursos) {
    this.recursos = recursos;
    this.x = x;
    this.y = y;
    this.ancho = 100; 
    this.alto = 100;  
    this.solido = true;
    this.tierra = 0;
    this.imagen = this.recursos.obtenerImagen(`tierra${this.tierra}`);
  }


  dibujar(renderizador) {

  renderizador.rectangulo(this.x, this.y, this.ancho, this.alto, "rgb(180,180,180)");

  renderizador.contexto.strokeStyle = "#22223b";
  renderizador.contexto.lineWidth = 1;
  renderizador.contexto.strokeRect(this.x, this.y, this.ancho, this.alto);
  renderizador.dibujarImagen(this.imagen, this.x - 50, this.y - 50, 200, 200);
}
}
