import * as THREE from './libs/three.module.js'
import { AttackSamu } from './AttackSamu.js'
import { Samu } from './Samu.js'


class Samu_with_attack extends  THREE.Object3D{
    constructor(){
        super();
        this.samu = new Samu()
        this.add(this.samu)         

        this.attack = new AttackSamu(this.samu)
        this.attack.rotateY(Math.PI/2)
        this.add(this.attack)

        this.attack2 = new AttackSamu(this.samu)
        this.attack2.factor_aleatorio = 0.08
        this.attack2.rotateY(Math.PI/2)
        this.add(this.attack2)

        this.name = 'Samu'
        this.muerto = false
    }


            
    lanzar_ataque(){
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

//Orientaciones de Samu_with_attack
Samu_with_attack.LOOK_AT_UP = 5;
Samu_with_attack.LOOK_AT_DOWN = 6;
Samu_with_attack.LOOK_AT_RIGHT = 7;
Samu_with_attack.LOOK_AT_LEFT = 8;

export { Samu_with_attack };
