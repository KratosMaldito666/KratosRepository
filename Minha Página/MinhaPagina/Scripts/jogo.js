var inicio = true;
var tela = document.querySelector("canvas");
var pincel = tela.getContext('2d');

var Song = new Audio("Som/PirataSong.mp3"); // Musica loop
var dano = new Audio("Som/Dano.mp3"); 
var Recarga = new Audio("Som/Ammo.mp3");
var PegouSuco = new Audio("Som/TesouroSong.mp3");
var GameOverSong = new Audio("Som/FimDeJogoSong.mp3");
var TiroSong = new Audio("Som/TiroCoco.mp3");
var HidraSong = new Audio("Som/HidraSong.mp3");
var BruceSong = new Audio("Som/BruceSong.mp3");
var MenuSong = new Audio("Som/MenuSong.mp3");
var InstrucoesSong = new Audio("Som/InstrucoesSong.mp3");
var DavySong = new Audio("Som/DavySong.mp3");
var HardSong = new Audio("Som/HardSong.mp3");
var MoreHardSong = new Audio("Som/DeuSong.mp3");
var FasterSong = new Audio("Som/FasterSong.mp3");
var TranscendeuSong = new Audio("Som/TranscendeuSong.mp3");

var backmenu=new Bg(0,0,1210,600,"img/MenuBackground.jpg",true);
var backtutorial=new Bg(0,0,1210,600,"img/MenuInstrucoes.jpg",true);
var backdroundover = new Bg(0, 0, 1200, 600, "img/GameOverBg.jpg",true);
var backgame=new Bg(0,0,1210,600,"img/FundoMarBack.jpg",true);
var backgame1=new Bg(0,0,1210,600,"img/FundoMarBack.jpg",true);

var Player = new Movimetacao(500, 300, 200, 150, "img/YaraSereia__1",true);
var luva = new Juice(10, 500, 100, 100, "img/Davy_Jones.png", true);
var suco = new Juice(20, 500, 50, 50, "img/Bau.png",true);
var Shrek = new Juice(10,500,85,85,"img/Hidra.png",true);
var Faustinho = new Juice(30,500,120,80,"img/Bruce.png",true);
var tiro = new Tiro(606, 200, 50, 50, "img/CocoBala.png",true);
var Velho = new Juice(10,500,50,50,"img/Municao.png",true);

var tempo;
var jogando = true;
var placar = new Text();
var Sucos = 0;
var atirando;
var ismenu=1;
var fase2 = false; 
var fase3 = false;
var fase4 = false;
var fase5 = false;
var attack = 2;

document.addEventListener("keydown", function (event) {
  
if (event.key === 'k') {
    if(ismenu<3){
    ismenu+=1;
   
}
if(jogando == false){ // back in the game
    jogando = true;
    tempo = 30;
    Sucos = 0;
    tiro.municao = 3;
    attack = 2;
    GameOverSong.pause();
    suco.mudaPosicao();
    luva.respawn();
    Faustinho.mudaPosicao();
    Shrek.mudaPosicao();
    Velho.mudaPosicao();
}
}
});
function teclas(){
document.addEventListener("keydown", function (event) {
    if (event.key === 's'){
            Player.diry = -4;
    }

    if (event.key === 'w') {
        Player.diry = 4;
    }
    
    if (event.key === 'j') {
        atirando = true;
        tiro.atirando = true;
        TiroSong.play();
    }
/*if (event.key === 'k') {
    if(ismenu<3){
    ismenu+=1;
}
}*/
});

document.addEventListener("keyup", function (event) {
    if (event.key === 's') {
        Player.diry = 0;
    }
    if (event.key === 'w') {
        Player.diry = 0;
    }
});
}


