
// Clases de la biblioteca

import * as THREE from './libs/three.module.js'
import { GUI } from './libs/dat.gui.module.js'
import { TrackballControls } from './libs/TrackballControls.js'
import Stats from './libs/Stats.js';


// Clases de mi proyecto

import {Link} from './Link.js'
import {AttackSword} from './AttackSword.js'





/* ESTADOS INICIALES PARA EL METODO JUGAR */





/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */
class MyScene extends THREE.Scene {
  constructor (myCanvas) {
    super();
    
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

    this.link = new Link();
    this.attack_sword = new AttackSword();
    this.add (this.link);
    this.add(this.attack_sword);
  }
  
  createCamera () {
    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // También se indica dónde se coloca
    this.camera.position.set (40, 30, 40);
    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
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
  }

  changeCamera(){
    //Metodo para cambiar la camara de posicion
    //this.camera.
  }



  onKeyPressed(event){
    var key = event.which || event.keyCode

    console.log("detecta pulsar tecla pressed")
    //console.log(String.fromCharCode(key))

    //se admite tanto w como W, por eso se hace lowerCase de la key

    key = String.fromCharCode(key).toLowerCase()

    if (key == 'w' ){
      console.log("mostrando tecla " + String.fromCharCode(key).toLowerCase())
      this.link.moverLink(MyScene.LOOK_AT_UP)
      this.link.actualizarInfoPosicion(MyScene.LOOK_AT_UP)
      //this.link.posPj_x cambiar a amano
    }

    if (key == 'a'){
      console.log("mostrando tecla " + String.fromCharCode(key).toLowerCase())
      this.link.moverLink(MyScene.LOOK_AT_LEFT)
      this.link.actualizarInfoPosicion(MyScene.LOOK_AT_LEFT)
    }

    if (key == 'd'){
      console.log("mostrando tecla " + String.fromCharCode(key).toLowerCase())


      this.link.moverLink(MyScene.LOOK_AT_RIGHT)
      this.link.actualizarInfoPosicion(MyScene.LOOK_AT_RIGHT)

    }

    if (key == 's'){
      console.log("mostrando tecla " + String.fromCharCode(key).toLowerCase())
      this.link.moverLink(MyScene.LOOK_AT_DOWN)
      this.link.actualizarInfoPosicion(MyScene.LOOK_AT_DOWN)
    }

    if (key == 32){
      console.log("mostrando tecla " + String.fromCharCode(key))
      this.attack_sword.lanzarEspada(this.link.orientacion)
    }

  }
  
  onKeyDown(event){

  }


  onKeyUp(event){
    var key = event.which || event.keyCode
    console.log("has dejado de pulsar la teclad " + String.fromCharCode(key).toLowerCase())
    
  }

  onKeyUp(event) {
    var key = event.which || event.keyCode
    console.log("has dejado de pulsar la tecla " + String.fromCharCode(key).toLowerCase())
  }



  update () {
    // Se actualizan los elementos de la escena para cada frame
    // Se actualiza la intensidad de la luz con lo que haya indicado el usuario en la gui
    this.spotLight.intensity = this.guiControls.lightIntensity;
    
    // Se muestran o no los ejes según lo que idique la GUI.
    this.axis.visible = this.guiControls.axisOnOff;
    
    // Se actualiza la posición de la cámara según su controlador
    this.cameraControl.update();

    this.stats.begin();
    
    // Se actualiza el resto del modelo
    this.link.update();
    this.attack_sword.update();

    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());

    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())

    this.stats.end();

  }
}

  /* ESTADOS DEL JUEGO */
  MyScene.NO_START = 0;
  MyScene.START = 1;
  MyScene.DEAD = 2;


  /* ESTADOS ORIENTACION MUÑECO */
  MyScene.LOOK_AT_UP = 5;
  MyScene.LOOK_AT_DOWN = 6;
  MyScene.LOOK_AT_RIGHT = 7;
  MyScene.LOOK_AT_LEFT = 8;


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
