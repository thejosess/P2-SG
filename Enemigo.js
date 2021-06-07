import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'

class Enemigo
 extends THREE.Object3D{
    constructor(){
        super();

        //por defecto los enemigos tienen dos vidas_link
        this.vida = 2
        this.visible = true

    }

    quitarVida(cantidad_vida){
        if(this.vida != 0){
            this.vida -= cantidad_vida
        }
        if(this.vida <= 0 ){
            this.visible = false
        }
    }



}
        
export { Enemigo };
