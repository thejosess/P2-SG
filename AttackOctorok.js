import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'


class AttackOctorok extends THREE.Object3D{
    constructor(octorok){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/attack_octorok/attack_octorok.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/attack_octorok/attack_octorok.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(120,120,120)
                that.add(modelo);
            },null,null);
        });

        var geometry = new THREE.BoxGeometry( 2, 10, 2 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.visible = false
        this.add(this.cube)

        this.muerto = false


        this.aux = true

        this.ref_octorok = octorok;
        this.name = "Attack"
        //this.visible = false
        
        /* Se hace este escalado tan grande porque en blender al exportar el modelo
        nos salen artifacts que se solucionan si el tamaño en blender es muy pequeño
        y luego al importarlo aqui, se escala a un tamaño apropiado. */
        //this.position.x = 5
        

    }

    paraAtaque(){
        this.muerto = true
        this.visible = false
    }


    ataque(){
/*         console.log("position del atack" + this.position.z)
        console.log("position de octorok" + this.ref_octorok.position.z) */

        if(!this.muerto){

            switch(this.ref_octorok.orientacion) {


                case AttackOctorok.LOOK_AT_DOWN:
                    if(this.ref_octorok.position.z < 2 ){ 
                        this.visible = true
                        this.position.x = this.ref_octorok.position.x
                        this.position.y = this.ref_octorok.position.y
                        this.position.z = this.ref_octorok.position.z
                    }
                    else if(this.position.z > 17){
                        this.visible = false
                    }
                    else{
                        this.position.z += 0.3
                    }
                break;

                // LOOK_AT_UP
                case AttackOctorok.LOOK_AT_UP:
                    //console.log("position de octorok" + this.ref_octorok.position.z)

                    //valores de posicion del octorok
                    if(this.ref_octorok.position.z > 9.8 ){ 
                        this.visible = true
                        this.position.x = this.ref_octorok.position.x 
                        this.position.y = this.ref_octorok.position.y 
                        this.position.z = this.ref_octorok.position.z 
                    }
                    else if(this.position.z < -7){
                        this.visible = false
                    }
                    else {
                        //console.log("entrando")
                        //this.position.z = 5
                        this.position.z -= 0.3
                    }

                break;

                case AttackOctorok.LOOK_AT_LEFT:
                    if(this.ref_octorok.position.x > 11 ){ 
                        this.visible = true
                        this.position.x = this.ref_octorok.position.x
                        this.position.y = this.ref_octorok.position.y
                        this.position.z = this.ref_octorok.position.z
                    }
                    else if(this.position.x > 20){
                        this.visible = false
                    }
                    else{
                        this.position.x -= 0.3
                    }
                break;

                case AttackOctorok.LOOK_AT_RIGHT:
                    if(this.ref_octorok.position.x < 2 ){ 
                        this.visible = true
                        this.position.x = this.ref_octorok.position.x
                        this.position.y = this.ref_octorok.position.y
                        this.position.z = this.ref_octorok.position.z
                    }
                    else if(this.position.x > 20){
                        this.visible = false
                    }
                    else{
                        this.position.x += 0.3
                    }
                break;
            }
        }
}


}

AttackOctorok.LOOK_AT_UP = 5;
AttackOctorok.LOOK_AT_DOWN = 6;
AttackOctorok.LOOK_AT_RIGHT = 7;
AttackOctorok.LOOK_AT_LEFT = 8;

export { AttackOctorok };