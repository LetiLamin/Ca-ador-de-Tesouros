var caminho,menino,dinheiro,diamantes,joias,espada;
var imgCaminho,imgMenino,imgDinheiro,imgDiamantes,imgJoias,imgEspada;
var colecaoTesouros = 0;
var dinheiroG,diamantesG,joiasG,grupoEspada;

//Estados de jogo
var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=1;


function preload(){
  imgCaminho = loadImage("Road.png");
  imgMenino = loadAnimation("Runner-1.png","Runner-2.png");
  imgDinheiro = loadImage("cash.png");
  imgDiamantes = loadImage("diamonds.png");
  imgJoias = loadImage("jwell.png");
  imgEspada = loadImage("sword.png");
  imgFim =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// movendo o plano de fundo
caminho=createSprite(width/2,200);
caminho.addImage(imgCaminho);
caminho.velocityY = 4;


//criando o menino correndo
menino = createSprite(width/2,height-20,20,20);
menino.addAnimation("SahilRunning",imgMenino);
menino.scale=0.08;
  
  
dinheiroG=new Group();
diamantesG=new Group();
joiasG=new Group();
grupoEspada=new Group();

}

function draw() {

  if(estadoJogo===JOGAR){
  background(0);
  menino.x = World.mouseX;
  //console.log('menino.x  %s',menino.x );
  
  edges= createEdgeSprites();
  menino.collide(edges);

  //código para resetar o plano de fundo
  if(caminho.y > height ){
    caminho.y = height/2;
  }
  
  criarDinheiro();
  criarDiamantes();
  criarJoias();
  criarEspadas();

  //console.log('dinheiro %s', dinheiroG.dinheiro);

  if (dinheiroG.isTouching(menino)) {
     dinheiroG.destroyEach();
    //console;log('dinheiro %s', dinheiro);
    colecaoTesouros=colecaoTesouros+50;
   
  }
  if (diamantesG.isTouching(menino)){
    diamantesG.destroyEach();
    colecaoTesouros = colecaoTesouros+100;
  }
  if (joiasG.isTouching(menino)){
    joiasG.destroyEach();
    colecaoTesouros = colecaoTesouros+150
    console.log(colecaoTesouros);
  }
  else if (diamantesG.isTouching(menino)) {
    diamantesG.destroyEach();
  }
  else if(joiasG.isTouching(menino)) {
    joiasG.destroyEach();  
  }
  else{
      if(grupoEspada.isTouching(menino)) {
        estadoJogo = ENCERRAR;
        
        menino.addAnimation("SahilRunning", imgFim);
        menino.x = width/2;
        menino.y = height/2-75;
        menino.scale = 1;
        
        dinheiroG.destroyEach();
        diamantesG.destroyEach();
        joiasG.destroyEach();
        grupoEspada.destroyEach();
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesouros: "+ colecaoTesouros,150,30);
  }

}
}

function criarDinheiro() {
  if (World.frameCount % 200 == 0) {
  var dinheiro = createSprite(Math.round(random(50, width-50),40, 10, 10));
  dinheiro.addImage(imgDinheiro);
  dinheiro.scale=0.12;
  dinheiro.velocityY = 3;
  dinheiro.lifetime = window.screen.height;
  dinheiroG.add(dinheiro);
  }
}

function criarDiamantes() {
  if (World.frameCount % 320 == 0) {
  var diamantes = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamantes.addImage(imgDiamantes);
  diamantes.scale=0.03;
  diamantes.velocityY = 3;
  diamantes.lifetime = window.screen.height;
  diamantesG.add(diamantes);
}
}

function criarJoias() {
  if (World.frameCount % 410 == 0) {
  var joias = createSprite(Math.round(random(50, width-50),40, 10, 10));
  joias.addImage(imgJoias);
  joias.scale=0.13;
  joias.velocityY = 3;
  joias.lifetime = window.screen.height;
  joiasG.add(joias);
  }
}

function criarEspadas(){
  if (World.frameCount % 530 == 0) {
    var espada = createSprite(Math.round(random(50, width-50),40, 10, 10));
    espada.addImage(imgEspada);
    espada.scale=0.1;
    espada.velocityY = 3;
    espada.lifetime = window.screen.height;
    grupoEspada.add(espada);
  }
}