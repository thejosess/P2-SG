import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import {Enemigo} from './Enemigo.js'


class Octorok extends Enemigo{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/octorok/octorok.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/octorok/octorok.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(200,200,200)
                that.add(modelo);
            },null,null);
        });

        var geometry = new THREE.BoxGeometry( 5.5, 10, 5.5 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.visible = false
        this.add(this.cube)
        this.fin_recorrido_z = false
        this.fin_recorrido_x = true

        this.fin_recorrido_z_2 = true
        this.fin_recorrido_x_2 = true

        this.signo_recorrido_z = +1
        this.signo_recorrido_x = +1
        

        this.orientacion = Octorok.LOOK_AT_DOWN;
        this.name = 'Octorok'

         

    }

    rutaOctorok(){
        if(!this.fin_recorrido_z){
            if((this.position.z | 0) == 10){
                this.fin_recorrido_z = true
                this.fin_recorrido_x = false
                this.rotateY(Math.PI/2)
                this.orientacion = Octorok.LOOK_AT_RIGHT;
            }
            if(!this.fin_recorrido_z){
                this.orientacion = Octorok.LOOK_AT_DOWN
                this.position.z += 0.15
            }
        }

        if(!this.fin_recorrido_x){
            if((this.position.x | 0) == 12){
                
                this.fin_recorrido_x = true
                this.fin_recorrido_z_2 = false
                this.rotateY(Math.PI/2)
                this.orientacion = Octorok.LOOK_AT_UP;
            } 
            if(!this.fin_recorrido_x){
                this.position.x += 0.15 

            }
        }

        if(!this.fin_recorrido_z_2){
            if((this.position.z | 0) == 0){
                this.fin_recorrido_z_2 = true
                this.fin_recorrido_x_2 = false
                this.rotateY(Math.PI/2)
                this.orientacion = Octorok.LOOK_AT_LEFT;
            }
            if(!this.fin_recorrido_z_2){
                this.position.z -= 0.15
            }  
        }

        if(!this.fin_recorrido_x_2){
            if((this.position.x | 0) == 0){
                this.fin_recorrido_x_2 = true
                this.fin_recorrido_z = false
                this.rotateY(Math.PI/2)
            } 
            if(!this.fin_recorrido_x_2){
                this.position.x -= 0.15 

            }
        }


    }

}

//Orientaciones de Link
Octorok.LOOK_AT_UP = 5;
Octorok.LOOK_AT_DOWN = 6;
Octorok.LOOK_AT_RIGHT = 7;
Octorok.LOOK_AT_LEFT = 8;

export { Octorok };
