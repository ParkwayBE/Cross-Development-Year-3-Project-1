import { Injectable, ElementRef, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  sourceFile!: File;
  buildString: String= '';
  url:any;
  imageLoaded: boolean =false;
  
  sliderX=0;
  sliderY=0;
  text="";
  outlineColor = "#000000";

  drawnOnMain: boolean = false;
  canvas!: ElementRef;
  context!: any;
  Drawn: EventEmitter<any> = new EventEmitter();
  constructor() { }

  

  
   async drawImageOnCanvas(): Promise<number> {
    return new Promise((resolve, reject) => {
   
      const img = new Image();
      img.src = this.url;
      img.onload = () => {
      const canvasWidth = this.canvas.nativeElement.width;
      const canvasHeight = this.canvas.nativeElement.height;

      const aspectRatio = img.width / img.height;
      let drawWidth = canvasWidth;
      let drawHeight = canvasWidth / aspectRatio;

      if (drawHeight > canvasHeight) {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * aspectRatio;
      }

      const x = (canvasWidth - drawWidth) / 2;
      const y = (canvasHeight - drawHeight) / 2;

     
      this.context.clearRect(0, 0, canvasWidth, canvasHeight);

      this.context.drawImage(img, x, y, drawWidth, drawHeight);
      this.drawRectangleOnCanvas();
      console.log("text is ", this.text);
      this.drawText();
      this.imageLoaded = true;
    }
        setTimeout(() => {
          const randomNumber = 1;
          resolve(randomNumber);
        }, 500);
      });
    
      
    
  
    
    }

    

    
  drawRectangleOnCanvas(): void{
    this.context.fillStyle = "#7bedc7";
    const canvasWidth = this.canvas.nativeElement.width;
    const canvasHeight = this.canvas.nativeElement.height;
    const rectWidth = this.canvas.nativeElement.width/3;
    const rectHeight = this.canvas.nativeElement.height/5;
    const radius = canvasHeight/50;

    this.roundedRect(this.context, ((canvasWidth-rectWidth)/100)*this.sliderX, ((canvasHeight-rectHeight)/100)*this.sliderY, rectWidth, rectHeight, radius);
  }

  private roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.outlineColor;
    ctx.stroke();
  }

  drawText():void{
    if (this.context) {
      const fontSize = this.canvas.nativeElement.width/30;
      this.context.font = fontSize.toString()+'px Arial';
      this.context.fillStyle = this.outlineColor;
      const canvasWidth = this.canvas.nativeElement.width;
      const canvasHeight = this.canvas.nativeElement.height;
      const rectWidth = this.canvas.nativeElement.width/3;
      const rectHeight = this.canvas.nativeElement.height/5;
      const textmarginx = this.canvas.nativeElement.width/30;
      const textmarginy = this.canvas.nativeElement.width/15;
    
      this.context.fillText(this.text, ((((canvasWidth-rectWidth)/100)*this.sliderX)+textmarginx), ((((canvasHeight-rectHeight)/100)*this.sliderY)+textmarginy));
    }
  }
}
