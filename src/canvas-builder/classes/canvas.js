export class canvas{
    constructor(canvas){
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.elements = [];
    }
    get width(){return this.canvas.width;}
    get height(){return this.canvas.height;}
    update()
    {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for(const item of this.elements)
      {
        this.ctx.drawImage(item.surface,item.x,item.y);
      }
    }
    forceUpdate()
    {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for(const item of this.elements)
      {
        item.update()
        this.ctx.drawImage(item.surface,item.x,item.y);
      }
    }
    add(element)
    {
      this.elements.push(element);
      return this;
    }
    register(element)
    {
      this.elements.push(element);
      return this;
    }
    remove(element)
    {
      this.elements.splice(this.elements.indexOf(element),1);
      return this;
    }
  }
  
  class element{
    constructor(){
      this.surface = document.createElement("canvas");
      this.ctx = this.surface.getContext("2d");
    }
    position(x,y){
      this.x = x;
      this.y = y;
      return this;
    }
    size(w,h){
      this.w = w;
      this.h = h;
      this.surface.width = this.canvas.width;
      this.surface.height = this.canvas.height;
      return this;
    }
    style(renderStyle)
    {
      this.renderStyle = renderStyle;
      return this;
    }
    parent(canvas)
    {
      canvas.register(this);
      this.canvas = canvas;
      return this;
    }
    update(){
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.renderStyle(this.ctx,this.w,this.h);
      this.canvas.update();
      return this;
    }
  }