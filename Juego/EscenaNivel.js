import { Escena } from "../Motor/Escena.js";
import { Mundo } from "../Motor/Mundo.js";
import { Camara } from "../Motor/Camara.js";
import { Jugador } from "./Jugador.js";
import { Bloque } from "./Bloque.js";
import { Moneda } from "./Monedas.js";
import { CargadorNivel } from "./CargadorNivel.js";
import { animador } from "./animador.js";

export class EscenaNivel extends Escena {
  constructor(ctxUI, recursos) {
    super();
    this.ctxUI = ctxUI;
    this.puntos = 0;
    this.recursos = recursos;
    
    this.botones = [
      { id: "btn_izq", x: 70, y: 600, w: 100, h: 100, color: "rgba(255,255,255,0.3)" },
      { id: "btn_der", x: 190, y: 600, w: 100, h: 100, color: "rgba(255,255,255,0.3)" },
      { id: "btn_salto", x: 1100, y: 600, w: 100, h: 100, color: "rgba(255,255,255,0.3)" },
      { id: "btn_dash", x: 980, y: 600, w: 100, h: 100, color: "rgba(0,150,255,0.3)" },
      { id: "btn_fs", x: 1150, y: 30, w: 80, h: 60, color: "rgba(255,255,255,0.2)" }
    ];
    this.particulasDash = [];
    this.Audios = [];
    this.AudiosNombres = ["audios/nota/nota.mp3"];
    for (let i = 0; i < this.AudiosNombres.length; i++) {
      let audio = new Audio(`./${this.AudiosNombres[i]}`);
        audio.volume = 0.04;
        this.Audios.push(audio);
    }
  }

