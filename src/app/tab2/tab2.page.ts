import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CanvasService } from '../canvas.service';
import { TabSwapService } from '../tab-swap.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit{

  text=""
  filename=""
  @ViewChild('canvas2', { static: false }) canvas2!: ElementRef;
  constructor(private canvasService:CanvasService, private tabswap: TabSwapService) {
    
  }
      
    ngOnInit() {
      
    }
   
    ngAfterViewInit():void{
      this.tabswap.Tab1DrawnEvent.subscribe(() =>{
        this.canvasService.canvas= this.canvas2;
        this.canvasService.context=this.canvas2.nativeElement.getContext("2d");
        this.canvasService.drawImageOnCanvas().then((result)=>{
          console.log("this is:", result);
          this.tabswap.Tab2DrawnEvent.emit();
        });
    });
      if(this.canvasService.drawnOnMain)
      {
        this.previewIt();
        
        
      }
    }
  
    previewIt():void{
    this.text=this.canvasService.text;
    console.log("testspecial");
    this.canvasService.canvas = this.canvas2;
    console.log(this.canvas2);
    this.canvasService.context = this.canvasService.canvas.nativeElement.getContext("2d");
    this.canvasService.drawImageOnCanvas().then((result)=>{
      console.log("this is:", result);
      this.tabswap.Tab2DrawnEvent.emit();
    })
    
    
    
  }

  saveIt():void{
    var dataUrl = this.canvasService.canvas.nativeElement.toDataURL();
    const blob = this.dataURLtoBlob(dataUrl);
    this.writeFile(blob);
  }
  private dataURLtoBlob(dataURL: string): Blob {
    const arr = dataURL.split(',');
    const matchResult = arr[0].match(/:(.*?);/);
  
    if (matchResult && matchResult[1]) {
      const mime = matchResult[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
  
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
  
      return new Blob([u8arr], { type: mime });
    } else {
      throw new Error('Invalid data URL format');
    }
  }

  async writeFile(bl: Blob) {
    const base64Data = await this.blobToBase64(bl);
    

      await Filesystem.writeFile({
        path: `${this.filename}.jpeg`,
        data: base64Data,
        directory: Directory.Documents,
      });
    
  }
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert Blob to base64'));
        }
      };
      reader.readAsDataURL(blob);
    });
  }
  
}
