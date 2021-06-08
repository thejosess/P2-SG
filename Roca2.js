import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'


class Roca2 extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/rock2_model/rock2.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/rock2_model/rock2.obj',
            function(object){
                var modelo = object;
                var modelo = object
                that.add(modelo);
            },null,null);
        });


        
         
        this.scale.set(150,150,150)
    }
}

export { Roca2 };
