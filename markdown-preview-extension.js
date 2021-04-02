//window.addEventListener('DOMContentLoaded', (event) => {
window.addEventListener('load', (event) => {

    function configureTOC() {
        document.getElementsByTagName('body')[0].setAttribute('html-show-sidebar-toc', true);
    
        var activelinkClassName = 'toc-active-link';
        var parentlinkClassName = 'toc-active-link-parent';
    
        var child = document.querySelectorAll('.md-sidebar-toc a')[0];
        child.classList.add(activelinkClassName);
        child.parentNode.classList.add(parentlinkClassName);
    
        // document.querySelectorAll('.md-sidebar-toc a')[0].classList.add(activelinkClassName);
    
        window.onscroll = () => {
            function getHeaderLinkId() {
                var headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
                if (headers === undefined && headers.length === 0)
                    return;
                    
                // Bottom of the page => Use last link
                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)
                    return headers[headers.length - 1].id;
                
                for (let i = 0; i < headers.length; i++) {
                    var top = headers[i].getBoundingClientRect().top;
                  
                    if (top > 0) {
                        if (top < 10) {
                            return headers[i].id;
                        } else {
                            return (headers[i - 1] !== undefined) ? 
                                headers[i - 1].id : headers[i].id;
                        }
                    }
                }
            }
            
            function getActiveTOCLink(id){
                var links = document.querySelectorAll('.md-sidebar-toc a');
                for (let i = 0; i < links.length; i++) {
                    if (links[i].href.includes(id))
                        return links[i];
                }
            }
            
            function resetLinks(){
                var activelinks = document.querySelectorAll('.' + activelinkClassName);
                for (let i = 0; i < activelinks.length; i++) {
                    activelinks[i].classList.remove(activelinkClassName);
                    activelinks[i].parentNode.classList.remove(parentlinkClassName);
                }
            }
            
            var headerId = getHeaderLinkId();
            if (headerId !== undefined) {
                var tocElement = getActiveTOCLink(headerId)
                
                if (tocElement !== null && tocElement !== undefined) {
                    resetLinks();
                    tocElement.classList.add(activelinkClassName);
                    tocElement.parentNode.classList.add(parentlinkClassName);
                }
            }
        }
    }

    function configureCode() {
        //  Set the language name on code blocks
        // var codeblocks = document.querySelectorAll('pre:not([class$="-"])');
        var codeblocks = document.querySelectorAll('pre');
    
        for (let i = 0; i < codeblocks.length; i++) {
            var attributeName = 'code-collapsed';
            var block = codeblocks[i];
    
            //  Set the ID
            block.id = 'pre-' + i;
    
            //  Create a container
            var container = document.createElement('div');
            container.id = 'codeblock-' + i;
            container.classList.add('code-container');
            block.parentElement.insertBefore(container, block);
    
    
            //  Set the language
            var codelanguage = block.classList[0].replace('language-', '');
    
            if (codelanguage.length > 0) {
                block.setAttribute('code-language', codelanguage);
                container.setAttribute('code-language', codelanguage);
            } else {
                block.setAttribute('code-language', 'code');    
                container.setAttribute('code-language', 'code');    
            }
    
            var codeButton = document.createElement('button');
            codeButton.classList.add('code-button');
    
            codeButton.onclick = () => {
                var elem1 = document.getElementById('pre-' + i);
                var elem2 = document.getElementById('codeblock-' + i);
    
                if (elem1.hasAttribute(attributeName)) {
                    elem1.removeAttribute(attributeName)
                    elem2.removeAttribute(attributeName)
                } else {
                    elem1.setAttribute(attributeName, true)
                    elem2.setAttribute(attributeName, true)
                }
            }
    
            container.appendChild(codeButton);
            container.appendChild(block);
        }
    }

    configureTOC();
    configureCode();
    
    console.log('Imported');
});
