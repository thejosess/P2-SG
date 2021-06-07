import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import { AttackSamu } from './AttackSamu.js'
import { Samu } from './Samu.js'
import {Enemigo} from './Enemigo.js'


class Samu_with_attack extends  THREE.Object3D{
    constructor(){
        super();
        this.samu = new Samu()
        this.add(this.samu)

        //this.Samu.orientacion = Samu.LOOK_AT_DOWN;

        /* Se hace este escalado tan grande porque en blender al exportar el modelo
        nos salen artifacts que se solucionan si el tamaño en blender es muy pequeño
        y luego al importarlo aqui, se escala a un tamaño apropiado. */

        this.attack = new AttackSamu(this.samu)
        this.attack.rotateY(Math.PI/2)
        this.add(this.attack)
        //this.attack.visible = false

        this.attack2 = new AttackSamu(this.samu)
        this.attack2.factor_aleatorio = 0.08
        this.attack2.rotateY(Math.PI/2)
        this.add(this.attack2)
        //this.attack.visible = false



        //TODO revisar
        //this.vida = 1
        this.name = 'Samu'
        this.muerto = false
    }


            
    lanzar_ataque(){
/*         console.log("position fuera attack"+ this.position.x + " " + 
        this.position.y + " " + this.position.z) */
        if(!this.muerto){
            this.attack.ataque()
            this.attack2.ataque()
        }
    }

    change_attack_visibility(){
        this.attack.visible = false
    }

    update(){
        this.samu.rutaSamu()
        this.lanzar_ataque()
    }
}

//Orientaciones de Link
Samu_with_attack.LOOK_AT_UP = 5;
Samu_with_attack.LOOK_AT_DOWN = 6;
Samu_with_attack.LOOK_AT_RIGHT = 7;
Samu_with_attack.LOOK_AT_LEFT = 8;

export { Samu_with_attack };
