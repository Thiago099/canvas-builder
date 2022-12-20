
export class dummy{
    constructor(){
      this.hooks = [];
      this.children = {};
      this._x = 0;
      this._y = 0;
      this._parent = null;
    }

    get x() {
      // if(typeof this._x === "function") return this._x();
      if(this._parent) return this._parent.x + this._x;
      return this._x;
    }
    get y() {
      // if(typeof this._y === "function") return this._y();
      if(this._parent) return this._parent.y + this._y;
      return this._y;
    }
    set x(x) {
      this._x = x;
    }
    set y(y) {
      this._y = y;
    }

    parent(parent)
    {
      this._parent = parent;
      this.hook("parent", parent)
      return this;
    }

    position(x,y){
      this._x = x;
      this._y = y;
      return this;
    }
    hook(name,parent)
    {
      parent.hooks.push(this);
      this.children[name] = parent;
      return this;
    }
    update(){
      for(const item of this.hooks)
      {
        item.update();
      }
    }
    update_forced()
    {

    }
    destroy()
    {
      for(const children of Object.values(this.children))
      {
        children.hooks.splice(children.hooks.indexOf(this),1);
      }
    }
    hover(e)
    {
      const {offsetX, offsetY} = e;
      return Math.sqrt(Math.pow(offsetX - this.x, 2) + Math.pow(offsetY - this.y, 2));
    }
  }