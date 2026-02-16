export class Entidad {
  constructor(x = 0, y = 0, ancho = 0, alto = 0) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;

    this.vx = 0;
    this.vy = 0;
    this.enSuelo = false;
    this.muerto = false;
  }

  actualizar(dt, mundo) {}
  dibujar(renderizador) {}
}