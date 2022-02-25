
class ground {

  constructor(x,y,w,h){

    var propriedadedosolo = {

      isStatic:true
    } 
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x,y,w,h,propriedadedosolo)
    World.add(world,this.body);
  }
  show(){

    var posicao = this.body.position
    push();
    rectMode(CENTER);
    fill("orange");
    rect(posicao.x,posicao.y,this.w,this.h);


    pop();
  }

}