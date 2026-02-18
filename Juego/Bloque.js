export class Bloque {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.ancho = 100; 
    this.alto = 100;  
    this.solido = true;
    this.imagen = null;
  }


  dibujar(renderizador) {
  //renderizador.rectangulo(this.x, this.y, this.ancho, this.alto, "rgb(180,180,180)");

  //renderizador.contexto.strokeStyle = "#22223b";
  //renderizador.contexto.lineWidth = 1;
  //renderizador.contexto.strokeRect(this.x, this.y, this.ancho, this.alto);
  renderizador.dibujarImagen(this.imagen, this.x, this.y, 102, 102);
}
}
