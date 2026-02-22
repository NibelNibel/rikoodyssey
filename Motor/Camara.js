export class Camara {
  constructor(ancho, alto) {
    this.x = 0;
    this.y = 0;
    this.ancho = ancho;
    this.alto = alto;

    this.objetivo = null;
    this.desfaseX = 0;
    this.desfaseY = 0;
    this.interpolacion = 0.9;
  }

  seguir(entidad, desfaseX = 0, desfaseY = 0) {
    this.objetivo = entidad;
    this.desfaseX = desfaseX;
    this.desfaseY = desfaseY;
  }

  actualizar(mundo) {
  if (!this.objetivo) return;

  // Tamaño de la zona muerta
  const deadZoneWidth = this.ancho * 0.4;
  const deadZoneHeight = this.alto * 0.3;

  const left = this.x + (this.ancho - deadZoneWidth) / 2;
  const right = left + deadZoneWidth;
  const top = this.y + (this.alto - deadZoneHeight) / 2;
  const bottom = top + deadZoneHeight;

  const playerCenterX = this.objetivo.x + this.objetivo.ancho / 2;
  const playerCenterY = this.objetivo.y + this.objetivo.alto / 2;

  if (playerCenterX < left) {
    this.x = playerCenterX - (this.ancho - deadZoneWidth) / 2;
  } else if (playerCenterX > right) {
    this.x = playerCenterX - (this.ancho + deadZoneWidth) / 2;
  }

  if (playerCenterY < top) {
    this.y = playerCenterY - (this.alto - deadZoneHeight) / 2;
  } else if (playerCenterY > bottom) {
    this.y = playerCenterY - (this.alto + deadZoneHeight) / 2;
  }

  // Limitar al mundo
  this.x = Math.max(0, Math.min(this.x, mundo.ancho - this.ancho));
  this.y = Math.max(0, Math.min(this.y, mundo.alto - this.alto));

  // SOLO redondear al final
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
}
}