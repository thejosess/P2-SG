import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import { AttackOctorok } from './AttackOctorok.js'
import { Octorok } from './Octorok.js'
import {Enemigo} from './Enemigo.js'


class Octorok_with_attack extends  THREE.Object3D{
    constructor(){
        super();
        this.octorok = new Octorok()
        this.add(this.octorok)

        //this.octorok.orientacion = Octorok.LOOK_AT_DOWN;

        /* Se hace este escalado tan grande porque en blender al exportar el modelo
        nos salen artifacts que se solucionan si el tamaño en blender es muy pequeño
        y luego al importarlo aqui, se escala a un tamaño apropiado. */

        this.attack = new AttackOctorok(this.octorok)
        this.add(this.attack)


        this.vida = 2
        this.name = 'Octorok'
        this.muerto = false
    }


            
    lanzar_ataque(){
/*         console.log("position fuera attack"+ this.position.x + " " + 
        this.position.y + " " + this.position.z) */
        if(!this.muerto){
            this.attack.ataque()
        }
    }

    change_attack_visibility(){
        this.attack.visible = false
    }

    update(){
        this.octorok.rutaOctorok()
        this.lanzar_ataque()
    }
}

//Orientaciones de Link
Octorok_with_attack.LOOK_AT_UP = 5;
Octorok_with_attack.LOOK_AT_DOWN = 6;
Octorok_with_attack.LOOK_AT_RIGHT = 7;
Octorok_with_attack.LOOK_AT_LEFT = 8;

export { Octorok_with_attack };
