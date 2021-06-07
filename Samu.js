import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import { AttackOctorok } from './AttackOctorok.js'
import {Enemigo} from './Enemigo.js'


class Samu extends Enemigo{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/samu_boss/samu.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/samu_boss/samu.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(200,200,200)
                that.add(modelo);
            },null,null);
        });

        var geometry = new THREE.BoxGeometry( 8.6, 18, 8.6 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.visible = false
        this.add(this.cube)
        this.fin_recorrido_z = false
        this.fin_recorrido_x = true

        this.fin_recorrido_z_2 = true
        this.fin_recorrido_x_2 = true

        this.signo_recorrido = -1

        this.rotateY(Math.PI/2)

        //TODO revisar vidas
        this.vida = 5
        

        this.orientacion = Samu.LOOK_AT_DOWN;
        this.name = 'Samu'

        /* Se hace este escalado tan grande porque en blender al exportar el modelo
        nos salen artifacts que se solucionan si el tamaño en blender es muy pequeño
        y luego al importarlo aqui, se escala a un tamaño apropiado. */

    }

    rutaSamu(){
         if(this.position.z == -7){
            this.signo_recorrido = +1
        }
         if(this.position.z == 15){
             this.signo_recorrido = -1
        }  
 
        this.position.z += (this.signo_recorrido)*0.25

    }

}

//Orientaciones de Link
Samu.LOOK_AT_UP = 5;
Samu.LOOK_AT_DOWN = 6;
Samu.LOOK_AT_RIGHT = 7;
Samu.LOOK_AT_LEFT = 8;

export { Samu };
