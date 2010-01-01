//##########################################
//
// Reindeer
//
// Html generation helpers
// By: Sean Braithwaite
//
// NOTE: won't work in IE

var Reindeer = function(){
    var supported_tags = ["span", "div", "a"];

    var Stack = function(type){

        st = {};
        var _tag, _next, _text;

        //XXX: js 1.6
        if(supported_tags.lastIndexOf(type) != -1){
            _tag = type;
        }else{
            _text = type;
        }

        // ######################### 

        st.last = function(el){
            if(this.next()){
                return this.next().last(el);
            }else{
                return el ? this.next(el) : st;
            }
        };

        st.next = function(item){
            console.log("nexting");
            if(item){
                return (_next = item);
            }else{
                return _next;
            }
        };

        st.length = function(i){
           var _i = i || 0; 
           if(this.next()){
               return this.next().length(_i+1);
           }else{
               return i;
           }
        };

        // ######################### 

        st.render = function(){
            if(this.next()){
                if(_tag){
                    return "<" + _tag + ">" + this.next().render() + "</" + _tag + ">";
                }else{
                    return this.next().render();
                }
            }else{
                if(_text){
                    return _text;
                }else{
                    return "<" + _tag + "/>";
                }
            }
        };

        return st;
    };

    var rd = {};
    rd.stack = new Stack();

    // ######################### 
   
    rd.render = function(){
        console.log("rendering");
        return rd.stack.render();
    };

    // ######################### 

    rd.text = function(text){
        rd.stack.last(new Stack(text));
        return rd;
    };

    rd.span = function(attrs){
            rd.stack.last(new Stack("span", attrs));
            return this;
    };

    rd.div = function(attrs){
            rd.stack.last(new Stack("div", attrs));
            return this;
    };

    rd.a = function(attrs){
            rd.stack.last(new Stack("a", attrs));
            return this;
    };

    return rd;
};
