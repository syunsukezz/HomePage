 class objIndex
{
  constructor() 
  {
    this.obj=[];
    
  }
  pushback(x,y,size,s_color,f_color)
  {
    this.obj.push(createObject(x,y,size,s_color,f_color));
  }
  objpush(obj)
  {
    this.obj.push(obj);
  }
}
class lineIndex
{
  constructor() 
  {
    this.lin=[];
    
  }
  pushback(x1,y1,x2,y2,s_color)
  {
    this.lin.push(createLine(x1,y1,x2,y2,s_color));
  }
  objpush(lin)
  {
    this.lin.push(lin);
  }
}

//ここから＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

let strength =70;
let index=new objIndex();
let particle = new objIndex();
let w=1000,h=600;
let winpos=createvector(0,0);
let count=0;
let lines =new lineIndex();
let dusts=new objIndex();
let stars=100;
let smallstars=50;
let spread=50;
let shoot=new objIndex();


function setup() {
  createCanvas(w,h);
  
  for(let i=0;i<stars;i++)
  {
    let obj=createObject(random(0,w),random(0,h),5,color(255,255,0),color(255,255,0))
    index.objpush(obj);
  }
  for(let i=0;i<stars;i++)
  {
    for(let j=0;j<smallstars;j++)
    {
      let rot=random(0,2*PI);
      let r=random(0,spread)
      let obj=createObject(index.obj[i].pos.x+r*sin(rot),index.obj[i].pos.y+r*cos(rot),random(0.5,1.5),color(255,255,255),color(255,255,255))
      dusts.objpush(obj);
    }
  }
  
  let k=0;
  for(let i=0;i<stars-2;i++)
  {
    for(k=i+1;k<stars-1;k++)
    {
      let v=vecminus(index.obj[i].pos,index.obj[k].pos);
      if(sqrt(v.x*v.x+v.y*v.y)<strength)
      {
        lines.pushback(index.obj[i].pos.x,index.obj[i].pos.y,index.obj[k].pos.x,index.obj[k].pos.y,color(0,255,255))
        count++
      }
      if(count>2)
      {
        count=0;
        break;
      }
    }
  }
  print(index);
  
  print(lines);
  noCursor();
}


function draw() {
  background(0);
  
  for(let i=0;i<index.obj.length;i++)
  {   
    let def=vecminus(index.obj[i].pos,winpos);
    def.x=(def.x+w)%w;
    def.y=(def.y+h)%h;
      summonCircle(def,index.obj[i].size,index.obj[i].s_color,index.obj[i].f_color);
    
  }
  winpos.x=(winpos.x+0.1)%w;
  winpos.y=(winpos.y +0.1)%h;
  for(let i=0;i<dusts.obj.length;i++)
  {   
    let def=vecminus(dusts.obj[i].pos,winpos);
    def.x=(def.x+400)%w;
    def.y=(def.y+400)%h;
      summonCircle(def,dusts.obj[i].size,dusts.obj[i].s_color,dusts.obj[i].f_color);
    
  }
  
  for(let i=0;i<lines.lin.length;i++)
  {   
    
    strokeWeight(1);
    let def=vecminus(lines.lin[i].p1,winpos);
    def.x=(def.x+w)%w;
    def.y=(def.y+h)%h;
    let def2=vecminus(lines.lin[i].p2,winpos);
    def2.x=(def2.x+w)%w;
    def2.y=(def2.y+h)%h;
    let v= vecminus(def,def2);
    if(sqrt(v.x*v.x+v.y*v.y)<strength)
    {
      summonLine(def,def2,lines.lin[i].s_color);
    }
    
  }
  
  
  
  
  
  for(let i=0;i<particle.obj.length;i++)
  {   
    
    summonCircle(createvector(particle.obj[i].pos.x,particle.obj[i].pos.y+(1000-particle.obj[i].timer)/100),particle.obj[i].size,particle.obj[i].s_color,particle.obj[i].f_color);
    
    if(particle.obj[i].timer>0)
    {
      particle.obj[i].timer-=100;
    }else
    {
      particle.obj.splice(i,1);
    }
    
    
    
  }
  for(let i=0;i<=3;i++)
  {
    particle.pushback(mouseX+random(-10,10),mouseY+random(-10,10),random(1,4),color(255,255,255),color(255,255,255));
  }
  
  //print(vectorlength(vecminus(index[]createvector(mouseX,mouseY)));
  for(let i=0;i<shoot.obj.length;i++)
  {   
    
    for (let j=0;j< 1 ;j++)
    {
particle.pushback(shoot.obj[i].pos.x+random(-2,2),shoot.obj[i].pos.y+random(-2,2),random(1,5),color(255,255,255),color(255,255,255));
    }
     
    shoot.obj[i].pos.x-=3;
    shoot.obj[i].pos.y+=3;
    shoot.obj[i].timer-=10 ;
    if(shoot.obj[i].timer <=0)
    {
      shoot.obj.splice(i,1);
    }
                         
    
  }
     if (keyIsDown(32)||random(0,100)<1) {
   shoot.pushback(random(0,w),random(0,h),random(1,2),color(255,255,255),color(255,255,255));
}
 
  //print(vectorlength(vecminus(index[]createvector(mouseX,mouseY)));
}

  






