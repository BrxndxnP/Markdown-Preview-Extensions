//window.addEventListener('DOMContentLoaded', (event) => {
window.addEventListener('load', (event) => {
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
});
