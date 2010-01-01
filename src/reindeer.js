//##########################################
//
// Reindeer
//
// Html generation helpers

var Reindeer = function(){

    var supported_tags = ["span", "div", "a"];

    var Stack = function(type){

        st = {};
        var _tag, _next, _text;

        if(type in supported_tags){
            _tag = type;
        }else{
            _text = type;
        }

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

        st.length = function(i){
           var i = i || 0; 
           if(this.next()){
               return this.next().length(i+1);
           }else{
               return i;
           }
        }

        // ######################### 

        st.render = function(){
            if(this.next() != null){
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
        }

        return st;
    }

    var rd = {};
    rd.stack = Stack();

    // ######################### 
   
    rd.render = function(){
        console.log("rendering");
        return rd.stack.render();
    }

    // ######################### 

    rd.text = function(text){
        rd.stack.last(Stack(text));
        return rd;
    }

    var i, tag;
    for(i=0; i < supported_tags.length; i++){
        tag = supported_tags[i];
        rd[tag] = function(attrs){
            rd.stack.last(Stack(tag, attrs));
            return rd;
        }
    }

    return rd;
}
