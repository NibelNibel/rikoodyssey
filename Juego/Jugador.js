import { Entidad } from "../Motor/Entidad.js";
import { animador } from "./animador.js";

export class Jugador extends Entidad {
  constructor(x, y, recursos) {
    super(x, y, 60, 190);

    this.recursos = recursos;
    this.imagen = this.recursos.obtenerImagen("riko_correr_d0");
    
    this.limiteX = 0;
    this.limiteY = 0;
    this.velocidadMax = 450;
    this.fuerzaSalto = -950;
    this.gravedad = 2100;
    this.substeps = 10;

    this.desliz = 0;
    this.aceleracion = 1500 + this.desliz;
    this.friccion = 1000 + this.desliz;
    this.deceleracionGiro = 3000 + this.desliz;

    this.potenciaDash = 1800;
    this.cooldownDash = 2000;
    this.ultimoDash = 0;
    this.estaDasheando = false;
    this.duracionDash = 0.15;
    this.timerDash = 0;
    this.inicioDash = false;

    this.estado = "quieta";
    this.direccion = "d";
    this.velocidadMinimaGolpe = -600;
    this.animador = animador(0.5, 1);

    this.hitbox = false;

    this.tiempoCayendo = 0;
    this.tiempoMinimoParaCaer = 0.45;
    this.tiempoMinimoPreocupacion = 0.60;
    this.distanciaCaida = 0;
    this.umbralCaida = 201;


    this.tiempoGolpe = 0;
    this.duracionGolpe = 0.3;

    this.Audios = [];
    this.AudiosNombres = ["yei", "dolor"];
    for (let i = 0; i < this.AudiosNombres.length; i++) {
      let audio = new Audio(`./audios/riko/${this.AudiosNombres[i]}.wav`);
      audio.volume = 0.05;
      this.Audios.push(audio);
    }
    console.log(this.Audios);

    
    this.particulas = [];
  }

  generarPolvoSalto() {
    const cantidad = 8 + Math.floor(Math.random() * 4); 
    for (let i = 0; i < cantidad; i++) {
      this.particulas.push({
        x: this.x + this.ancho / 2 + (Math.random() - 0.5) * 30,
        y: this.y + this.alto - 5, 
        vx: (Math.random() - 0.5) * 100,
        vy: -Math.random() * 150 - 50, 
        vida: 0.5 + Math.random() * 0.5,
        tam: 3 + Math.random() * 4,
        color: `rgba(200, 200, 200, ${0.6 + Math.random() * 0.3})`
      });
    }
  }

