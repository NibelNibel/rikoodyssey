export class Camara {
  constructor(ancho, alto) {
    this.x = 0;
    this.y = 0;
    this.ancho = ancho;
    this.alto = alto;

    this.objetivo = null;
    this.desfaseX = 0;
    this.desfaseY = 0;
    this.interpolacion = 0.08;
  }

  seguir(entidad, desfaseX = 0, desfaseY = 0) {
    this.objetivo = entidad;
    this.desfaseX = desfaseX;
    this.desfaseY = desfaseY;
  }

  actualizar(mundo) {
  if (!this.objetivo) return;

  const objetivoX = this.objetivo.x + this.desfaseX - this.ancho / 2;
  const objetivoY = this.objetivo.y + this.desfaseY - this.alto / 2;

  this.x += (objetivoX - this.x) * this.interpolacion;
  this.y += (objetivoY - this.y) * this.interpolacion;

  this.x = Math.max(0, Math.min(this.x, mundo.ancho - this.ancho));
  this.y = Math.max(0, Math.min(this.y, mundo.alto - this.alto));

  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
}
}