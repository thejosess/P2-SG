import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'


class Arbusto extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/grass_model/grass.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/grass_model/grass.obj',
            function(object){
                var modelo = object;
                var modelo = object
                that.add(modelo);
            },null,null);
        });


        
         
        this.scale.set(125,125,125)
    }
}

export { Arbusto };