  async cargar() {
    const mapa = await CargadorNivel.imagenAMapa("./Juego/nivel_1.png");
    const deco = await CargadorNivel.imagenAMapa("./Juego/nivel_1_deco.png");
    
    const altoMapa = mapa.length * 100;
    const anchoMapa = mapa[0].length * 100;
    
    this.mundo = new Mundo(anchoMapa, altoMapa);
    this.camara = new Camara(1280, 720);

    for (let y = 0; y < mapa.length; y++) {
      for (let x = 0; x < mapa[y].length; x++) {
        if (mapa[y][x] === 1) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.tierra = 0;
          bloque.imagen = this.recursos.obtenerImagen(`tierra${0}`);
          this.mundo.agregar(bloque, true);
        } 
        else if (mapa[y][x] === 2) {
          
          this.jugador = new Jugador(x * 100, y * 100, this.recursos);
          this.jugador.limiteX = anchoMapa;
          this.jugador.limiteY = altoMapa;
        }
      
        else if (mapa[y][x] === 3) {
          const moneda = new Moneda(x * 100 + 2, y * 100 + 2, this.recursos, new animador(0.5,1));
          this.mundo.agregar(moneda, false);
        } else if (mapa[y][x] === 4) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${1}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 5) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${2}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 6) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${3}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 7) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${4}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 8) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${5}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 9) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${6}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 10) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${7}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 11) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${8}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 12) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${9}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 13) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${10}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 14) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${11}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 15) {
          const bloque = new Bloque(x * 100, y * 100);
          bloque.imagen = this.recursos.obtenerImagen(`tierra${12}`);
          this.mundo.agregar(bloque, true);
        } else if (mapa[y][x] === 16) {
          const arbusto = {
            x: x,
            y: y,
            imagen: this.recursos.obtenerImagen(`arbusto`)
          }
          this.mundo.decorativos.push(arbusto);
        } 
      }
    }

    if (!this.jugador) this.jugador = new Jugador(100, 100, recursos);
    
    this.camara.seguir(this.jugador, 0, 100);
  }

  actualizar(dt, controles) {
  if (!this.listo) return;

  super.actualizar(dt, controles);
  this.jugador.actualizar(dt, this.mundo, controles);
  this.mundo.dt = dt;
  

  if (this.jugador.inicioDash) {
    for (let i = 0; i < 20; i++) {
      this.crearParticulaDash();
    }
    this.jugador.inicioDash = false;
  }

  // Actualizar partículas
  for (let i = this.particulasDash.length - 1; i >= 0; i--) {
    const p = this.particulasDash[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vida -= dt;

    if (p.vida <= 0) {
      this.particulasDash.splice(i, 1);
    }
  }

  this.camara.actualizar(this.mundo);

  const item = this.mundo.verificarRecoleccion(this.jugador);
  if (item) {
    this.Audios[0].currentTime = 0;
    this.Audios[0].play();
    this.puntos += item.valor;
    console.log("Monedas recolectadas:", this.puntos);
  }
}

  dibujar(renderizador) {
    
  if (!this.listo) return;

  renderizador.rectangulo(0,0, this.ctxUI.canvas.width, this.ctxUI.canvas.height, "rgb(100,100,255)");
  renderizador.dibujarImagen(this.recursos.obtenerImagen("islas_flotantes"), 0,0, 1280, 720);
  renderizador.comenzar(this.camara);
  
  this.mundo?.dibujar(renderizador, this.camara);

for (const p of this.particulasDash) {
  renderizador.rectangulo(
    p.x,
    p.y,
    p.tamaño,
    p.tamaño,
    `rgba(255,255,255,${p.vida * 2})`
  );
}
  
  
  if (this.jugador) {
    this.jugador.dibujar(renderizador);
  }
  

  renderizador.terminar();
  
  
  this.dibujarUI();
}

  dibujarUI() {
    this.ctxUI.clearRect(0, 0, 1280, 720);
    
    this.botones.forEach(btn => {
      this.ctxUI.fillStyle = btn.color;
      this.ctxUI.fillRect(btn.x, btn.y, btn.w, btn.h);
      
      
      if (btn.id === "btn_fs") {
        this.ctxUI.strokeStyle = "white";
        this.ctxUI.lineWidth = 2;
        this.ctxUI.strokeRect(btn.x + 20, btn.y + 15, btn.w - 40, btn.h - 30);
      }
    });

  
    this.ctxUI.fillStyle = "yellow";
    this.ctxUI.font = "bold 24px Arial";
    this.ctxUI.textAlign = "left";
    this.ctxUI.fillText(`Monedas: ${this.puntos}`, 30, 50);
  }

  configurarControlesTactiles(controles) {
    const canvasUI = this.ctxUI.canvas;

    const actualizarControles = (e) => {
      e.preventDefault();
      const rect = canvasUI.getBoundingClientRect();
      
      let tactilIzq = false;
      let tactilDer = false;
      let tactilSalto = false;
      let tactilDash = false;

      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const tx = (touch.clientX - rect.left) * (canvasUI.width / rect.width);
        const ty = (touch.clientY - rect.top) * (canvasUI.height / rect.height);

        this.botones.forEach(btn => {
          if (tx > btn.x && tx < btn.x + btn.w && ty > btn.y && ty < btn.y + btn.h) {
            if (btn.id === "btn_fs" && e.type === "touchstart") {
              this.alternarPantallaCompleta();
            }
            if (btn.id === "btn_izq") tactilIzq = true;
            if (btn.id === "btn_der") tactilDer = true;
            if (btn.id === "btn_salto") tactilSalto = true;
            if (btn.id === "btn_dash") tactilDash = true;
          }
        });
      }

      controles.izquierda = tactilIzq;
      controles.derecha = tactilDer;
      controles.salto = tactilSalto;
      controles.dash = tactilDash;
    };

    canvasUI.addEventListener("touchstart", actualizarControles);
    canvasUI.addEventListener("touchmove", actualizarControles);
    canvasUI.addEventListener("touchend", actualizarControles);
  }

  alternarPantallaCompleta() {
    const contenedor = document.getElementById("contenedor-juego");
    if (!document.fullscreenElement) {
      contenedor.requestFullscreen().catch(err => {
        console.error(`Error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
  crearParticulaDash() {
  if (!this.jugador) return;

  const dir = this.jugador.direccion === "d" ? 1 : -1;
  
  const offsetX = dir === 1 ? -20 : this.jugador.ancho + 20;
  const x = this.jugador.x + offsetX;
  const y = this.jugador.y + this.jugador.alto / 2;

  this.particulasDash.push({
    x,
    y,
    vx: -dir * (200 + Math.random() * 150),
    vy: (Math.random() - 0.5) * 100,
    vida: 0.5 + Math.random() * 0.8,
    tamaño: 3 + Math.random() * 5
  });
}
}
