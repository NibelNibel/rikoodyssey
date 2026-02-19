const CELDA = 100;

export class Mundo {
  constructor(ancho, alto) {
    this.ancho = ancho;
    this.alto = alto;
    this.columnas = Math.ceil(ancho / CELDA);
    this.filas = Math.ceil(alto / CELDA);
    this.cuadricula = [];
    this.solidos = [];
    this.otros = [];
    this.decorativos = [];
    this.dt = 0;

    this.mapaCanvas = document.createElement('canvas');
    this.mapaCtx = this.mapaCanvas.getContext('2d');
    this.mapaRenderizado = false;

    this.inicializarCuadricula();
  }

  inicializarCuadricula() {
    this.cuadricula = Array.from({ length: this.filas }, () =>
      Array.from({ length: this.columnas }, () => [])
    );
  }

  obtenerCelda(x, y) {
    return {
      c: Math.max(0, Math.min(Math.floor(x / CELDA), this.columnas - 1)),
      f: Math.max(0, Math.min(Math.floor(y / CELDA), this.filas - 1))
    };
  }

  agregar(objeto, solido = false) {
    (solido ? this.solidos : this.otros).push(objeto);
    const a = this.obtenerCelda(objeto.x, objeto.y);
    const b = this.obtenerCelda(objeto.x + objeto.ancho, objeto.y + objeto.alto);
    for (let f = a.f; f <= b.f; f++) {
      for (let c = a.c; c <= b.c; c++) {
        this.cuadricula[f][c].push(objeto);
      }
    }
  }

  preRenderizar(renderizador) {
    this.mapaCanvas.width = this.ancho;
    this.mapaCanvas.height = this.alto;

    const ctxOriginal = renderizador.contexto;
    renderizador.contexto = this.mapaCtx;

    for (const o of this.solidos) {
      o.dibujar(renderizador);
    }
    
    for (const o of this.decorativos) {
      renderizador.dibujarImagen(o.imagen, o.x, o.y, o.ancho, o.alto);
    }

    renderizador.contexto = ctxOriginal;
    this.mapaRenderizado = true;
  }

  verificarRecoleccion(entidad) {
    for (let i = this.otros.length - 1; i >= 0; i--) {
      const objeto = this.otros[i];
      if (
        entidad.x < objeto.x + objeto.ancho &&
        entidad.x + entidad.ancho > objeto.x &&
        entidad.y < objeto.y + objeto.alto &&
        entidad.y + entidad.alto > objeto.y
      ) {
        const recolectado = this.otros.splice(i, 1)[0];
        this.eliminarDeCuadricula(recolectado);
        return recolectado;
      }
    }
    return null;
  }

  eliminarDeCuadricula(objeto) {
    for (let f = 0; f < this.filas; f++) {
      for (let c = 0; c < this.columnas; c++) {
        const index = this.cuadricula[f][c].indexOf(objeto);
        if (index !== -1) this.cuadricula[f][c].splice(index, 1);
      }
    }
  }

  colisionar(entidad, eje, delta) {
    const a = this.obtenerCelda(entidad.x, entidad.y);
    const b = this.obtenerCelda(entidad.x + entidad.ancho, entidad.y + entidad.alto);
    const candidatos = new Set();
    for (let f = a.f; f <= b.f; f++) {
      for (let c = a.c; c <= b.c; c++) {
        this.cuadricula[f][c].forEach(o => candidatos.add(o));
      }
    }
    for (const o of candidatos) {
      if (!o.solido) continue;
      if (
        entidad.x < o.x + o.ancho &&
        entidad.x + entidad.ancho > o.x &&
        entidad.y < o.y + o.alto &&
        entidad.y + entidad.alto > o.y
      ) {
        if (eje === "x") {
          entidad.x -= delta;
        } else {
          entidad.y -= delta;
          if (delta > 0) entidad.enSuelo = true;
          entidad.vy = 0;
        }
        return o;
      }
    }
    return null;
  } 
  
  colisionDetectar(entidad) {
  const a = this.obtenerCelda(entidad.x, entidad.y);
  const b = this.obtenerCelda(entidad.x + entidad.ancho, entidad.y + entidad.alto);

  const candidatos = new Set();

  for (let f = a.f; f <= b.f; f++) {
    for (let c = a.c; c <= b.c; c++) {
      this.cuadricula[f][c].forEach(o => candidatos.add(o));
    }
  }

  for (const o of candidatos) {
    if (!o.solido) continue;

    if (
      entidad.x < o.x + o.ancho &&
      entidad.x + entidad.ancho > o.x &&
      entidad.y < o.y + o.alto &&
      entidad.y + entidad.alto > o.y
    ) {
      return o;
    }
  }

  return null;
}

  dibujar(renderizador, camara) {
    if (this.mapaRenderizado) {
      renderizador.contexto.drawImage(this.mapaCanvas, 0, 0);
    }

    const margen = 100;
    const limIzquierdo = camara ? camara.x - margen : -Infinity;
    const limDerecho = camara ? camara.x + camara.ancho + margen : Infinity;
    const limSuperior = camara ? camara.y - margen : -Infinity;
    const limInferior = camara ? camara.y + camara.alto + margen : Infinity;

    for (const o of this.otros) {
      if (!camara || (
        o.x + o.ancho > limIzquierdo &&
        o.x < limDerecho &&
        o.y + o.alto > limSuperior &&
        o.y < limInferior
      )) {
        o.dibujar(renderizador);
        o.actualizar(this.dt, this);
      }
    }
  }

  limpiar() {
    this.solidos.length = 0;
    this.otros.length = 0;
    this.decorativos.length = 0;
    this.mapaRenderizado = false;
    this.inicializarCuadricula();
  }
}
