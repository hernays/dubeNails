import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router , Params , Route   } from '@angular/router';

@Component({
  selector: 'app-giftcard',
  templateUrl: './giftcard.component.html',
  styleUrls: ['./giftcard.component.scss']
})
export class GiftcardComponent implements OnInit {
  public nombreServicio : string = 'Esmaltado Permanente';

  @ViewChild('regalo', {static: true}) regalo! : ElementRef;
  @ViewChild('caja'  , {static: true}) caja! : ElementRef;
  @ViewChild('fuegos', {static: true}) fuegos!: ElementRef;
  @ViewChild('card', {static:true}) card! : ElementRef;
  @ViewChild('body', {static:true}) body! : ElementRef;
  @ViewChild('cajah', {static:true}) cajah! : ElementRef;
  @ViewChild('audio', {static:true}) audio! : ElementRef;

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
   const servicio = this.router.url.split('/')[2];
   this.nombreServicio = servicio.replace('_',' ');
    
  }

  abrirRegalo(){
    if(this.regalo.nativeElement.classList.contains('regalo')){
      this.regalo.nativeElement.classList.replace('regalo','rapida');

      setTimeout(() => {

        this.caja.nativeElement.classList.add('ocultar');
        console.log(this.fuegos.nativeElement)
        setTimeout(() => {

             this.fuegos.nativeElement.classList.add('fuegos');
             this.fuegos.nativeElement.style.zIndex = '0';
             this.card.nativeElement.classList.add('cardAbrir');
             this.cajah.nativeElement.classList.add('cardAbrir');
             this.audio.nativeElement.classList.add('cardAbrir'); 
             this.body.nativeElement.classList.add('flexBody');
             this.body.nativeElement.classList.replace('fondoBody','imgBody');

              this.audio.nativeElement.play();  
        },1000)
      },5000)
    }
    
  }

 /*  fuegos.classList.add('fuegos');
             fuegos.src="assets/img/fuegos-artificiales.gif";
             card.classList.add('cardAbrir');
             body.classList.add('flexBody');
             cajah.classList.add('cardAbrir');
             audio.classList.add('cardAbrir');

             audio.play(); */

}
