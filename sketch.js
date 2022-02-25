//referençiando modulo
const Engine = Matter.Engine; 
//renderisar
const Render = Matter.Render; 
const World = Matter.World; 
const Bodies = Matter.Bodies; 
//restrição
const Constraint = Matter.Constraint; 
const Body = Matter.Body; 
//compositos
const Composites = Matter.Composites; 
//composto
const Composite = Matter.Composite;

var world;
var engine;

var solo;
var corda,corda2,corda3;
var fruta,Imgfruta;
var fruta2,fruta3,fruta4;
var Imgbackground;
var coelho;
var ImgCoelho; 
var botao,botao2,botao3;
//var balao;

var somdefundo;
var somtriste;
var somcomendo;
var somcortando;
var somassoprando;
var mutasom;

var piscando;
var comendo;
var triste;

function preload(){
  ImgCoelho = loadImage("Rabbit-01.png");
  Imgfruta = loadImage("melon.png");
  Imgbackground = loadImage("background.png");

  somdefundo = loadSound("sound1.mp3");
  somtriste = loadSound("sad.wav");
  somcomendo = loadSound("eating_sound.mp3");
  somcortando = loadSound("rope_cut.mp3");
  somassoprando = loadSound("air.wav");
  

  piscando = loadAnimation("blink_1.png","blink_2.png","blink_3.png");

  comendo = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");

  triste = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  // colocando animação para ser reprodusida
  piscando.playing = true;
  comendo.playing = true;
  // evitando repetiçoes
  comendo.looping = false;
  triste.looping = false;
  triste.playing = true;


}

function setup(){

  createCanvas(500,700);
  somdefundo.play();
  somdefundo.setVolume(0.5)
  //frequencia de quadros
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  solo  = new ground(200,690,600,20);
  
  coelho = createSprite(420,620,100,100);
  coelho.addImage(ImgCoelho);
  coelho.scale = 0.2;
  //atrasão animação 
  piscando.frameDelay = 20;  
  triste.frameDelay = 20;
  comendo.frameDelay = 20;
  //adcionando animação 
  coelho.addAnimation("piscando",piscando);
  coelho.addAnimation("triste",triste);
  coelho.addAnimation("comendo",comendo);
  coelho.changeAnimation("piscando");

  botao = createImg("cut_btn.png");
  botao.position(20,30);
  botao.size(50,50);
  botao.mouseClicked(drop);

  botao2 = createImg("cut_btn.png");
  botao2.position(330,35);
  botao2.size(50,50);
  botao2.mouseClicked(drop2);

  botao3 = createImg("cut_btn.png");
  botao3.position(360,200);
  botao3.size(50,50);
  botao3.mouseClicked(drop3);
  
  mutasom = createImg("mute.png");
  mutasom.position(450,20);
  mutasom.size(50,50);
  mutasom.mouseClicked(mutar);
  
  // balao = createImg("balloon.png");
  // balao.position(10,250);
  // balao.size(150,100);
  // balao.mouseClicked(assoprar);


  corda = new Rope(8,{x:40,y:30})
  corda2 = new Rope(7,{x:370,y:40})
  corda3 = new Rope(4,{x:400,y:225})
  var propriedadedafruta = {
    density:0.001
  }
  //colocando fruta no composto na corda 
  fruta = Bodies.circle(300,300,15,propriedadedafruta);
  Matter.Composite.add(corda.body,fruta);
  fruta2 = new Link(corda,fruta);
  fruta3 = new Link(corda2,fruta);
  fruta4 = new Link(corda3,fruta);
  imageMode(CENTER);
}

function draw(){

  background("black");
  image(Imgbackground,width/2,height/2,500,700);
  Engine.update(engine);
  solo.show();
  corda.show();
  corda2.show();
  corda3.show();
  // verificando se o corpo da fruta
  if(fruta!=null){
    image(Imgfruta,fruta.position.x,fruta.position.y,60,60);
  
  }
  
  if(colisao(fruta,coelho)==true){
    coelho.changeAnimation("comendo");
    somcomendo.play();
  }

  if(fruta!=null &&
    fruta.position.y>=650)
    { coelho.changeAnimation('triste');
    somdefundo.stop();
    somtriste.play();
    fruta=null; }

  // if(colisao(fruta,solo.body)==true){
    // coelho.changeAnimation("triste");
    // somtriste.play();;
  // }

  drawSprites();
}
//função de corte
function drop(){

  corda.break();
  fruta2.detach();
  //para a fruta não ser destruida 
  fruta2 = null;
  somcortando.play();
}

function colisao(body,sprite){

  if(body!=null){
    var distancia = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    
    if(distancia<= 80){
      World.remove(engine.world,fruta);
      // função retornar verdadeira
      return true;
    }
    else{
      return false;

    }
  }
}

// function assoprar(){
  // Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0});
  // somassoprando.play();

// }

function mutar(){
  if(somdefundo.isPlaying()){
    somdefundo.stop();
  }
  else{somdefundo.play();
  }
}

function drop2(){

  corda2.break();
  fruta3.detach();
  //para a fruta não ser destruida 
  fruta3 = null;
  somcortando.play();
}

function drop3(){

  corda3.break();
  fruta4.detach();
  //para a fruta não ser destruida 
  fruta4 = null;
  somcortando.play();
}