  actualizar(dt, mundo, controles) {
    this.animador.actualizar(dt);
    const ahora = Date.now();

  
    if (this.tiempoGolpe > 0) {
      this.tiempoGolpe -= dt;
    }

    let dirX = 0;
    if (controles.izquierda) {
      dirX -= 1;
      this.direccion = "i";
    }
    if (controles.derecha) {
      dirX += 1;
      this.direccion = "d";
    }

    const estaCorriendoAlMaximo = Math.abs(this.vx) >= this.velocidadMax - 10;

    if (
      controles.dash &&
      ahora - this.ultimoDash > this.cooldownDash &&
      estaCorriendoAlMaximo
    ) {
      const direccionDash = Math.sign(this.vx);

      if (direccionDash !== 0 && this.tiempoGolpe <= 0) {
        this.vx = direccionDash * this.potenciaDash;
        this.vy = 0;
        this.ultimoDash = ahora;
        this.estaDasheando = true;
        this.timerDash = this.duracionDash;
        this.inicioDash = true;
        this.Audios[0].play();
      }
    }

    if (this.estaDasheando) {
      this.timerDash -= dt;
      if (this.timerDash <= 0) {
        this.estaDasheando = false;
      }
    }

    if (!this.estaDasheando) {
      if (dirX !== 0) {
        if (Math.sign(dirX) !== Math.sign(this.vx) && this.vx !== 0) {
          this.vx += dirX * this.deceleracionGiro * dt;
        } else {
          this.vx += dirX * this.aceleracion * dt;
        }
      } else {
        if (this.vx > 0)
          this.vx = Math.max(0, this.vx - this.friccion * dt);
        else if (this.vx < 0)
          this.vx = Math.min(0, this.vx + this.friccion * dt);
      }

      this.vx = Math.max(
        -this.velocidadMax,
        Math.min(this.velocidadMax, this.vx)
      );

      this.vy += this.gravedad * dt;
    }

    const sdt = dt / this.substeps;

    for (let i = 0; i < this.substeps; i++) {
      // --- EJE X ---
      const deltaX = this.vx * sdt;
      this.x += deltaX;

      const colX = mundo.colisionar(this, "x", deltaX);

      if (colX) {
        if (this.estaDasheando) {
          this.Audios[0].pause();
          this.Audios[0].currentTime = 0;
          this.Audios[1].currentTime = 0;
          this.Audios[1].play();
          this.estado = "golpe_cabeza";
          this.tiempoGolpe = this.duracionGolpe;
          this.vx *= -0.4;
          this.estaDasheando = false;
        } else {
          this.vx = 0;
        }
      }

    
      const velocidadImpactoY = this.vy;
      const deltaY = this.vy * sdt;
      this.y += deltaY;

      const colY = mundo.colisionar(this, "y", deltaY);
      if (colY) {
        if (velocidadImpactoY < this.velocidadMinimaGolpe) {
          this.Audios[0].pause();
          this.Audios[0].currentTime = 0;
          this.Audios[1].currentTime = 0;
          this.Audios[1].play();
          this.estado = "golpe_cabeza";
          this.tiempoGolpe = this.duracionGolpe;
        }
        this.vy = 0;
      }
    }

  
    this.y += 1;
    this.enSuelo = mundo.colisionar(this, "y", 1) !== null;
    this.y -= 1;
    if (this.enSuelo) {
      this.distanciaCaida = 0;
    } else if (this.vy > 0) {
      this.distanciaCaida += this.vy * dt;
    }

  
    if (this.tiempoGolpe <= 0) {
  
      if (controles.salto && this.enSuelo) {
        this.vy = this.fuerzaSalto;
        console.log(this.vy);
        this.enSuelo = false;
        this.estado = "saltando";
        this.generarPolvoSalto();
      }
      
      if (this.x < 0){
        this.x = 0;
        this.vx = 0;
      }
      if (this.x > this.limiteX - this.ancho){
        this.x = this.limiteX - this.ancho;
        this.vx = 0;
      }
  
      if (this.enSuelo) {
        this.tiempoCayendo = 0;

        if (this.vx === 0) {
          this.estado = "quieta";
        } else {
          this.estado = "correr";
        }
      }
      // Estados en aire
      else {
        if (this.vy < 0) {
          // Subiendo
          this.estado = "saltando";
          this.tiempoCayendo = 0;
        } else {
          // Bajando
          if (this.distanciaCaida > this.umbralCaida) {
            this.estado = "saltando";
          }
          if (this.distanciaCaida > this.umbralCaida + 300) {
            this.estado = "cayendo";
          }
        }
        if (this.estaDasheando) {
          this.estado = "saltando_alegre";
        }
      }
    }

    for (let i = this.particulas.length - 1; i >= 0; i--) {
      const p = this.particulas[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 200 * dt;
      p.vida -= dt;
      if (p.vida <= 0) {
        this.particulas.splice(i, 1);
      }
    }

    if (this.y > this.limiteY){
      this.x = 100;
      this.y = 100;
    }
  }

  dibujar(renderizador) {
    if (!this.imagen || !this.imagen.complete) return;

    if (this.hitbox) {
      renderizador.rectangulo(
        Math.floor(this.x),
        Math.floor(this.y),
        this.ancho,
        this.alto,
        "#00ff00"
      );
    }

    const drawX = Math.floor(this.x);
    const drawY = Math.floor(this.y);
    const frame = this.animador.frame;

    this.imagen = this.recursos.obtenerImagen(
      `riko_${this.estado}_${this.direccion}${frame}`
    );

    renderizador.dibujarImagen(
      this.imagen,
      Math.floor(drawX - 70),
      Math.floor(drawY - 4),
      200,
      200
    );

  
    for (let p of this.particulas) {
      renderizador.rectangulo(
        Math.floor(p.x - p.tam / 2),
        Math.floor(p.y - p.tam / 2),
        p.tam,
        p.tam,
        p.color
      );
    }
  }
}