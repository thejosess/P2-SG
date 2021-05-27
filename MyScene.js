
// Clases de la biblioteca

import * as THREE from './libs/three.module.js'
import { GUI } from './libs/dat.gui.module.js'
import { TrackballControls } from './libs/TrackballControls.js'
import Stats from './libs/Stats.js';


// Clases de mi proyecto

import {Link} from './Link.js'
import {NivelBosque} from './NivelBosque.js'
import {NivelBosque2} from './NivelBosque2.js'
import {NivelSecreto} from './NivelSecreto.js'
import {NivelMazmorra} from './NivelMazmorra.js'
import {NivelBoss} from './NivelBoss.js'
import {NivelMar} from './NivelMar.js'

/* ESTADOS INICIALES PARA EL METODO JUGAR */





/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */
class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
    this.resolucion_altura = 1920
    this.resolucoin_anchura = 915

    // Lo primero, crear el visualizador, pasándole el lienzo sobre el que realizar los renderizados.
    this.renderer = this.createRenderer(myCanvas);
    
    // Se añade a la gui los controles para manipular los elementos de esta clase
    this.gui = this.createGUI ();

    //creamos la informacion de fps
    this.stats = new Stats();

    this.stats.showPanel(0) ;  // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );

    
    // Construimos los distinos elementos que tendremos en la escena
    
    // Todo elemento que se desee sea tenido en cuenta en el renderizado de la escena debe pertenecer a esta. Bien como hijo de la escena (this en esta clase) o como hijo de un elemento que ya esté en la escena.
    // Tras crear cada elemento se añadirá a la escena con   this.add(variable)
    this.createLights ();

    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);
    
    // Tendremos una cámara con un control de movimiento con el ratón
    this.createCamera ();
