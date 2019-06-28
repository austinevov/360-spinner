let images = [];
for (let i = 0; i < 120; i++) {
  const image = new Image();
  image.src = `frames/${i}.jpg`;
  images.push(image);
}

export default class OrbitSpinnerCore {
  private isDragging: boolean;
  private mouseX: number;
  private frame: number;
  private theta: number;
  private currentTheta: number;
  private container: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
private deltaTheta: number;
  constructor(container: HTMLDivElement) {
    this.isDragging = false;
    this.mouseX = 0;
    this.frame = 0;
    this.theta = 0;
    this.deltaTheta = 0;
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.canvas.style.width = '400px';
     this.canvas.style.height = '400px';

    this.canvas.className = 'spinner-canvas';
    container.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');

    this.canvas.onmousedown = this.startDragging;
    this.canvas.ontouchstart = this.startDragging;

    container.onmousemove = this.handleMove;
    container.ontouchmove = this.handleMove;


    this.animate();
  }

  private animate = () => {
    this.context.drawImage(images[this.frame], 0, 0, 800, 800);

    requestAnimationFrame(this.animate);
  }

  private startDragging = evt => {
    const clientX = evt.clientX || evt.touches[0].clientX;

    this.isDragging = true;
    this.mouseX = clientX;

    window.addEventListener('mouseup', this.stopDragging);
    window.addEventListener('touchend', this.stopDragging);
    window.addEventListener('touchcancel', this.stopDragging);
  };

  private stopDragging = () => {
    this.isDragging = false;
    this.theta = this.currentTheta;
    window.removeEventListener('mouseup', this.stopDragging);
    window.removeEventListener('touchend', this.stopDragging);
    window.removeEventListener('touchcancel', this.stopDragging);
  };

  private handleMove = evt => {
    const clientX = evt.clientX || evt.touches[0].clientX;

    if (this.isDragging) {
      const delta = (clientX - this.mouseX);
      const deltaTheta = delta * 0.25;

      let theta = this.theta + deltaTheta;
      theta = (theta % 360);
      if (theta < 0) {
        theta = 360 + theta;
      }

      this.currentTheta = theta;
      this.frame = Math.floor(theta / 3);   
    }
  };
}