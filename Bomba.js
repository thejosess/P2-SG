import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import * as TWEEN from '../libs/tween.esm.js'
import { Vector3 } from './libs/three.module.js'


class Bomba extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/bomb/bomba.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/bomb/bomba.obj',
            function(object){
                var modelo = object;
                var modelo = object
                that.add(modelo);
            },null,null);
        });

        this.visible = true

        var geometry = new THREE.BoxGeometry(2, 3, 2);
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        this.cube = new THREE.Mesh( geometry, material );
        this.cube.name="cubo_mar"
        this.cube.visible=false
        this.add(this.cube)


        this.scale.set(125,125,125)
    }
}

export { Bomba };