/* 
    this.glass = new Glass(this.gui, "Dimensiones de la Caja");
    this.add (this.glass); */

    //el nivel en el que se comienza es en el de bosque 1
    this.game_level = MyScene.BOSQUE_1

    //estado del juego
    this.estado_juego = MyScene.START

    this.crearNiveles();
    this.crearPersonajes();

    

  }

  crearPersonajes(){
    this.link = new Link(this);
    this.add (this.link);
    //link necesita tener iniciado el array de obstaculos segun el primer nivel
    this.link.cargarObstaculos(this.bosque.devolverObstaculos())

  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    //this.camera.position.z = 24.75
    var look = new THREE.Vector3 (101,20,29.75);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.camera.position.set (0, 35,-5);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,20,0);
    // ,Y hacia dónde mira
    //var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    
    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new TrackballControls (this.camera, this.renderer.domElement);
    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }
  
  createGUI () {
    // Se crea la interfaz gráfica de usuario
    var gui = new GUI();
    
    // La escena le va a añadir sus propios controles. 
    // Se definen mediante una   new function()
    // En este caso la intensidad de la luz y si se muestran o no los ejes
    this.guiControls = new function() {
      // En el contexto de una función   this   alude a la función
      this.lightIntensity = 1;
      this.axisOnOff = true;
    }

    // Se crea una sección para los controles de esta clase
    var folder = gui.addFolder ('Luz y Ejes');
    
    // Se le añade un control para la intensidad de la luz
    folder.add (this.guiControls, 'lightIntensity', 0, 2, 0.1).name('Intensidad de la Luz : ');
    
    // Y otro para mostrar u ocultar los ejes
    folder.add (this.guiControls, 'axisOnOff').name ('Mostrar ejes : ');
    
    return gui;
  }
  
  createLights () {
    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como   var   y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    // La añadimos a la escena
    this.add (ambientLight);
    
    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    // Se recibe el lienzo sobre el que se van a hacer los renderizados. Un div definido en el html.
    
    // Se instancia un Renderer   WebGL
    var renderer = new THREE.WebGLRenderer();
    
    // Se establece un color de fondo en las imágenes que genera el render
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    
    // Se establece el tamaño, se aprovecha la totalidad de la ventana del navegador
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // La visualización se muestra en el lienzo recibido
    $(myCanvas).append(renderer.domElement);
    
    return renderer;  
  }
  
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }
  
  setCameraAspect (ratio) {
    // Cada vez que el usuario modifica el tamaño de la ventana desde el gestor de ventanas de
    // su sistema operativo hay que actualizar el ratio de aspecto de la cámara
    this.camera.aspect = ratio;
    // Y si se cambia ese dato hay que actualizar la matriz de proyección de la cámara
    this.camera.updateProjectionMatrix();
  }
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamapo de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);

    //volver a llamar a crearNiveles para adecuarlos al tamaño de la ventana
    //TODO revisar esto
    //this.bosque.resizeBosque(window.innerWidth, window.innerHeight)


  }

  changeCamera(game_level){
    //Metodo para cambiar la camara de posicion
    //this.camera.
    switch(game_level){
      case MyScene.BOSQUE_1:
        this.camera.position.set (0, this.camera.position.y,-5);
        //this.camera.position.x = 0
        var look = new THREE.Vector3 (0,20,0);
        this.camera.lookAt(look);
        this.cameraControl.target = look;

        this.estado_juego = MyScene.START
      break;

      case MyScene.BOSQUE_2:
        this.camera.position.set (-56, this.camera.position.y,-5);
        //this.camera.position.x = -56
        var look = new THREE.Vector3 (-56,20,0);
        this.camera.lookAt(look);
        this.cameraControl.target = look;

        this.estado_juego = MyScene.START
      break;

      case MyScene.DESIERTO:
        this.camera.position.set (-110.25, this.camera.position.y,-5);
        //this.camera.position.x = -56
        var look = new THREE.Vector3 (-110.25,20,0);
        this.camera.lookAt(look);
        this.cameraControl.target = look;

        this.estado_juego = MyScene.START
      break;

      case MyScene.MAZMORRA:
        this.camera.position.set (-166.25, this.camera.position.y,-5);
        //this.camera.position.x = -56
        var look = new THREE.Vector3 (-166.25,20,0);
        this.camera.lookAt(look);
        this.cameraControl.target = look;

        this.estado_juego = MyScene.START
      break;

      case MyScene.BOSS:
        this.camera.position.set (-224, this.camera.position.y,-5);
        //this.camera.position.x = -56
        var look = new THREE.Vector3 (-224,20,0);
        this.camera.lookAt(look);
        this.cameraControl.target = look;

        this.estado_juego = MyScene.START
      break;

      case MyScene.MAR:
        this.camera.position.set (-56, this.camera.position.y,24.75);
        //this.camera.position.z = 24.75
        var look = new THREE.Vector3 (-56,20,29.75);
        this.camera.lookAt(look);
        this.cameraControl.target = look;

        this.estado_juego = MyScene.START
      break;

      case MyScene.SECRETA:
        this.camera.position.set (this.camera.position.x, this.camera.position.y,24.75);
        //this.camera.position.z = 24.75
        var look = new THREE.Vector3 (0,20,29.75);
        this.camera.lookAt(look);
        this.cameraControl.target = look;

        this.estado_juego = MyScene.START
      break;

    }
    
  }



  onKeyPressed(event){
    var key = event.which || event.keyCode

    console.log("detecta pulsar tecla pressed")
    //console.log(String.fromCharCode(key))

    //se admite tanto w como W, por eso se hace lowerCase de la key

    key = String.fromCharCode(key).toLowerCase()

    if(this.estado_juego != MyScene.CHANGE_CAMERA){
      if (key == 'w' ){
        console.log("mostrando tecla " + String.fromCharCode(key).toLowerCase())
        if(this.link.moverLink(MyScene.LOOK_AT_UP)){
          this.link.actualizarInfoPosicion(MyScene.LOOK_AT_UP)
        }
        //this.link.posPj_x cambiar a amano  
      }

      if (key == 'a'){
        console.log("mostrando tecla " + String.fromCharCode(key).toLowerCase())
        if(this.link.moverLink(MyScene.LOOK_AT_LEFT)){
          this.link.actualizarInfoPosicion(MyScene.LOOK_AT_LEFT)
        }
      }

      if (key == 'd'){
        console.log("mostrando tecla " + String.fromCharCode(key).toLowerCase())
        if(this.link.moverLink(MyScene.LOOK_AT_RIGHT)){
          this.link.actualizarInfoPosicion(MyScene.LOOK_AT_RIGHT)
        }
      }

      if (key == 's'){
        console.log("mostrando tecla " + String.fromCharCode(key).toLowerCase())
        if(this.link.moverLink(MyScene.LOOK_AT_DOWN)){
          this.link.actualizarInfoPosicion(MyScene.LOOK_AT_DOWN)
        }
      }
    }

    this.comprobarCambioNivel()

  }

  comprobarCambioNivel(){
    //comprobar si hay cambio de estado de nivel
    //this.link.comprobar_cambio_nivel()
    //cambia el nivel tambien en Myscene
    //si cambia de nivel, hay que hacerle el cambio de la camara
    /* console.log("nivel en el que está")
    console.log(this.link.game_level)
    console.log(this.game_level)
    */


    switch (this.link.game_level){
      case MyScene.BOSQUE_1:
        if(this.link.posPj_x == -28 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSQUE_2
          this.game_level = MyScene.BOSQUE_2
          this.changeCamera(MyScene.BOSQUE_2)

          //cargas los obstaculos del mundo que se cambia
          this.link.cargarObstaculos(this.bosque2.devolverObstaculos())
        }

        if(this.link.posPj_x == 0 && this.link.posPj_y == 0 && this.link.posPj_z == 22.75 /*&&this.link.tieneLlave*/){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.SECRETA
          this.game_level =  MyScene.SECRETA
          this.changeCamera( MyScene.SECRETA)

          this.link.cargarObstaculos(this.secreto.devolverObstaculos())
        }        
        break;

      case MyScene.BOSQUE_2:
        if(this.link.posPj_x == -28 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
            this.estado_juego = MyScene.CHANGE_CAMERA
            this.link.game_level = MyScene.BOSQUE_1
            this.game_level = MyScene.BOSQUE_1
            this.changeCamera(MyScene.BOSQUE_1)

            this.link.cargarObstaculos(this.bosque.devolverObstaculos())
        }

        if(this.link.posPj_x == -82.25 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          console.log("entra aqui?")
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.DESIERTO
          this.game_level = MyScene.DESIERTO
          this.changeCamera(MyScene.DESIERTO)

          this.link.cargarObstaculos(this.desierto.devolverObstaculos())

        }

        if(this.link.posPj_x == -56 && this.link.posPj_y == 0 && this.link.posPj_z == 22.75){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.MAR
          this.game_level =  MyScene.MAR
          this.changeCamera( MyScene.MAR)

          this.link.cargarObstaculos(this.mar.devolverObstaculos())

        } 
      break;

      case MyScene.MAR:
        if(this.link.posPj_x == -56 && this.link.posPj_y == 0 && this.link.posPj_z == 22.75){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSQUE_2
          this.game_level =  MyScene.BOSQUE_2
          this.changeCamera( MyScene.BOSQUE_2)

          this.link.cargarObstaculos(this.bosque2.devolverObstaculos())

        } 
      break;

      case MyScene.DESIERTO:
        if(this.link.posPj_x == -82.25 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSQUE_2
          this.game_level = MyScene.BOSQUE_2
          this.changeCamera(MyScene.BOSQUE_2)

          this.link.cargarObstaculos(this.bosque2.devolverObstaculos())

        }

        if(this.link.posPj_x == -138.25 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.MAZMORRA
          this.game_level = MyScene.MAZMORRA
          this.changeCamera(MyScene.MAZMORRA)

          this.link.cargarObstaculos(this.mazmorra.devolverObstaculos())

        }

       break;
      

       case MyScene.MAZMORRA:
        if(this.link.posPj_x == -138.25 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.DESIERTO
          this.game_level = MyScene.DESIERTO
          this.changeCamera(MyScene.DESIERTO)

          this.link.cargarObstaculos(this.desierto.devolverObstaculos())

        }
        
        if(this.link.posPj_x == -196 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSS
          this.game_level = MyScene.BOSS
          this.changeCamera(MyScene.BOSS)

          this.link.cargarObstaculos(this.boss.devolverObstaculos())

        }
        
      break;

      case MyScene.BOSS:
        if(this.link.posPj_x == -196 && this.link.posPj_y == 0 && this.link.posPj_z == 0){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.MAZMORRA
          this.game_level = MyScene.MAZMORRA
          this.changeCamera(MyScene.MAZMORRA)

          this.link.cargarObstaculos(this.mazmorra.devolverObstaculos())

        }
      break;

      case MyScene.SECRETA:
        //solo puedes acceder a esta posicion se rompes las rocas y te acercas despues
        //pero para pasar solo puedes con llave y abriendo la zona secreta
        if(this.link.posPj_x == 0 && this.link.posPj_y == 0 && this.link.posPj_z == 22.75){
          this.estado_juego = MyScene.CHANGE_CAMERA
          this.link.game_level = MyScene.BOSQUE_1
          this.game_level = MyScene.BOSQUE_1
          this.changeCamera(MyScene.BOSQUE_1)

          this.link.cargarObstaculos(this.bosque.devolverObstaculos())
        }
      break; 
      
    }
  }
  
  onKeyDown(event){

  }


  onKeyUp(event){
    var key = event.which || event.keyCode
    console.log("has dejado de pulsar la teclad " + String.fromCharCode(key).toLowerCase())
    
  }





  update () {
    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    // Se muestran o no los ejes según lo que idique la GUI.
    this.axis.visible = this.guiControls.axisOnOff;

    //info camera
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    this.stats.begin();
    
    // Se actualiza el resto del modelo
    this.link.update();

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    this.stats.end();

  }


  crearNiveles(){
    this.resolucion_altura
    this.bosque = new NivelBosque(this.resolucion_altura, this.resolucoin_anchura)
    console.log(this.bosque)
    this.add(this.bosque)

    this.bosque2 = new NivelBosque2(this.resolucion_altura, this.resolucoin_anchura)
    console.log(this.bosque2)
    this.add(this.bosque2)

    this.secreto = new NivelSecreto(this.resolucion_altura, this.resolucoin_anchura)
    console.log(this.secreto)
    this.add(this.secreto)

    this.mazmorra = new NivelMazmorra(this.resolucion_altura, this.resolucoin_anchura)
    console.log(this.mazmorra)
    this.add(this.mazmorra)

    this.boss = new NivelBoss(this.resolucion_altura, this.resolucoin_anchura)
    console.log(this.boss)
    this.add(this.boss)

    this.mar = new NivelMar(this.resolucion_altura, this.resolucoin_anchura)
    console.log(this.mar)
    this.add(this.mar)
    
    console.log("tamaño de la ventana: "+ window.innerWidth + " , " + window.innerHeight)
  }


}

  /* ESTADOS DEL JUEGO */
  MyScene.NO_START = 0;
  MyScene.START = 1;
  MyScene.DEAD = 2;
  MyScene.CHANGE_CAMERA = 3;



  /* ESTADOS ORIENTACION MUÑECO */
  MyScene.LOOK_AT_UP = 5;
  MyScene.LOOK_AT_DOWN = 6;
  MyScene.LOOK_AT_RIGHT = 7;
  MyScene.LOOK_AT_LEFT = 8;


  /*ESTADOS NIVEL EN QUE SE ENCUENTRA EL PJ*/
  MyScene.BOSQUE_1 = 15
  MyScene.BOSQUE_2 = 16
  MyScene.MAR = 17
  MyScene.DESIERTO = 18
  MyScene.MAZMORRA = 19
  MyScene.BOSS = 20
  MyScene.SECRETA = 21


/// La función   main
$(function () {
  
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  var scene = new MyScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se pulsa una tecla
  window.addEventListener ("keypress", (event) => scene.onKeyPressed(event));

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se matiene pulsada una tecla
  window.addEventListener ("keydown", (event) => scene.onKeyDown(event));

    // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se deja de pulsar una tecla
    window.addEventListener ("keyup", (event) => scene.onKeyUp(event));


  //TODO tambien existen keydown -> se pulsa una tecla y keyup -> se suelta

  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});
