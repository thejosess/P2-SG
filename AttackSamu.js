import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'


class AttackSamu extends THREE.Object3D{
    constructor(samu){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/attack_samu/attack_samu.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/attack_samu/attack_samu.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(120,120,120)
                that.add(modelo);
            },null,null);
        });

        var geometry = new THREE.BoxGeometry( 3, 10, 3 );
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.visible = false
        this.add(this.cube)

        this.muerto = false

        this.factor_aleatorio = 0


        this.aux = true

        this.ref_samu = samu;
        this.name = "Attack"


    }

    paraAtaque(){
        this.muerto = true
        this.visible = false
    }


    ataque(){
        if(!this.muerto){
                if(this.position.x > 20 ){ 
                    this.visible = true
                    this.position.x = this.ref_samu.position.x + this.factor_aleatorio
                    this.position.y = this.ref_samu.position.y + this.factor_aleatorio
                    this.position.z = this.ref_samu.position.z + this.factor_aleatorio
                }
                else if(this.position.x > 20){
                    this.visible = false
                }
                else{
                    this.position.x += 0.5
                }
        }
    }


}

AttackSamu.LOOK_AT_UP = 5;
AttackSamu.LOOK_AT_DOWN = 6;
AttackSamu.LOOK_AT_RIGHT = 7;
AttackSamu.LOOK_AT_LEFT = 8;

export { AttackSamu };
