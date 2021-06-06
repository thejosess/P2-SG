import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'
import { ThreeBSP } from './libs/ThreeBSP.js'


class RedSword extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/attack_sword_model/attack_sword_red.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/attack_sword_model/attack_sword_red.obj',
            function(object){
                var modelo = object;
                var modelo = object
                modelo.scale.set(1, 1, 1)
                that.add(modelo);
            },null,null);
        });

        var geometry = new THREE.BoxGeometry(3, 10, 3);
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.name="cubo"
        this.cube.visible=false
        this.add(this.cube)
     
    }
}

export { RedSword };