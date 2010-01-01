//##########################################
//
// Reindeer
//
// Html generation helpers

var Stack = function(el){
    st = {};

    var _next = null;

    // ######################### 

    st.last = function(el){
        if(this.next() != null){
            return this.next().last(el);
        }else{
            return el ? this.next(el) : st;
        }
    }

    st.next = function(item){
        console.log("nexting");
        if(item != null){
            return _next = item;
        }else{
            return _next;
        }
    }

    st.length = function(){
       var length = 0; 
       var c;
       while(c = this.next()){ length++ }
       return length;
    }

    // ######################### 

    st.render = function(){
        console.log("rendering a stack");
        if(this.next() != null){
            return "<span>" + this.next().render() + "</span>";
        }else{
            return "<span/>";
        }
    }

    return st;
}

var Reindeer = function(){

    var rd = {};
    rd.stack = Stack();

    // ######################### 
   
    rd.render = function(){
        console.log("rendering");
        return rd.stack.render();
    }

    // ######################### 

    rd.span = function(attrs){
        rd.stack.last(Stack());
        return rd;
    }

    return rd;
}
