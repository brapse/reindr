//##########################################
//
// Reindr
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
var do_html = function(t_func){

    var object_size_count = function(obj){
        var count = 0;
        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                count++;
            }
        }
        return count;
    };

    var tag_function = function(tag, attrs, content){
        var tag_attributes = [];
        if(typeof(attrs) == 'object'){
            for(var prop in attrs){
                if(attrs.hasOwnProperty(prop)){
                    tag_attributes.push(prop + '="' + attrs[prop] + '"');
                }
            }
        }

        html = '';
        html += '<' + tag;
        if(tag_attributes.length > 0){
            html += ' ' + tag_attributes.join(' ');
        }

        if(typeof(content) == 'string'  && content.length > 0){
            html += '>' + content + '</' + tag + '>';
        }else{
            html += '/>'
        }

        return html;
    };

    var tag_function_generator = function(tag){
        return function(attrs, content){
            if(object_size_count(attrs) > 0){
                return function(a, c){
                    return tag_function(tag, attrs, c);
                }
            }else{
                return tag_function(tag, attrs, content);
            }
        }
    };

    var body = t_func.toString().replace(/\n/g, "").match(/{(.*)}/)[1];

         var supported_tags = ['div', 'p', 'span', 'a', 'ul', 'li', 'table', 'tr', 'td'];
    var wrapper = new Function('div', 'p', 'span', 'a', 'ul', 'li', 'table', 'tr', 'td', body);

    var tag_functions = supported_tags.map(function(tag){
                return tag_function_generator(tag);
            });

    var stack = wrapper.apply(null, tag_functions);

    var render = function(node){
        console.log('rendering');
        if(typeof(node) == "undefined" || !node.length || node.length == 0){
            return '';
        }else if(typeof(node) == "string"){
            return node;
        }else if(typeof(node[0]) == "function"){
            //an element with children
            var tag = node.shift();
            return tag({}, render(node));
        }else{
            //children
            return node.map(function(el){ return render(el) }).join("\n");
        }
    }

    return render(stack);
};
