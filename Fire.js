import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'


class Fire extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/fire/fire.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/fire/fire.obj',
            function(object){
                var modelo = object;
                var modelo = object
                that.add(modelo);
            },null,null);
        });


        
         
        this.scale.set(5,5,5)     
    }
}

export { Fire };