function mouseClicked()
{
  count=0;//修正：追加した星が繋がらないバグ
  index.objpush(createObject(mouseX+winpos.x,mouseY+winpos.y,5,color(255,255,0),color(255,255,0)));
  for(let i=0;i<index.obj.length-2;i++)
  {
    let v=vecminus(index.obj[i].pos,index.obj[index.obj.length-1].pos);
      if(sqrt(v.x*v.x+v.y*v.y)<strength)
      {
        lines.pushback(index.obj[i].pos.x,index.obj[i].pos.y,index.obj[index.obj.length-1].pos.x,index.obj[index.obj.length-1].pos.y,color(0,255,255))
        count++
      }
      if(count>2)
      {
        count=0;
        break;
      }
  }
}











function setcolor()
{
  noStroke();
  noFill();
}
function setcolor(setStroke,setFill)
{
  stroke(setStroke);
  fill(setFill);
}
function createvector(setx,sety)//変数をまとめたオブジェクト（構造体的なやつ）
{
  let vec=
  {
    x:setx,
    y:sety,  
  };
  return vec;
}

function createObject(setx,sety,setsize,setStroke,setFill)
{
  let obj=
  {
    pos:createvector(setx,sety),
    size:setsize,
    timer:1000,
    s_color:setStroke,
    f_color:setFill
    
  };
  return obj;
}
function createLine(x1,y1,x2,y2,setStroke)
{
  let lin=
  {
    p1:createvector(x1,y1),
    p2:createvector(x2,y2),
    timer:1000,
    s_color:setStroke
    
    
  };
  return lin;
}
function summonCircle(pos,size,s_color,f_color)
{
  strokeWeight(0);
  setcolor(s_color,f_color);
  
  
  circle(pos.x,pos.y,size);
  
}
function summonCircleObj(obj)
{
  setcolor(obj.s_color,obj.f_color);
  
  
  circle(obj.pos.x,obj.pos.y,obj.size);
  
}
function summonLineObj(lin)
{
  stroke(lin.s_color);
  line(lin.p1.x,lin.p1.y,lin.p2.x,lin.p2.y);
}
function summonLine(p1,p2,s_color)
{
  stroke(s_color);
  line(p1.x,p1.y,p2.x,p2.y);
}
function vecminus(v1,v2)
{
  return createvector(v1.x-v2.x,v1.y-v2.y);
}
function vectorlength(vec)
{
  return sqrt((vec.x*vec.x)+(vec.y*vec.y));
}




