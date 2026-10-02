import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { BuildInfo } from '@awesome-cordova-plugins/build-info/ngx';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { ElementRef, ViewChild, AfterViewInit, EventEmitter, Renderer2 } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';
import { CanvasService } from '../canvas.service';
import { TabSwapService } from '../tab-swap.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {
  // sourceFile!: File;
  buildString: String= '';
  url:any;
  imageLoaded: boolean =false;
  sliderX=0;
  sliderY=0;
  text="";
  outlineColor = "";
  selectedOption = "";
  fontColor = "black";
  fontSize = "12px"
  public alertButtons1 = ['OK'];
  public alertInputs1 = [
    {
      label: 'Font Size',
      type: 'radio',
      value: 'size',
    },
    {
      label: 'Font Color',
      type: 'radio',
      value: 'color',
    },

  ];
  public alertButtons2 = ['OK'];
  public alertInputs2 = [
    {
      label: 'Black',
      type: 'radio',
      value: '#000000',
    },
    {
      label: 'Blue',
      type: 'radio',
      value: '#0e4aed',
    },
  ];
  public alertButtons3 = ['OK'];
  public alertInputs3 = [
    {
      label: '12px',
      type: 'radio',
      value: '12px',
    },
    {
      label: '20px',
      type: 'radio',
      value: '20px',
    },
  ];
  
  
  @ViewChild('canvas1', { static: false }) canvas1!: ElementRef;
  
  constructor(private renderer: Renderer2, private el: ElementRef, private platform: Platform, private BuildInfo: BuildInfo, private canvasService: CanvasService, private tabswap: TabSwapService, public alertController: AlertController){
    this.buildString = '';
    this.buildString += '\nBuildInfo.baseUrl =' + BuildInfo.baseUrl;
    this.buildString += '\nBuildInfo.packageName =' + BuildInfo.packageName;
    this.buildString += '\nBuildInfo.basePackageName =' + BuildInfo.basePackageName;
    this.buildString += '\nBuildInfo.displayName =' + BuildInfo.displayName;
    this.tabswap.Tab2DrawnEvent.subscribe(() =>{
        this.canvasService.canvas= this.canvas1;
        this.canvasService.context=this.canvas1.nativeElement.getContext("2d");
    });
    
  }

  async chooseFile(event: any){
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.url = event.target.result;
      this.canvasService.url = this.url;
      this.canvasService.canvas = this.canvas1;
      this.canvasService.context = this.canvas1.nativeElement.getContext("2d");
      this.canvasService.drawImageOnCanvas().then((result)=>{
        this.tabswap.Tab1DrawnEvent.emit();
      });
      
      this.imageLoaded = true;
      this.canvasService.imageLoaded = true;
      this.canvasService.drawnOnMain = true;
      //this.tabswap.Tab1DrawnEvent.emit();
      
      
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
    
  }

  

  ngAfterViewInit(): void {
    
  }

  // drawImageOnCanvas(): void {
  //   const img = new Image();
  //   img.src = this.url;
  //   img.onload = () => {
  //     const canvasWidth = this.canvas.nativeElement.width;
  //     const canvasHeight = this.canvas.nativeElement.height;

  //     const aspectRatio = img.width / img.height;
  //     let drawWidth = canvasWidth;
  //     let drawHeight = canvasWidth / aspectRatio;

  //     if (drawHeight > canvasHeight) {
  //       drawHeight = canvasHeight;
  //       drawWidth = canvasHeight * aspectRatio;
  //     }

  //     const x = (canvasWidth - drawWidth) / 2;
  //     const y = (canvasHeight - drawHeight) / 2;

     
  //     this.context.clearRect(0, 0, canvasWidth, canvasHeight);

  //     this.context.drawImage(img, x, y, drawWidth, drawHeight);
  //     this.drawRectangleOnCanvas();
  //     this.drawText();
  //   }

  //   this.imageLoaded = true;
    


  // }
  // drawRectangleOnCanvas(): void{
  //   this.context.fillStyle = "#7bedc7";
  //   const canvasWidth = this.canvas.nativeElement.width;
  //   const canvasHeight = this.canvas.nativeElement.height;
  //   this.roundedRect(this.context, ((canvasWidth-160)/100)*this.sliderX, ((canvasHeight-80)/100)*this.sliderY, 160, 80, 15);
  // }

  // private roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
  //   ctx.beginPath();
  //   ctx.moveTo(x + radius, y);
  //   ctx.arcTo(x + width, y, x + width, y + height, radius);
  //   ctx.arcTo(x + width, y + height, x, y + height, radius);
  //   ctx.arcTo(x, y + height, x, y, radius);
  //   ctx.arcTo(x, y, x + width, y, radius);
  //   ctx.closePath();
  //   ctx.fill();
  // }


  onIonChangeX(ev: Event) {
    
    this.sliderX = (ev as RangeCustomEvent).detail.value as number;
    console.log(this.sliderX);
    this.canvasService.sliderX = this.sliderX;
    this.canvasService.drawImageOnCanvas().then((result)=>{
      this.tabswap.Tab1DrawnEvent.emit();
    });

  }
  onIonChangeY(ev: Event) {
    
    this.sliderY = (ev as RangeCustomEvent).detail.value as number;
    console.log(this.sliderY);
    this.canvasService.sliderY = this.sliderY;
    this.canvasService.drawImageOnCanvas().then((result)=>{
      this.tabswap.Tab1DrawnEvent.emit();
    });
  }
  onIonChangeText(ev: Event):void{
    this.canvasService.text = this.text;
    this.canvasService.drawImageOnCanvas().then((result)=>{
      this.tabswap.Tab1DrawnEvent.emit();
    });
  }
  colorChanged(event: any):void{
    this.canvasService.outlineColor = event.detail.value;
    console.log(event.detail.value);
    this.canvasService.drawImageOnCanvas().then((result)=>{
      this.tabswap.Tab1DrawnEvent.emit();
    });
  }
  async presentAlert1() {
    const alert1 = await this.alertController.create({
      header: 'Select option to change',
      inputs: [
        {
          type: 'radio',
          label: 'Font Size',
          value: 'Font Size',
          checked: true, 
        },
        {
          type: 'radio',
          label: 'Font Color',
          value: 'Font Color',
        }
      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Alert closed');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            
            this.selectedOption = data;
            console.log(this.selectedOption);
            this.presentAlert2();
          },
        },
      ],
    });

    await alert1.present();
    

    
  }
  async presentAlert2()
  {
    if(this.selectedOption == "Font Color")
    {
      const alert2 = await this.alertController.create({
        header: 'Select option to change',
        inputs: [
          {
            label: 'Black',
            type: 'radio',
            value: '#000000',
          },
          {
            label: 'Blue',
            type: 'radio',
            value: '#0e4aed',
          }
        
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert closed');
            },
          },
          {
            text: 'OK',
            handler: (data) => {
              
              this.selectedOption = data;
              console.log(this.selectedOption);
              this.changeFontColor();
            },
          },
        ],
      });
      await alert2.present()
    }
    if(this.selectedOption == "Font Size")
    {
      const alert3 = await this.alertController.create({
        header: 'Select option to change',
        inputs: [
          {
            label: '12px',
            type: 'radio',
            value: '12px',
          },
          {
            label: '20px',
            type: 'radio',
            value: '20px',
          }
        
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert closed');
            },
          },
          {
            text: 'OK',
            handler: (data) => {
              
              this.selectedOption = data;
              console.log(this.selectedOption);
              this.changeFontSize();

            },
          },
        ],
      });
      await alert3.present()
    }
  }
  changeFontColor():void{
    this.fontColor = this.selectedOption;
    console.log("test");
  }
  changeFontSize():void{
    this.fontSize = this.selectedOption;
    console.log("test");
  }

}



