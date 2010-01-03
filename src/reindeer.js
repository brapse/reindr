//##########################################
//
// Reindeer
//
// Html generation helpers
// By: Sean Braithwaite
//
// NOTE: won't work in IE (js 1.6 dependencies)
// Try not to depend on jquery for now

Array.prototype.each = function(func){
    for(var i=0; i < this.length; i++){
       func(this[i]);
    }

    return this;
};

// ######################### 

var Reindeer = function(){

    var supported_tags = ["span", "div", "a", "ul", "li", "p"];

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
                if (_attrs.hasOwnProperty(prop)) {
                    tag_attributes.push(prop + "=\"" + _attrs[prop] + "\"");
                }
            }

            if(contents){
                return "<" + tag_attributes.join(' ') + ">" + this.next().render() + "</" + _tag + ">";
            }else{
                return "<" + tag_attributes.join(' ') + "/>";
            }
        };

        return st;
    };

    var Collection = function(elements, fill_func){
        var col = {};
        var _elements = elements;
        var _fill_func = fill_func;

        //XXX: this probobaly sucks
        var stack  = new Stack();
        col.next   = stack.next;
        col.last   = stack.last;
        col.length = stack.length;

        col.render = function(){
            var collection_elements = _elements.map(function(el){
                   return _fill_func(new Reindeer(), el);
            });

            if(this.next()){
                collection_elements.push(this.next().render());
            }

            return collection_elements.join("\n");
        };

        return col;
    };

    var rd = {};
    rd.stack = new Stack();

    // ######################### 
   
    rd.render = function(){
        return rd.stack.render();
    };

    // ######################### 

    rd.collect = function(col, fill_func){
        rd.stack.last(new Collection(col, fill_func));
        return this;
    };

    rd.text = function(text){
        rd.stack.last(new Stack(text));
        return rd;
    };

    supported_tags.each(function(tag){
        rd[tag] = function(attrs){
            rd.stack.last(new Stack(tag, attrs));
            return this;
        };
    });

    return rd;
};
