Reindr: Monadic html generation from javascript

========================

Generate html with a chain of functions, similar to how jquery does selectors.

The Reindr() (shortcutted as $R()) function will generate a monad that acts as a chain of nested html elements.
Calling render() on a chain will output html.

<pre><code>
    var r = $R().div.span.text("Hello World").render();
    
    should give you <div><span>Hello Word</span></div>
</code></pre>

Experimental. Undocumented, only slightly tested.
