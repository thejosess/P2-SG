import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'


class Alga extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/algas/seaweedgate.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/algas/seaweedgate.obj',
            function(object){
                var modelo = object;
                var modelo = object
                that.add(modelo);
            },null,null);
        });


        
         
        this.scale.set(10,10,10)
    }
}

export { Alga };
