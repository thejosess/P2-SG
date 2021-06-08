import * as THREE from './libs/three.module.js'
import {Arbol} from './Arbol.js'
import {Roca} from './Roca.js'
import {Octorok_with_attack} from './Octorok_with_attack.js'

class NivelBosque extends THREE.Object3D{
    constructor(anchura, altura){
        super();

        // Se crea un plano para el suelo
        // altura/5,0.2,anchura/5
        //tal y como tenemos el juego, no queremos altura
        // y la altura será nuestra profundidad
        var geometryGround = new THREE.BoxGeometry (anchura/6,0.2,altura/18);
        
        // El material se hará con una textura de arena o tierra
        var texture = new THREE.TextureLoader().load('./imgs/sand_ground.jpg');
        var materialGround = new THREE.MeshPhongMaterial ({map: texture, /*color:0x00FF00*/});
        //este crea la textura mas larga para el resto de niveles porque es la misma
        //y asi no se ven los "cortes" de la textura
        
        // Ya se puede construir el Mesh
        var ground = new THREE.Mesh (geometryGround, materialGround);
        
        // Todas las figuras se crean centradas en el origen.
        // El suelo lo bajamos la mitad de su altura para que el origen del mundo se quede en su lado superior
        ground.position.y = -0.1;
        this.add(ground)
        this.arbol = new Arbol();

        this.array_obstaculos = new Array()
        this.crearArboleda()

        //rocas importantes que dan acceso al sitio secreto
        this.roca = new Roca();
        this.roca.position.z = 22.5
        //this.roca.modelo.scale.set(30000,30000,30000)
        this.add(this.roca)

        this.roca2 = new Roca();
        this.roca2.position.z = 22.5
        this.roca2.position.x = -3.5
        //this.roca2.modelo.scale.set(30000,30000,30000)
        this.add(this.roca2)

        this.roca3 = new Roca();
        this.roca3.position.z = 22.5
        this.roca3.position.x = -6.5
        //this.roca3.modelo.scale.set(30000,30000,30000)
        this.add(this.roca3)

        this.roca4 = new Roca();
        this.roca4.position.z = 22.5
        this.roca4.position.x = 5
        //this.roca4.modelo.scale.set(30000,30000,30000)
        this.add(this.roca4)

        this.octorok = new Octorok_with_attack()
        this.octorok.name = "Octorok"
        this.octorok.position.x = -5
        this.octorok.position.z = 12
        this.octorok.rotateY(Math.PI)
        this.add(this.octorok)

        //array con los enemigos

        this.array_enemigos = new Array()
        this.array_enemigos =  [this.octorok]

        this.array_obstaculos =  [
            this.arbol,this.arbol2,this.arbol3, this.arbol4, this.arbol5,this.arbol6, this.arbol7, this.arbol8,
            this.arbol9,this.arbol10,this.arbol11, this.arbol12, this.arbol13,this.arbol14, this.arbol15, this.arbol16,
            this.arbol17,this.arbol18,this.arbol19, this.arbol20, this.arbol21,this.arbol22, this.arbol23, this.arbol24,
            this.arbol25,this.arbol26,this.arbol27, this.arbol28, this.arbol29,this.arbol30, this.arbol31, this.arbol32,
            this.arbol33, this.roca, this.roca2, this.roca3, this.roca4
            //this.roca2, this.roca 
        ]
    }

    devolverEnemigos(){
        return this.array_enemigos
    }

    devolverObstaculos(){
        return this.array_obstaculos
    }

