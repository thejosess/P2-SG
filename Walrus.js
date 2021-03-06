import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import {Enemigo} from './Enemigo.js'


class Walrus extends Enemigo{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/walrus/walrus.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/walrus/walrus.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(100,100,100)
                that.add(modelo);
            },null,null);
        });

        var geometry = new THREE.BoxGeometry( 5, 11, 5 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.visible = false
        this.add(this.cube)
        this.fin_recorrido = false
        this.signo_recorrido = -1

        this.vida = 4

        this.rotateY(Math.PI / 2)
        

        this.orientacion = Walrus.LOOK_AT_DOWN;
        this.name = 'Walrus'

         

    }

    rutaTektite(){
       if(this.position.x == -80){
           this.signo_recorrido = +1
       }
       if(this.position.x == -60){
            this.signo_recorrido = -1
       }

       this.position.x = (this.position.x) + (this.signo_recorrido)*0.5
    }

}

//Orientaciones de Walrus
Walrus.LOOK_AT_UP = 5;
Walrus.LOOK_AT_DOWN = 6;
Walrus.LOOK_AT_RIGHT = 7;
Walrus.LOOK_AT_LEFT = 8;

export { Walrus };
