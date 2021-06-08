import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'

class Camino extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/camino/camino.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/camino/camino.obj',
            function(object){
                var modelo = object;
                var modelo = object
                that.add(modelo);
            },null,null);
        });


        
         
        this.scale.set(110,110,110)
        this.rotateY(Math.PI/2)
     
    }
}

export { Camino };