    crearArboleda(){

        //lateral izquierda
        this.arbol.position.x = 25
        this.add(this.arbol)

        this.arbol2 = new Arbol();
        this.arbol2.position.x = 25.5
        this.arbol2.position.z = 3.6
        this.add(this.arbol2)

        this.arbol3 = new Arbol();
        this.arbol3.position.x = 26
        this.arbol3.position.z = 7.2
        this.add(this.arbol3)

        this.arbol4 = new Arbol();
        this.arbol4.position.x = 26.5
        this.arbol4.position.z = 10.8
        this.add(this.arbol4)


        this.arbol5 = new Arbol();
        this.arbol5.position.x = 27.4
        this.arbol5.position.z = 14.4
        this.add(this.arbol5)

        this.arbol6 = new Arbol();
        this.arbol6.position.x = 28
        this.arbol6.position.z = 18
        this.add(this.arbol6)

        //esquina inferior abajo
        this.arbol7 = new Arbol();
        this.arbol7.position.x = 24.5
        this.arbol7.position.z = -3
        this.add(this.arbol7)

        this.arbol8 = new Arbol();
        this.arbol8.position.x = 24
        this.arbol8.position.z = -6
        this.add(this.arbol8) 
        
        //lateral abajo

        //lateral izquierda
        this.arbol9 = new Arbol();
        this.arbol9.position.x = 21
        this.arbol9.position.z = -8
        this.add(this.arbol9)

        this.arbol10 = new Arbol();
        this.arbol10.position.x = 17.4
        this.arbol10.position.z = -8
        this.add(this.arbol10)

        this.arbol11 = new Arbol();
        this.arbol11.position.x = 13.8
        this.arbol11.position.z = -8
        this.add(this.arbol11)

        this.arbol12 = new Arbol();
        this.arbol12.position.x = 10.2
        this.arbol12.position.z = -8
        this.add(this.arbol12)


        this.arbol13 = new Arbol();
        this.arbol13.position.x = 6.6
        this.arbol13.position.z = -8
        this.add(this.arbol13)

        this.arbol14 = new Arbol();
        this.arbol14.position.x = 3
        this.arbol14.position.z = -8
        this.add(this.arbol14)

        this.arbol15 = new Arbol();
        this.arbol15.position.x = -0.6
        this.arbol15.position.z = -8
        this.add(this.arbol15)

        this.arbol16 = new Arbol();
        this.arbol16.position.x = -4.2
        this.arbol16.position.z = -8
        this.add(this.arbol16)

        this.arbol17 = new Arbol();
        this.arbol17.position.x = -7.4
        this.arbol17.position.z = -8
        this.add(this.arbol17)

        this.arbol17 = new Arbol();
        this.arbol17.position.x = -11
        this.arbol17.position.z = -8
        this.add(this.arbol17)


        this.arbol18 = new Arbol();
        this.arbol18.position.x = -14.6
        this.arbol18.position.z = -8
        this.add(this.arbol18)

        this.arbol19 = new Arbol();
        this.arbol19.position.x = -18.2
        this.arbol19.position.z = -8
        this.add(this.arbol19)

        this.arbol20 = new Arbol();
        this.arbol20.position.x = -21.8
        this.arbol20.position.z = -8
        this.add(this.arbol20)

        
        //lateral derecha


        this.arbol21 = new Arbol();
        this.arbol21.position.x = -21.8
        this.arbol21.position.z = 7.2
        this.add(this.arbol21)

        this.arbol22 = new Arbol();
        this.arbol22.position.x = -21.8
        this.arbol22.position.z = 10.8
        this.add(this.arbol22)


        this.arbol23 = new Arbol();
        this.arbol23.position.x = -21.8
        this.arbol23.position.z = 14.4
        this.add(this.arbol23)

        this.arbol24 = new Arbol();
        this.arbol24.position.x = -21.8
        this.arbol24.position.z = 18
        this.add(this.arbol24)

        //esquina inferior abajo
        this.arbol25 = new Arbol();
        this.arbol25.position.x = -21.8
        this.arbol25.position.z = -3
        this.add(this.arbol25)

        this.arbol26 = new Arbol();
        this.arbol26.position.x = -21.8
        this.arbol26.position.z = -6
        this.add(this.arbol26) 



        //lateral arriba

        this.arbol27 = new Arbol();
        this.arbol27.position.x = 24
        this.arbol27.position.z = 20
        this.add(this.arbol27)

        this.arbol28 = new Arbol();
        this.arbol28.position.x = 20.4
        this.arbol28.position.z = 20
        this.add(this.arbol28)

        this.arbol29 = new Arbol();
        this.arbol29.position.x = 16.8
        this.arbol29.position.z = 20
        this.add(this.arbol29)

        this.arbol30 = new Arbol();
        this.arbol30.position.x = 13.2
        this.arbol30.position.z = 20
        this.add(this.arbol30)


        this.arbol31 = new Arbol();
        this.arbol31.position.x = 9.6
        this.arbol31.position.z = 20
        this.add(this.arbol31)

        this.arbol32 = new Arbol();
        this.arbol32.position.x = 6
        this.arbol32.position.z = 20
        this.add(this.arbol32)

        this.arbol33 = new Arbol();
        this.arbol33.position.x = -9.2
        this.arbol33.position.z = 20
        this.add(this.arbol33)

        this.arbol34 = new Arbol();
        this.arbol34.position.x = -12.8
        this.arbol34.position.z = 20
        this.add(this.arbol34)

        this.arbol35 = new Arbol();
        this.arbol35.position.x = -16.4
        this.arbol35.position.z = 20
        this.add(this.arbol35)



    }

    update(){
        this.octorok.update()
    }
}

export { NivelBosque };
