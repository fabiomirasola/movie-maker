import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-blob',
  template: `
    <div
      #blob
      class="absolute w-[500px] h-[500px] -z-10 pointer-events-none blur-3xl"
      [style.background]="gradient"
    ></div>
  `
})
export class BlobComponent implements AfterViewInit {
  @ViewChild('blob') blob!: ElementRef<HTMLDivElement>;

  private angleX = Math.random() * 2 * Math.PI;
  private angleY = Math.random() * 2 * Math.PI;
  private angleShape = 0;
  private speedX = 0.005 + Math.random() * 0.003;
  private speedY = 0.005 + Math.random() * 0.003;
  private speedShape = 0.001;

  gradient = 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(236, 72, 153, 0.2) 100%)';

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    const blobEl = this.blob.nativeElement;
    const width = window.innerWidth - blobEl.offsetWidth;
    const height = window.innerHeight - blobEl.offsetHeight;

    this.ngZone.runOutsideAngular(() => {
      const animate = () => {
        const x = (Math.sin(this.angleX) + 1) / 2 * width;
        const y = (Math.sin(this.angleY) + 1) / 2 * height;

        blobEl.style.left = `${x}px`;
        blobEl.style.top = `${y}px`;

        const tl = 40 + Math.sin(this.angleShape) * 20;
        const tr = 60 + Math.cos(this.angleShape * 1.3) * 20;
        const br = 50 + Math.sin(this.angleShape * 1.7) * 20;
        const bl = 45 + Math.cos(this.angleShape * 2.1) * 20;
        
        blobEl.style.borderRadius = `${tl}% ${tr}% ${br}% ${bl}% / ${60 + Math.sin(this.angleShape * 1.1) * 15}% ${55 + Math.cos(this.angleShape * 1.5) * 15}% ${50 + Math.sin(this.angleShape * 1.9) * 15}% ${65 + Math.cos(this.angleShape * 0.9) * 15}%`;

        this.angleX += this.speedX;
        this.angleY += this.speedY;
        this.angleShape += this.speedShape;

        requestAnimationFrame(animate);
      };
      animate();
    });
  }
}