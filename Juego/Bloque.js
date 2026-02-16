export class Bloque {
  constructor(x, y) { // Asegúrate que solo recibe x, y
    this.x = x;
    this.y = y;
    this.ancho = 100; // Valor fijo
    this.alto = 100;  // Valor fijo
    this.solido = true;
  }


  dibujar(renderizador) {
  // Dibujamos el cuerpo del bloque
  renderizador.rectangulo(this.x, this.y, this.ancho, this.alto, "rgb(180,180,180)");
  // Dibujamos un borde sutil para que se vea el relieve entre bloques
  renderizador.contexto.strokeStyle = "#22223b";
  renderizador.contexto.lineWidth = 0;
  renderizador.contexto.strokeRect(this.x, this.y, this.ancho, this.alto);
}
}
