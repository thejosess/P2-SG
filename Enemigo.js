import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'

class Enemigo
 extends THREE.Object3D{
    constructor(){
        super();

        //por defecto los enemigos tienen dos vidas
        this.vida = 2
        this.visible = true

    }

    quitarVida(){
        if(this.vida != 0){
            this.vida -=1
        }
        if(this.vida == 0){
            this.visible = false
        }
    }



}
        
export { Enemigo };
