import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import { AttackOctorok } from './AttackOctorok.js'
import {Enemigo} from './Enemigo.js'


class Tektite extends Enemigo{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/tektite/tektite.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/tektite/tektite.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(120,120,120)
                that.add(modelo);
            },null,null);
        });

        var geometry = new THREE.BoxGeometry( 4, 10, 4 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.visible = false
        this.add(this.cube)
        this.fin_recorrido = false
        this.signo_recorrido = -1
        

        this.name = 'Tektite'

        /* Se hace este escalado tan grande porque en blender al exportar el modelo
        nos salen artifacts que se solucionan si el tamaño en blender es muy pequeño
        y luego al importarlo aqui, se escala a un tamaño apropiado. */

    }

    rutaTektite(){
       if(this.position.x == -80){
           this.signo_recorrido = +1
           this.rotateY(Math.PI)
       }
       if(this.position.x == -60){
            this.signo_recorrido = -1
            this.rotateY(Math.PI)
       }

       this.position.x = (this.position.x) + (this.signo_recorrido)*0.5
    }

}

export { Tektite };
