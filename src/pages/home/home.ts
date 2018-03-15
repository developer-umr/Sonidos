import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ANIMALES } from "../../data/data.animales";

import {Animal} from "../../interfaces/animales.interface";
import {Refresher, reorderArray} from "Ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales:Animal[]=[];
  audio=new Audio();
  audioTiempo:any;
  ordenando:boolean=false;
  
  constructor(public navCtrl: NavController) {
    this.animales=ANIMALES.slice(0);
  }
  reproducir(animal:Animal){
    console.log( animal );
    this.pausar_audio(animal);
    if(animal.reproduciendo == true){
      animal.reproduciendo=false;
      return;
    }
    this.audio.src=animal.audio;

    this.audio.load();
    this.audio.play();
    animal.reproduciendo=true;

    this.audioTiempo=setTimeout(()=> animal.reproduciendo=false, animal.duracion * 1000 );
  }

  private pausar_audio(animalSel:Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime=0;
    for(let animal of this.animales){
      if(animal.nombre != animalSel.nombre){
        animal.reproduciendo=false;
      }
    }
  }

  private borrarAnimal(idx:number, animal:Animal){
    //si esta reprouciendo y se elimina la reproduccion tambien debe de detenerse
    this.pausar_audio(animal);
    this.animales.splice(idx, 1);
  }
  private recargar_animales(refresher:Refresher){
    console.log("Comenzo el refresh");
    setTimeout( ()=>{
      this.animales=ANIMALES.slice(0);
      refresher.complete();
      console.log("Termino el refresh");
    },1500);
  }
  private reordenar_animales(indices:any){
    console.log(indices);
    this.animales=reorderArray(this.animales, indices);
  }
}
