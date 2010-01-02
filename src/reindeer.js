//##########################################
//
// Reindeer
//
// Html generation helpers
// By: Sean Braithwaite
//
// NOTE: won't work in IE
// Try not to depend on jquery for now

var Reindeer = function(){
    var supported_tags = ["span", "div", "a"];

    var Stack = function(type, attrs){

        st = {};
        var _tag, _next, _text;
        var _attrs = attrs || {};

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
                return _tag ? this.render_tag(this.next().render()) : this.next().render();
            }else{
                return _text ? _text : this.render_tag();
            }
        };

        st.render_tag = function(contents){
            var tag_attributes = [_tag];
            for(var prop in _attrs){
                tag_attributes.push(prop + "=\"" + _attrs[prop] + "\"");
            }

            if(contents){
                return "<" + tag_attributes.join(' ') + ">" + this.next().render() + "</" + _tag + ">";
            }else{
                return "<" + tag_attributes.join(' ') + "/>";
            }
        };

        return st;
    };

    var rd = {};
    rd.stack = new Stack();

    // ######################### 
   
    rd.render = function(){
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
