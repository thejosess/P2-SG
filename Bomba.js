import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'

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

        this.contador = 0
        this.explotando = false
    }

    update() {
        this.contador += 1
        if(this.contador == 11) {
            this.explotando = false
            this.visible = false
        }
    }
}

export { Bomba };
