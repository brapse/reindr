//##########################################
//
// Reindeer
//
// Html generation helpers

var Stack = function(el){
    st = {};

    var _next = null;

    //last or set the last
    st.last = function(el){
        if(st.next() != null){
           return st.next().last(el);
        }else{
            return el ? st.next(el) : st;
        }
    }

    st.next = function(el){
        if(el != null){
            return _next = el;
        }else{
            return _next;
        }
    }

    st.render = function(){
        if(st.next() != null){
            return "<span>" + st.next().render() + "</span>";
        }else{
            return "<span/>";
        }
    }

    return st;
}

var Reindeer = function(stack){


    var rd = {};
    rd.stack = (stack == undefined) ? Stack(stack) : Stack();

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