function collides() {
    
    if (Player.collide(suco)) {
        suco.mudaPosicao();
        Sucos++;
        tempo+=5;
        PegouSuco.play();
    }
    if(tiro.collide(luva) && tiro.atirando == true){
        luva.mudaPosicao();
        DavySong.play();
    }
    if (Player.collide(luva)) { // o esse é o davy jones e ta bugado
        dano.play();
        tempo-=attack;
        luva.mudaPosicao();
    }
    if(tiro.collide(Faustinho) && tiro.atirando == true){
        Faustinho.mudaPosicao();
        BruceSong.play();
    }
    if(Player.collide(Faustinho)){
        Faustinho.mudaPosicao();
        tempo-=attack;
        dano.play();
    }
    if(tiro.collide(Shrek) && tiro.atirando == true){
        Shrek.mudaPosicao();
        HidraSong.play();
    }
    if(Player.collide(Shrek)){
        Shrek.mudaPosicao();
        tempo-=attack;
        dano.play();
    }
    if(Player.collide(Velho)){
        Velho.mudaPosicao();
        Recarga.play();
        tiro.municao+=3;
    }
    if(Shrek.collide(Velho)||Shrek.collide(Faustinho)|| Shrek.collide(luva)|| Shrek.collide(suco)){
        Shrek.mudaPosicao();
    }
      if(Velho.collide(Shrek)||Velho.collide(Faustinho)|| Velho.collide(luva)|| Velho.collide(suco)){
         Velho.mudaPosicao();
    }
      if(Faustinho.collide(Velho)||Faustinho.collide(Shrek)|| Faustinho.collide(luva)|| Faustinho.collide(suco)){
       Faustinho.mudaPosicao();
    }
      if(suco.collide(Velho)||suco.collide(Faustinho)|| suco.collide(luva)|| suco.collide(Shrek)){
       suco.mudaPosicao();;
        
    }
     if(luva.collide(Velho)||luva.collide(Faustinho)|| luva.collide(Shrek)|| luva.collide(Shrek)){
        luva.mudaPosicao();
    }
   
}
function timer(x) {
    if (x == true) {

        tempo--;
        x = false;
    }

}
function temporizador() {

    timer(true);
    if (tempo <= 0) {
        jogando = false;
    }
}

setInterval(temporizador, 1000);
function tutorial1(){
    tutorial=true;
    backtutorial.desenha();
    MenuSong.pause();
    InstrucoesSong.play();
    tempo = 30;
}
function menu(){
    ismenu=true;
backmenu.desenha();
tempo=30;
 MenuSong.play();
}

function jogo() {
    InstrucoesSong.pause();
    if(fase2 == false){
        Song.play();
        }
        if(fase2 == true){
            Song.pause();
        }
    backgame.desenha();
    backgame1.desenha();
    Player.desenha();
    luva.desenha();
    suco.desenha();
    tiro.desenha();
    Shrek.desenha();
    Faustinho.desenha();
    Velho.desenha();
    teclas();
    pincel.font = "40px serif";
    pincel.fillStyle="black";
    pincel.fillText("Tempo Restante:" + tempo, 10, 30);
    pincel.fillText("Tesouros coletados: " + Sucos, 10, 70);
    pincel.fillStyle = "yellow";
    pincel.font = "40px serif";
    pincel.fillText("Munição:" + tiro.municao, 10, 110); 
      backgame.move(-1,0,1200);
    backgame1.move(-1,-1200,0);
    Player.animation("YaraSereia__");
    Player.move();
    Player.parede();
    luva.move(1500,1300);
    suco.move(1600,1300);
    Shrek.move(1800,1900);
    Faustinho.move(1300,1000);
    Velho.move(1400,1450);
    
    if (tiro.atirando == false) {
        atirando = false;

    tiro.y = Player.y+20
        }
    if (atirando == true) {
        tiro.move(true);
     
        } else {
          tiro.y=Player.y+20;
        tiro.move(false);
    }

}

function gameover() {
    backdroundover.desenha();
    Song.pause();
    HardSong.pause();
    MoreHardSong.pause();
    FasterSong.pause();
    TranscendeuSong.pause();
    GameOverSong.play()
    placar.draw("Tesouros coletados: "+Sucos, 35, 520);

}

function draw() {
  
    if(ismenu==1){ 
    menu();}
    if(ismenu==2){
        tutorial1();
    }
    if(ismenu==3   ){
        jogo();
    }   
}

function update() {
  

}

function main() {
    if (jogando == true) {
        update();
        draw();
        collides();
    }
    else {
        gameover();;
    }
}

setInterval(main, 10);
