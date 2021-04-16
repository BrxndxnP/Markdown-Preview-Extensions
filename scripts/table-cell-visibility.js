/**
 * Works with Markdown-Preview-Enhanced extension
 * Hides table cells without merging them by using the '-' character.
 */

window.addEventListener('load', (event) => {
    var tags = document.querySelectorAll('td, th')

    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];

        if (tag.textContent === '-') {
            tag.setAttribute('data-hidden', true);
        }
    }
});