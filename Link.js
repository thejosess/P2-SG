import * as THREE from './libs/three.module.js'
import { MTLLoader } from './libs/MTLLoader.js'
import { OBJLoader } from './libs/OBJLoader.js'
import { Vector3 } from './libs/three.module.js'

class Link extends THREE.Object3D{
    constructor(){
        super();
        var that = this;
        var materiaLoader = new MTLLoader();
        var objectLoader = new OBJLoader();
        materiaLoader.load('models/link_model/link_base.mtl',
        function(materials){
            objectLoader.setMaterials(materials);
            objectLoader.load('models/link_model/link_base.obj',
            function(object){
                var modelo = object;
                var modelo = object
                that.add(modelo);
            },null,null);
        });
        
        /* Se hace este escalado tan grande porque en blender al exportar el modelo
        nos salen artifacts que se solucionan si el tamaño en blender es muy pequeño
        y luego al importarlo aqui, se escala a un tamaño apropiado. */
        this.scale.set(2000,2000,2000)
    }

    //change_model(string url_modelo)
    //para cambiar el tema del modelo del personaje segun el objeto que lleve?
    //esta que llame a otra vez a load? como se hace arriba?
    //poner lo de los FPS para ver como va

    moverLink(){



    }


    update(){
        /*onKeyPressed(){
    
        }*/
    }
    

}




export { Link };
