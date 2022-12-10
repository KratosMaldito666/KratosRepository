class Obj {
    frame = 1;
    timer = 0;
    atirando = true;
    municao = 3;
    constructor(x, y, width, height, color,inicio) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.inicio = inicio;
    }
    desenha() {

        var img = new Image();
        img.src = this.color;
        pincel.drawImage(img, this.x, this.y, this.width, this.height);
    }
    animation(name) {
        this.timer += 1;
        if (this.timer > 10) {
            this.timer = 0;
            this.frame += 1;
        }
        if (this.frame > 2) {
            this.frame = 1
        }
        this.color = "img/" + name + this.frame + ".png";
    }

}

class Bg extends Obj { // move o background
    move(speed, limit, pos) {
        this.x += speed;
        if (this.x <= limit) {
            this.x = pos;
        }
    }
}

class Movimetacao extends Obj {

    diry = 0;
    move(){
    this.y -= this.diry;
    }
    parede(){
        if(this.y<=0){
            this.y=0;
        }
        if(this.y>=600-this.height){
            this.y=600-this.height;
        }
    }
    collide(obj) {
        var tx1 = this.x;
        var ty1 = this.y;
        var tx2 = tx1 + this.width;
        var ty2 = ty1 + this.height;
        var ox1 = obj.x;
        var oy1 = obj.y;
        var ox2 = ox1 + obj.width;
        var oy2 = oy1 + obj.height;
        //console.log((tx1>ox1)+"|"+(tx1<ox2)+"|"+(ty1>oy1)+"|"+(ty1<oy2)+"||"+(ox1>tx1)+"-"+(ox1<tx2)+"-"+(oy1>ty1)+"-"+(oy1<ty2));
        if (tx1 > ox1 && tx1 < ox2 && ty1 > oy1 && ty1 < oy2) {
            return true;
        }
        if (ox1 > tx1 && ox1 < tx2 && oy1 > ty1 && oy1 < ty2) {
            return true;
        }
        return false;
        
    }
    
}

class Luva extends Obj {
    
    move() {

        this.x -= 3.0;//velocidade

        if (this.x < 0) {
            this.x = 1300;
            this.y=Math.random()*(600-this.height);
        }

        if(Sucos==15){
              fase2 = true;
              HardSong.play();
        }

        if(Sucos==30){
            fase3 = true;
            Song.pause();
            HardSong.pause();
            MoreHardSong.play();
      }

      if(Sucos==50){
        fase4 = true;
        Song.pause();
        HardSong.pause();
        MoreHardSong.pause();
        FasterSong.play();
    }

    if(Sucos==70){
        fase5 = true;
        Song.pause();
        HardSong.pause();
        MoreHardSong.pause();
        FasterSong.pause();
        TranscendeuSong.play();
    }

        if(fase2 == true){
            this.x -= 2.0;
            attack = 3;
        }

        if(fase3 == true){
            this.x -= 2.0;
            attack = 4;
        }

        if(fase4 == true){
            this.x -= 2.0;
            attack = 6;
        }

        if(fase5 == true){
            this.x -= 3.0;
            attack = 10;
        }

    }
    collide(obj) {
        var tx1 = this.x;
        var ty1 = this.y;
        var tx2 = tx1 + this.width;
        var ty2 = ty1 + this.height;
        var ox1 = obj.x;
        var oy1 = obj.y;
        var ox2 = ox1 + obj.width;
        var oy2 = oy1 + obj.height;
        //console.log((tx1>ox1)+"|"+(tx1<ox2)+"|"+(ty1>oy1)+"|"+(ty1<oy2)+"||"+(ox1>tx1)+"-"+(ox1<tx2)+"-"+(oy1>ty1)+"-"+(oy1<ty2));
        if (tx1 > ox1 && tx1 < ox2 && ty1 > oy1 && ty1 < oy2) {
            return true;
        }
        if (ox1 > tx1 && ox1 < tx2 && oy1 > ty1 && oy1 < ty2) {
            return true;
        }
        return false;
        
    }
    respawn() {
        if (!this.inicio) {  //this.x = Math.random() * (max - min)+min;
            this.x=1300;
            this.y=Math.random()*(600-this.height);
        }//posição em que vai aparecer
        //this.x = Math.random() * (1300 - 0);
    }
}
class Tiro extends Obj {
   
    move(tiro) {
   
        if (this.municao > 0) {

            if (tiro == true) {

                this.x += 5;
            }
            if (this.x >= 1200) {
                this.x = Player.x+106;
                this.atirando = false;
               
                this.municao--;}

        }else{
             this.y=Player.y+20;
        }
    }
    collide(obj) {
        var tx1 = this.x;
        var ty1 = this.y;
        var tx2 = tx1 + this.width;
        var ty2 = ty1 + this.height;
        var ox1 = obj.x;
        var oy1 = obj.y;
        var ox2 = ox1 + obj.width;
        var oy2 = oy1 + obj.height;
        //console.log((tx1>ox1)+"|"+(tx1<ox2)+"|"+(ty1>oy1)+"|"+(ty1<oy2)+"||"+(ox1>tx1)+"-"+(ox1<tx2)+"-"+(oy1>ty1)+"-"+(oy1<ty2));
        if (tx1 > ox1 && tx1 < ox2 && ty1 > oy1 && ty1 < oy2) {
            return true;
        }
        if (ox1 > tx1 && ox1 < tx2 && oy1 > ty1 && oy1 < ty2) {
            return true;
        }
        return false;

    }
}
class Juice extends Luva {

    mudaPosicao() {
        this.x = 1300;//posição em que vai aparecer
        //this.x = Math.random() * (1300 - 0);
      this.y=Math.random()*(600-this.height);
    }
}



class Text {
    draw(texto, x, y) {
        pincel.font = "50px Arial";
        pincel.fillStyle = "black";
        pincel.fillText(texto, x, y);
    }
}