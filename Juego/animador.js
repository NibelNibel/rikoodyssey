export function animador(duracion_frame, maximo_frame){
    return {
        frame: 0,
        tiempo: 0,
        duracion: duracion_frame,
        max: maximo_frame,

        actualizar(deltaTime){
            this.tiempo += deltaTime;

            if (this.tiempo >= this.duracion){
                this.tiempo = 0;
                this.frame++;
                if (this.frame > this.max){
                    this.frame = 0;
                }
            }
        }
    };
}