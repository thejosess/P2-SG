import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import { Vector3 } from './libs/three.module.js'
import { Tween } from './libs/tween.esm.js';
import { Link } from './Link.js';

class AttackSword extends THREE.Object3D {
    constructor() {
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/attack_sword_model/attack_sword.mtl',
            function(materials) {
                objectLoader.setMaterials(materials);
                objectLoader.load('models/attack_sword_model/attack_sword.obj',
                    function(object) {
                        var modelo = object;
                        that.add(modelo);
                    }, null, null);
            });

        this.orientacion = AttackSword.LOOK_AT_DOWN
        this.position.x = Link.position.x
        console.log(this.rotation.y)

        this.scale.set(100,100,100)

        this.direccion = 0
    }

    orientacionAttackSword(orientacion){
        if(this.orientacion != orientacion){

            switch(orientacion) {
                case AttackSword.LOOK_AT_UP:
                  this.rotation.y=2*Math.PI
                break;

                case AttackSword.LOOK_AT_DOWN:
                  this.rotation.y=Math.PI
                break;

                case AttackSword.LOOK_AT_RIGHT:
                    this.rotation.y=Math.PI/2
                break;

                case AttackSword.LOOK_AT_LEFT:
                  this.rotation.y=3*Math.PI/2
                break;
              }
        }

    }

    lanzarEspada(orientacionLink) {
        switch(orientacionLink) {
            case Link.LOOK_AT_UP:
                this.direccion = 1
            break;

            case Link.LOOK_AT_DOWN:
                this.direccion = 2
            break;

            case Link.LOOK_AT_RIGHT:
                this.direccion = 3
            break;

            case Link.LOOK_AT_LEFT:
                this.direccion = 4
            break;
        }
    }

    update() {
        switch(this.direccion) {
            case 1:
                this.position.y+=0.1
            break;

            case 2:
                this.position.y+=-1.5
            break;

            case 3:
                this.position.x+=1.5
            break;

            case 4:
                this.position.x+=-1.5   
            break;
        }
    }   
}

AttackSword.LOOK_AT_UP = 5;
AttackSword.LOOK_AT_DOWN = 6;
AttackSword.LOOK_AT_RIGHT = 7;
AttackSword.LOOK_AT_LEFT = 7;

export { AttackSword };