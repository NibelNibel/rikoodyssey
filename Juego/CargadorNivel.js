export class CargadorNivel {
  static async imagenAMapa(rutaImagen) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = rutaImagen;
      
      img.onerror = () => {
        alert(`Error: No se encontró la imagen en "${rutaImagen}"`);
        reject(new Error("Ruta no válida"));
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const data = ctx.getImageData(0, 0, img.width, img.height).data;
        const mapa = [];

        for (let y = 0; y < img.height; y++) {
          const fila = [];
          for (let x = 0; x < img.width; x++) {
            const i = (y * img.width + x) * 4;
            const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
            
            if (r === 0 && g === 0 && b === 0) {
              fila.push(1);
            }
            else if (r === 0 && g === 255 && b === 0 ) {
              fila.push(2);
            } else if (r === 255 && g === 255 && b === 0) {
              fila.push(3);
            }
            else {
              fila.push(0);
            }
          }
          mapa.push(fila);
        }
        resolve(mapa);
      };
    });
  }
}
