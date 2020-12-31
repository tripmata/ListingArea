// add find prototype
Element.prototype.find = function(query, closure)
{
    // load query
    let queryElement = document.querySelector(query);

    // are we good ??
    if (queryElement !== null) closure.call(this, queryElement);
};

// add appendWhenReady
Element.prototype.appendWhenReady = function(element, child=null)
{
    // get preloader
    const beforeContent = this.querySelector('.before-content');

    // content ready
    const contentReady = this.querySelector('.content-ready');

    if (child !== null)
    {
        beforeContent.find(child, (e)=>{
            // add child
            e.appendChild(element);
        });
    }
    else
    {
        // add child
        contentReady.appendChild(element);
    }
    
    // hide preloader
    beforeContent.style.display = 'none';

    // show now
    contentReady.style.display = 'block';
}


// add updateWhenReady
Element.prototype.updateWhenReady = function(element = null, callback = null)
{
    // get preloader
    const beforeContent = this.querySelector('.before-content');

    // content ready
    const contentReady = this.querySelector('.content-ready');

    if (element !== null)
    {
        beforeContent.find(element, (e)=>{
            // add child
            callback.call(this, e);
        });
    }
    
    // hide preloader
    beforeContent.style.display = 'none';

    // show now
    contentReady.style.display = 'block';
}