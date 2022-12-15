export class canvas{
    constructor(canvas){
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.elements = [];
    }
    get width(){return this.canvas.width;}
    get height(){return this.canvas.height;}
    refresh()
    {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for(const item of this.elements)
      {
        this.ctx.drawImage(item.surface,item.x,item.y);
      }
    }
    update()
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
  
