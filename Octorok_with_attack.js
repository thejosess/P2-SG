import * as THREE from './libs/three.module.js'
import { AttackOctorok } from './AttackOctorok.js'
import { Octorok } from './Octorok.js'


class Octorok_with_attack extends  THREE.Object3D{
    constructor(){
        super();
        this.octorok = new Octorok()
        this.add(this.octorok)

        //this.octorok.orientacion = Octorok.LOOK_AT_DOWN;

         

        this.attack = new AttackOctorok(this.octorok)
        this.add(this.attack)


        this.name = 'Octorok'
        this.muerto = false
    }


            
    lanzar_ataque(){
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
