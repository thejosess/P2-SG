import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'

class Enemigo
 extends THREE.Object3D{
    constructor(){
        super();

        //por defecto los enemigos tienen dos vidas
        this.vidas = 2
        this.visible = true

    }

    quitarVida(){
        if(this.vidas != 0){
            this.vidas -=1
        }
        if(this.vidas == 0){
            this.visible = false
        }
    }



}
        
export { Enemigo };
