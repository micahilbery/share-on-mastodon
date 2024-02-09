/**
 * @author Micah Ilbery
 * @version 1.2.0
 * @license GPL-3.0
 * @url https://github.com/micahilbery/share-on-mastodon
 */

// Get the page title to use if a title isn't set.
const docTitle = document.getElementsByTagName("title")[0].innerHTML;
const template = document.createElement("template");
template.innerHTML = `
<style>
  button:focus,
  input:focus-visible {
    outline: var(--mastodon-focus-ring, 2px solid #3B82F6);
    outline-offset: .12rem;
  }

  .btn-container {
    display: inline-block;
  }

  .btn {
    background-color: var(--mastodon-btn-bg, #563ACC);
    border: var(--mastodon-btn-border, 1px solid #2F0C7A);
    border-radius: var(--mastodon-btn-rad, 6px);
    color: var(--mastodon-btn-txt, #fff);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1;
    gap: .5em;
    padding: .75em 1em;

    &:hover,
    &:focus-visible {
      filter: brightness(120%);
    }

    &:active {
      filter: brightness(100%);
    }

    & > span {
      display: inline-block;
    }
  }

  .icon {
    height: 1em;

    & > svg {
      width: 1em;
      height: 1em;
    }
  }

  .modal {
    animation: load .3s ease-in;
    background-color: var(--mastodon-modal-bg, #282C37);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 252.85863 194.49997' width='252.85863' height='194.49997'%3E%3Cg transform='translate(-395.89999 -830.4)'%3E%3Cdefs%3E%3Cpath id='a' d='M395.89999 745.09998H690.5V1024.9H395.89999z'/%3E%3C/defs%3E%3CclipPath id='b'%3E%3Cuse xlink:href='%23a' width='100%25' height='100%25' overflow='visible'/%3E%3C/clipPath%3E%3Cpath class='st53' d='M339.3 1028.6c1.5-3.2 14.4-31.3 27.4-58.8-6-9.3-2-17 1.5-23.7 1.9-3.7 3.8-7.1 3.6-10.4-.8-22 8.1-38.3 22.8-41.6 2.8-.6 5.2-.9 7.5-.9 3 0 5.6.5 8.1 1.6 1.4-1.3 2.8-2.6 4.2-3.8-2.8-2.6-4.3-5.5-4.5-8.8-.3-4.5 2.2-9.5 6.8-13.7 5.3-4.8 16.5-12.9 31.7-12.9.9 0 1.7 0 2.6.1-.4-.9-1-2-2.1-2.9-2.1-1.6-1.9-3.2-1.6-4 .7-2.1 3.6-3.2 8.1-3.2 3.9 0 9.7 1.2 14 4.4.3-.7.7-1.3 1.3-1.7.5-.3 1.3-.5 2.2-.5 3.4 0 10.6 2.7 15.5 9.9 3.6 5.3 3.6 10.8.1 16 18.3 4.7 30.1 15.6 39.5 24.4 2.5 2.4 5 4.6 7.3 6.5 10.7 8.9 21.4 13.2 32.7 13.2.9 0 1.8 0 2.7-.1 2-13.5-4.1-25.5-10-35.7-6.2-10.7-6.4-12.1-4.9-13.9l.1-.1c.6-.7 1.3-1 2.1-1.1h.3c1.7 0 4.5 1 13 8.7 9.9 9 16.9 22.2 19.2 36.5 8.9-4.9 15.2-12.5 17.1-20.3 2-8.6.5-16.8-4.2-22.7l-13.1 6.1-7-16.9-15.6 3.2 7.2-19.5h.1l-.2-.5 4.6-11.1 65.7 11.9c3.1.6 3.9 2.7 3.6 4.5l-.2 1-.4-.1c-.3.4-.6.7-1 .9-.7.3-7.5 3.6-21 9.9 2.1 2.9 2.2 6.1.4 9.4-1.1 1.9-2.5 6.2.4 13.3 3.7 8.9 3.5 29.2-8.3 46.2-8.1 11.7-18.3 23-37.6 26.6-3 4.6-6.5 9-10.2 12.6-7.8 7.6-24 15.3-42.3 15.3-5.3 0-10.7-.6-15.9-1.9-7.6 12.9-10.5 26.2-10.6 32.1-.2 11 .9 16.1.9 16.2l.4 1.8-164.9.8.9-2.3z' clip-path='url(%23b)'/%3E%3Cpath class='st53' d='M339.8 1028.8c.1-.3 13.9-30.1 27.5-59.1-6.1-9.2-2.1-16.8 1.4-23.5 2-3.7 3.8-7.3 3.7-10.6-.8-21.7 8-37.9 22.4-41 2.7-.6 5.1-.9 7.4-.9 3 0 5.7.5 8.2 1.7 1.6-1.6 3.2-3 4.9-4.4-3-2.6-4.6-5.5-4.8-8.8-.3-4.4 2.1-9.2 6.6-13.3 5.3-4.8 16.4-12.8 31.4-12.8 1.1 0 2.2 0 3.3.1-.3-1.1-1-2.7-2.5-3.8-1.8-1.4-1.7-2.8-1.5-3.4.6-1.8 3.4-2.9 7.6-2.9 4.4 0 10.3 1.5 14.3 4.8.1-.9.6-1.7 1.3-2.1.4-.3 1.1-.4 1.9-.4 3.3 0 10.3 2.6 15.1 9.7 3.6 5.3 3.5 10.9-.3 16.1 18.6 4.6 30.5 15.6 40 24.4 2.6 2.4 5 4.6 7.3 6.5 10.8 8.9 21.6 13.3 33.1 13.3 1 0 2.1 0 3.1-.1 2.2-13.9-4-26.1-10-36.4-6.3-10.9-6.2-11.8-5-13.3l.1-.1c.2-.2.7-.9 1.8-.9h.2c1.5 0 4.2 1 12.7 8.6 10 9.1 17 22.5 19.2 36.9 9.3-5 16-12.8 17.9-20.9 2.1-8.9.4-17.4-4.5-23.4l-13 6.1-6.9-16.8-15.1 3.1 6.8-18.4h.6l-.5-1 4.4-10.6 65.3 11.8c3.5.7 3.3 3.2 3.2 3.9l-.1.5h-.2c-.2.4-.6.8-1 1-.7.3-7.9 3.7-21.6 10.2.1.1.2.2.3.4 2 2.7 2.2 5.8.4 8.9-1.1 2-2.6 6.4.4 13.7 3.6 8.8 3.4 28.8-8.2 45.7-8.1 11.7-18.2 22.9-37.5 26.4-3 4.7-6.5 9.1-10.3 12.7-7.8 7.5-23.7 15.1-42 15.1-5.4 0-10.9-.7-16.1-2-7.7 13.1-10.7 26.7-10.9 32.7-.2 11.1.9 16.2.9 16.3l.3 1.2-163.5.8.5-1.7z' clip-path='url(%23b)'/%3E%3Cpath d='M577.5 843.7l-1-2.1 3.9-9.4 64.5 11.6c2.4.5 2.5 2 2.4 2.8' clip-path='url(%23b)' stroke-miterlimit='10' fill='%23fff' stroke='%23000' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M584.2 856.7l6.9 16.6s53.7-25.1 55.5-26c.9-.5 1.5-2.2-1-2.3-2.5-.1-69.6-1.4-69.6-1.4l-5.9 16 14.1-2.9z' clip-path='url(%23b)' stroke-miterlimit='10' fill='%23fff' stroke='%23000' stroke-width='1.70000005' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M585.1 857l58.9-11.2 1.4-.5h.4c.8 0 .7.3.8.6.1.3-.1.6-.4.8L587 861.5l-1.9-4.5z' clip-path='url(%23b)' fill='%23d1d3d4'/%3E%3Cpath class='st57' clip-path='url(%23b)' stroke-miterlimit='10' d='M584.20001 856.70001l61.79999-11.5' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath class='st58' d='M388.5 927.9c20-40 49.9-56.3 83.4-54.9 33.6 1.4 48.8 21.7 62.4 32.9 13.6 11.2 27.5 15.6 43.4 12.5 15.9-3.1 28.5-14.6 31.2-26.1 2.7-11.5-1-20.7-6.1-25.8-5.1-5.1-1.4-8.1 4.1-6.8 5.4 1.4 8.1 3.4 8.1 3.4s7.8-6.4 9.8-3.7c2 2.7 1.7 5.4.3 7.8-1.4 2.4-2.7 7.1.3 14.6 3.1 7.5 4.1 27.1-8.1 44.8-12.2 17.6-26.5 30.1-62.1 26.5-38.5-3.9-54.6 44.2-54.9 59-.2 11.5.9 16.5.9 16.5l-160.7.8c.2-.1 33.4-72.4 48-101.5z' clip-path='url(%23b)' stroke-miterlimit='10' fill='%2353606c' stroke='%23000' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath class='st59' d='M399.4 989.3c-6.1 0-9.9-4.3-10-4.3l-.2-.2-.3.1c-3.1 1-6.1 1.5-9 1.5-6.1 0-11.4-2.2-15.6-6.5 1.4-3 2.9-6.1 4.3-9.1.1.1.1.2.2.3 6.1 8 12.7 9.7 17 9.7 3.2 0 5.6-.9 6.6-1.3.7 1.3 3 4.7 7.5 4.7 1.2 0 2.5-.3 3.9-.8 6.7-2.5 15.7-13.1 18.3-22.1 3.2 5.7-2.8 18.3-13.8 25.3-3 1.7-6 2.7-8.9 2.7zm24.5-78.1c-5.7-11.1-10.8-14.2-12.4-14.9 15.7-15.3 34.7-23 56.6-23 1.3 0 2.5 0 3.8.1 2.1.1 4.2.3 6.4.5 1.5 2.7-.4 5.6-.8 6.3-3 .8-11.2 6.5-18.5 11.6-1.9 1.3-3.7 2.6-5.3 3.7-5.3 3.7-13.6 4.2-18 4.2-1.8 0-2.9-.1-2.9-.1h-.3l-8.6 11.6zm95.3 49c4.2-7.1 12.6-15.2 28.3-15.2 3.5 0 7.2.4 11 1.2 3.4.7 7 1.1 10.6 1.1 15.9 0 29.8-7.9 34.8-12.5 6.5-6 10.5-9.8 12-12.4 1.4-2.4 3.2-2.8 4.7-2 .1.1-.7 1.1-.6 1.1-.9 1.7-1.9 3.3-3 4.8-11.5 16.6-23.9 26.9-50 26.9-3.6 0-7.5-.2-11.6-.6-1.5-.2-3-.2-4.4-.2-9.4 0-18.1 3.2-25.9 9.4l-5.9-1.6z' clip-path='url(%23b)' fill='%2338434f'/%3E%3Cpath class='st58' d='M427.4 920.5c-9.1-24.2-19-27.9-32.4-25-13.4 3-22.4 18-21.6 40 .4 10.2-15.5 20.5-4.3 35s23.5 8 23.5 8 3 7.1 11 4.1 16.7-13.5 18.5-21.6' clip-path='url(%23b)' stroke-miterlimit='10' fill='%2353606c' stroke='%23000' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath class='st59' d='M417.2 934.2c-7.3.5-8.6-4.8-7.3-7 1.2-2.1 4.6-3.2 4.6-3.2s-5.3-.2-6.3-4c-1-3.7 4-5.3 4-5.3s-2.9-8.6-13.3-6.1-14.4 11.7-14.2 19c.6 15.3-10.2 22.8 0 29.7 10.1 6.9 23.7-2.8 28.5-11.3 4.8-8.5 4-11.8 4-11.8z' clip-path='url(%23b)' fill='%2338434f'/%3E%3Cpath class='st57' d='M392.6 978.6c6.3-3.9 9.1-7.5 9.1-7.5m15.5-36.9c-7.3.5-8.6-4.8-7.3-7 1.2-2.1 4.6-3.2 4.6-3.2s-5.3-.2-6.3-4c-1-3.7 4-5.3 4-5.3s-2.9-8.6-13.3-6.1-14.6 11.7-14.2 19' clip-path='url(%23b)' stroke-miterlimit='10' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M417.5 891.4c-9.8-6.9-6.2-16 .3-21.8 6.5-5.8 19-14 35.2-12.2 0 0-.2-3.5-3.1-5.8s-.5-4.5 5.5-4.5 12.9 2.6 15.8 6.9c0 0-1.4-3.2.4-4.4 1.8-1.2 10.2 1 15.6 9s1.1 14.9-5.2 19.9c-6.3 5-36.2 11.6-48.8 10.9' clip-path='url(%23b)' fill='%2353606c'/%3E%3Cg class='st53' clip-path='url(%23b)'%3E%3Cpath class='st36' d='M459.5 878.7c-11.1.6-22.1 3.3-32.9 6.1-4.1 1.1-8.2 2.2-12.4 2-.4 0-.8-.1-1.3-.1 1 1.6 2.5 3.2 4.6 4.7l15.6-2.1c11.3.7 37-4.7 46.4-9.4-6.5-1.1-13.3-1.5-20-1.2z' fill='%2338434f'/%3E%3C/g%3E%3Cpath class='st59' d='M417.5 890.8c-3.5-2.5-5.3-5.5-5.5-8.8-.2-3.2 1.2-6.7 4-9.9-.4 1.6-.2 3.2.5 4.7 1.2 2.5 3.6 4 6.3 4 2.1 0 4.3-.9 6.3-2.6 7.2-6 19.4-10.4 29.1-10.4 1.9 0 3.7.2 5.3.5 7.7 1.6 12.3 3.7 13.8 6.7.8 1.6.8 3.3 0 5.4-10.1 4.3-31.2 8.6-42.1 8.6-.7 0-1.4 0-2.1-.1-1.4-.1-2.8-.1-4-.1-7.5-.1-10.6 1.4-11.6 2z' clip-path='url(%23b)' fill='%2338434f'/%3E%3Cpath class='st57' d='M471.2 854c2.2 3.4 1.1 6.7 1.1 6.7' clip-path='url(%23b)' stroke-miterlimit='10' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M489.6 967.9c34.6 23.5 68.7 8.7 80.2-2.4 11.4-11.1 20.8-28.5 20-45.9-.8-17.4-8.5-32.9-19.5-42.8-10.7-9.6-12.4-8.7-13.2-7.7-.8 1-1.4 1.1 5 12.2s13.4 24.6 9.5 40.2c-3.9 15.6-15.6 29.9-29.6 34-14 4-21.6-1.4-26.1-3.2 0 0 1 4-3.4 4.3-4.3.3-11.1-2.9-11.1-2.9s2.7 3 .1 5-5.9-.9-5.9-.9 2.5 2.2 1.5 3.3c-1 1.1-2.3.8-4.2-.6 0 0 3.2 3.6 1 5.5s-4.3 1.9-4.3 1.9z' clip-path='url(%23b)' stroke-miterlimit='10' fill='%23b3becd' stroke='%23000' stroke-width='1.60000002' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M528.6 979.9c-13.1 0-25.8-3.9-37.6-11.7.9-.2 2.1-.7 3.3-1.8 1.4-1.3 1-3 .3-4.3.4.1.8.2 1.1.2.7 0 1.3-.3 1.8-.8.3-.3.4-.6.4-1 0-.3-.1-.6-.2-.9.6.2 1.2.4 1.9.4.9 0 1.7-.3 2.4-.8.3-.2.5-.5.7-.8 12.6 6.2 22.6 9.1 31.5 9.1 7.8 0 14.7-2.3 21.1-6.9 16.8-12.3 21.3-21.3 24.6-27.9l.3-.6c2.3-4.5 4.2-6.5 6.4-6.5.9 0 1.7.3 2.7.9-1.4 13.6-8.7 28-19.6 38.6-7.9 7.4-23.4 14.8-41.1 14.8z' clip-path='url(%23b)' fill='%2392a1b5'/%3E%3Cpath class='st57' d='M489.6 967.9c-3.9.1-6.7-.9-6.7-.9' clip-path='url(%23b)' stroke-miterlimit='10' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M484 908.3c-2.2.9-2.1 3.2.1 6.7 2.1 3.5 4.5 7.9 5.9 10.3 1.4 2.4 2.6 3.5 4 2.8 1.4-.6 1.8-2 .4-4.9-1.4-2.9-5.8-11-7.2-12.7-1.6-1.7-2.4-2.5-3.2-2.2z' clip-path='url(%23b)' stroke-miterlimit='10' fill='%2338434f' stroke='%23000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath class='st57' d='M525.9 907.8c2.5-3.7 4.8-5.2 4.8-5.2m3.8 11.9c1.5-3.1 3.7-5.6 3.7-5.6m11.9 13.3c1-3.9 2.7-5.6 2.7-5.6m10.7 9c.6-4.6.9-6.6.9-6.6' clip-path='url(%23b)' stroke-miterlimit='10' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cg class='st53' clip-path='url(%23b)'%3E%3Cpath class='st49' d='M504.9 862.2c.8-.4 1.5-.8 2.2-1.1' fill='none' stroke='%23e3e5e5' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M519.8 856.2c13.6-3.5 22.1.5 28.2 3.3 5.3 2.4 11.6 4.7 17.6 5.3' fill='none' stroke='%23e3e5e5' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' stroke-dasharray='4.5286,13.5857'/%3E%3Cpath class='st49' d='M572.4 864.5c.8-.2 1.6-.4 2.4-.7' fill='none' stroke='%23e3e5e5' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cg class='st53' clip-path='url(%23b)'%3E%3Cpath d='M491.2 946.7c-4.1 1.1-6.1 1.8-10 3.5-2.1.9-4.6.1-5.6-1.9s0-4.6 2.3-5.6c4.3-1.9 6.6-2.7 11.2-3.9 2.4-.6 4.8.8 5.3 2.9.4 2.2-1 4.4-3.2 5z' fill='%23505762'/%3E%3C/g%3E%3Cpath class='st57' d='M515.8 952.3c-.2-2.3-1.7-3.3-1.7-3.3' clip-path='url(%23b)' stroke-miterlimit='10' fill='none' stroke='%23000' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cg class='st53' clip-path='url(%23b)'%3E%3Cpath d='M454.5 887.5c-3.5.7-7.1 1.3-10.6 1.7-3.6.4-7.2.8-10.8.6-.3 0-.5-.2-.5-.5s.2-.5.5-.5c3.5.2 7.1-.1 10.6-.4 3.5-.4 7.1-.9 10.6-1.6.2 0 .4.1.4.3.1.2 0 .4-.2.4z'/%3E%3C/g%3E%3Cg class='st53' clip-path='url(%23b)'%3E%3Cpath d='M417.2 891.8c-2.2-1.6-4.3-3.6-5.4-6.2l-.4-1-.2-1-.1-.5v-.5c0-.4-.1-.7-.1-1.1 0-1.4.2-2.8.7-4.1.9-2.6 2.6-4.9 4.4-6.9 1.9-2 4-3.6 6.2-5.2s4.6-2.9 7-4.1c2.4-1.2 5-2.2 7.6-2.9 5.2-1.5 10.7-1.9 16.1-1.4l-.6.5c-.2-1.3-.7-2.7-1.4-3.8-.4-.6-.8-1.1-1.4-1.5-.5-.5-1.2-1-1.5-1.9-.1-.2-.1-.5-.1-.7.1-.2.1-.5.2-.7.2-.4.6-.7.9-.9.7-.5 1.4-.7 2.2-.9 1.5-.3 3-.4 4.4-.4 2.9.1 5.9.7 8.6 1.8 2.7 1.1 5.3 2.8 7.1 5.3l-.9.5c-.3-.7-.5-1.3-.5-2.1-.1-.7 0-1.5.4-2.3.3-.3.5-.7 1-.8.2-.1.4-.1.6-.2.2 0 .4-.1.6-.1.7 0 1.4.1 2.1.2 1.4.3 2.6.8 3.9 1.4 1.2.6 2.4 1.3 3.5 2.1 2.2 1.6 4.1 3.6 5.6 5.9.7 1.2 1.4 2.4 1.8 3.7.3.6.4 1.3.5 2 .1.3.1.7.1 1v1c-.1 2.8-1.3 5.5-3 7.6-1.7 2.2-3.6 4-5.9 5.6-2.4 1.4-4.9 2.3-7.4 3.2-2.5.8-5.1 1.5-7.8 1.9 1.2-.5 2.5-.9 3.7-1.4l3.7-1.3c2.5-.9 5-1.8 7.2-3.2 2.1-1.5 4-3.3 5.6-5.4 1.5-2.1 2.6-4.5 2.7-7 .1-2.5-.8-5-2.2-7.1-1.4-2.2-3.2-4.1-5.3-5.6-2.1-1.5-4.4-2.8-6.9-3.4-.6-.1-1.2-.2-1.8-.2-.6 0-1 .1-1.3.5-.5.8-.2 2.3.2 3.4.1.3 0 .5-.3.6-.2.1-.4 0-.6-.2-1.6-2.3-4-3.8-6.6-4.9-2.6-1.1-5.4-1.7-8.2-1.7-1.4 0-2.8.1-4.2.4-.7.2-1.3.4-1.8.7-.5.4-.8.8-.7 1.3.1.5.6.9 1.2 1.4.6.5 1.1 1.1 1.5 1.7.9 1.3 1.4 2.7 1.6 4.3 0 .3-.2.5-.4.5h-.1c-5.3-.5-10.7-.1-15.8 1.4-2.5.7-5 1.7-7.4 2.8-2.4 1.2-4.7 2.5-6.8 4.1-2.2 1.5-4.3 3.2-6.1 5.1-1.8 1.9-3.4 4.1-4.2 6.5-.4 1.2-.6 2.5-.7 3.8 0 .3.1.6.1 1v.5l.1.5.2.9.4.9c1 2.4 2.9 4.3 5 5.8.2.2.3.5.1.7-.2.2-.4.3-.7.1z'/%3E%3C/g%3E%3Cg class='st53' clip-path='url(%23b)'%3E%3Cpath class='st36' d='M615.1 863.2c2 1.2 2.3 1.8 2.3 1.8' fill='%2338434f'/%3E%3Cpath d='M615.3 862.9l1.2.9c.2.2.4.3.6.5.2.2.3.4.5.6 0 .1 0 .2-.1.2h-.2l-.5-.5c-.2-.1-.4-.3-.6-.4-.4-.3-.8-.5-1.3-.7-.2-.1-.2-.3-.1-.5s.2-.2.5-.1c-.1 0-.1 0 0 0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 234.80078 31.757813" width="234.80078" height="31.757812"><path d="M19.599609 0c-1.05 0-2.10039.375-2.90039 1.125L0 16.925781v14.832031h234.80078V17.025391l-16.5-15.900391c-1.6-1.5-4.20078-1.5-5.80078 0l-13.80078 13.099609c-1.6 1.5-4.19883 1.5-5.79883 0L179.09961 1.125c-1.6-1.5-4.19883-1.5-5.79883 0L159.5 14.224609c-1.6 1.5-4.20078 1.5-5.80078 0L139.90039 1.125c-1.6-1.5-4.20078-1.5-5.80078 0l-13.79883 13.099609c-1.6 1.5-4.20078 1.5-5.80078 0L100.69922 1.125c-1.600001-1.5-4.198829-1.5-5.798829 0l-13.59961 13.099609c-1.6 1.5-4.200781 1.5-5.800781 0L61.699219 1.125c-1.6-1.5-4.198828-1.5-5.798828 0L42.099609 14.224609c-1.6 1.5-4.198828 1.5-5.798828 0L22.5 1.125C21.7.375 20.649609 0 19.599609 0z" fill="%23606984"/></svg>');
    background-size: 8rem, auto;
    background-position: bottom left, bottom center;
    background-repeat: no-repeat, repeat-x;
    border: var(--mastodon-modal-border, 1px solid #191B22);
    border-radius: var(--mastodon-modal-rad, 12px);
    color: var(--mastodon-modal-txt, #fff);
    max-width: 30em;
    padding: 2rem 2rem 8rem 2rem;
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);

    &::backdrop {
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(var(--mastodon-backdrop-blur, 4px));
    }
  }

  #modal-heading {
    text-wrap: balance;
    margin: 0;
    padding: 0;
  }

  #instance-jargon {
    opacity: .75;
  }

  #modal-form {
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr auto;
  }

  @media(max-width: 480px) {
    #modal-form {
      grid-template-columns: 1fr;
    }
  }

  #instance-input {
    background-color: var(--mastodon-input-bg, #313543);
    border: var(--mastodon-input-border, 1px solid #191B22);
    border-radius: var(--mastodon-input-rad, 6px);
    color: var(--mastodon-input-txt, #fff);
    font-size: 1rem;
    padding: .75em 1em;
    margin: 0;

    &:placeholder {
      color: var(--mastodon-modal-txt-alt, #677282);
    }

    &:valid {
      outline: var(--mastodon-url-valid, 2px solid #22C55E);
      outline-offset: .12rem;
    }

    &:invalid {
      outline: var(--mastodon-url-invalid, 2px solid #ef4444);
      outline-offset: .12rem;
    }
  }

  #share-button {
    place-self: center;
  }

  #modal-close {
    position: absolute;
    inset-block-start: .5em;
    inset-inline-end: .5em;
  }

  .btn-close {
    font-size: 1.25rem;
    background-color: var(--mastodon-close-bg, #313543);
    border: var(--mastodon-close-border, 1px solid #191B22);
    border-radius: var(--mastodon-close-rad, 500px);
    color: inherit;
    padding-block: .28em .3em;
    padding-inline: .25em;
    aspect-ratio: 1;

    &:hover,
    &:focus-visible {
      filter: brightness(120%);
    }

    &:active {
      filter: brightness(80%);
    }
  }

  @keyframes load {
    from {
      transform: translateY(1vh);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>

<div id="mastodon-button" class="btn-container">
  <slot name="button">
    <button class="btn" part="button">
      <span id="mastodon-icon" class="icon" aria-hidden="true" part="icon">
        <svg viewBox="0 0 74 79" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M73.7014 17.9592C72.5616 9.62034 65.1774 3.04876 56.424 1.77536C54.9472 1.56019 49.3517 0.7771 36.3901 0.7771H36.2933C23.3281 0.7771 20.5465 1.56019 19.0697 1.77536C10.56 3.01348 2.78877 8.91838 0.903306 17.356C-0.00357857 21.5113 -0.100361 26.1181 0.068112 30.3439C0.308275 36.404 0.354874 42.4535 0.91406 48.489C1.30064 52.498 1.97502 56.4751 2.93215 60.3905C4.72441 67.6217 11.9795 73.6395 19.0876 76.0945C26.6979 78.6548 34.8821 79.0799 42.724 77.3221C43.5866 77.1245 44.4398 76.8953 45.2833 76.6342C47.1867 76.0381 49.4199 75.3714 51.0616 74.2003C51.0841 74.1839 51.1026 74.1627 51.1156 74.1382C51.1286 74.1138 51.1359 74.0868 51.1368 74.0592V68.2108C51.1364 68.185 51.1302 68.1596 51.1185 68.1365C51.1069 68.1134 51.0902 68.0932 51.0695 68.0773C51.0489 68.0614 51.0249 68.0503 50.9994 68.0447C50.9738 68.0391 50.9473 68.0392 50.9218 68.045C45.8976 69.226 40.7491 69.818 35.5836 69.8087C26.694 69.8087 24.3031 65.6569 23.6184 63.9285C23.0681 62.4347 22.7186 60.8764 22.5789 59.2934C22.5775 59.2669 22.5825 59.2403 22.5934 59.216C22.6043 59.1916 22.621 59.1702 22.6419 59.1533C22.6629 59.1365 22.6876 59.1248 22.714 59.1191C22.7404 59.1134 22.7678 59.1139 22.794 59.1206C27.7345 60.2936 32.799 60.8856 37.8813 60.8843C39.1036 60.8843 40.3223 60.8843 41.5447 60.8526C46.6562 60.7115 52.0437 60.454 57.0728 59.4874C57.1983 59.4628 57.3237 59.4416 57.4313 59.4098C65.3638 57.9107 72.9128 53.2051 73.6799 41.2895C73.7086 40.8204 73.7803 36.3758 73.7803 35.889C73.7839 34.2347 74.3216 24.1533 73.7014 17.9592ZM61.4925 47.6918H53.1514V27.5855C53.1514 23.3526 51.3591 21.1938 47.7136 21.1938C43.7061 21.1938 41.6988 23.7476 41.6988 28.7919V39.7974H33.4078V28.7919C33.4078 23.7476 31.3969 21.1938 27.3894 21.1938C23.7654 21.1938 21.9552 23.3526 21.9516 27.5855V47.6918H13.6176V26.9752C13.6176 22.7423 14.7157 19.3795 16.9118 16.8868C19.1772 14.4 22.1488 13.1231 25.8373 13.1231C30.1064 13.1231 33.3325 14.7386 35.4832 17.9662L37.5587 21.3949L39.6377 17.9662C41.7884 14.7386 45.0145 13.1231 49.2765 13.1231C52.9614 13.1231 55.9329 14.4 58.2055 16.8868C60.4017 19.3772 61.4997 22.74 61.4997 26.9752L61.4925 47.6918Z" fill="inherit"/>
        </svg>
      </span>
      <span id="button-text" part="buttontext">Share on Mastodon</span>
    </button>
  </slot>
</div>

<dialog id="mastodon-modal" class="modal" aria-labelledby="modal-heading">
  <h1 id="modal-heading">Please enter your instance</h1>
  <p id="modal-text">As Mastodon has many servers, we need to know where to send the request. We'll try to remember your instance for next time.</p>
  <form id="modal-form" method="dialog" >
    <input id="instance-input" type="url" pattern="https://+.+" placeholder="https://mastodon.social/" required="true" aria-labelledby="modal-heading" aria-describedby="modal-text" autofocus />
    <button id="share-button" class="btn" type="submit">
      <span class="icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" version="1.1" viewBox="0 0 16 16">
          <path d="M13.5 1c-.654 0-1.153.206-1.791.463l-.004.002L2.33 4.852C1.595 5.066 1 5.702 1 6.506c0 .824.625 1.405 1.303 1.56l3.342 1.582 3.501-3.502a.5.5 0 0 1 .708 0 .5.5 0 0 1 0 .708L6.35 10.357l1.568 3.34c.087.322.264.618.518.858A1.56 1.56 0 0 0 9.5 15c.813 0 1.359-.63 1.635-1.24a.485.485 0 0 0 .015-.04l3.412-9.642a.335.335 0 0 0 .004-.014C14.721 3.59 15 3.157 15 2.5c0-.823-.677-1.5-1.5-1.5Z"/>
        </svg>
      </span>
      <span id="share-text">Share…</span>
    </button>
  </form>

  <p><small id="instance-jargon">
    Your socal address or "instance" is the portion after your username.
    <br>
    (ex. username@instance.com)
  </small><p>

  <form method="dialog" id="modal-close">
    <button class="btn-close" aria-label="Close">
      <span class="icon" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3.99 2.99a1 1 0 00-.697 1.717L6.586 8l-3.293 3.293a1 1 0 101.414 1.414L8 9.414l3.293 3.293a1 1 0 101.414-1.414L9.414 8l3.293-3.293a1 1 0 00-.727-1.717 1 1 0 00-.687.303L8 6.586 4.707 3.293a1 1 0 00-.717-.303z"/>
        </svg>
      </span>
    </button>
  </form>
</dialog>
`;

export class shareOnMastodon extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // Get button text from attribute if available
    if (this.dataset.buttonText) {
      this.shadowRoot.querySelector("#button-text").innerHTML =
        this.dataset.buttonText;
    }

    // Get the modal heading from attribute if available
    if (this.dataset.modalHeading) {
      this.shadowRoot.querySelector("#modal-heading").innerHTML =
        this.dataset.modalHeading;
    }

    // Get the modal text from attribute if available
    if (this.dataset.modalText) {
      this.shadowRoot.querySelector("#modal-text").innerHTML =
        this.dataset.modalText;
    }

    // Get the modal text from attribute if available
    if (this.dataset.jargonText) {
      this.shadowRoot.querySelector("#instance-jargon").innerHTML =
        this.dataset.jargonText;
    }

    // Get the default url to use as placeholder text from attribute if available
    if (this.dataset.defaultUrl) {
      this.shadowRoot.querySelector("#instance-input").placeholder =
        this.dataset.defaultUrl;
    }

    // Get the share button text from attribute if available
    if (this.dataset.shareText) {
      this.shadowRoot.querySelector("#share-text").innerHTML =
        this.dataset.shareText;
    }
  }

  openModal() {
    // Prefill the form with the user's previously-specified Mastodon instance, if applicable
    const storedInstance = localStorage?.getItem("mastodonInstance");
    if (storedInstance) {
      this.shadowRoot.querySelector("#instance-input").value = storedInstance;
    }

    // open Dialog as modal
    this.shadowRoot.querySelector("#mastodon-modal").showModal();
  }

  urlCheck() {
    let val = this.shadowRoot.querySelector("#instance-input").value;
    if (!val == "" && !val.startsWith("https://")) {
      this.shadowRoot.querySelector("#instance-input").value = "https://" + val;
    }
    this.shadowRoot.querySelector("#instance-input").checkValidity();
  }

  shareOnMastodon() {
    // Set instance from the modal text input
    let instance = this.shadowRoot.querySelector("#instance-input").value;

    // check, format, and cache instance
    if (instance) {
      // Handle URL formats
      if (!instance.startsWith("https://") && !instance.startsWith("http://"))
        instance = "https://" + instance;

      // Handle ending slash
      if (!instance.endsWith("/")) instance = instance + "/";

      // Cache the instance/domain for future requests
      localStorage?.setItem("mastodonInstance", instance);
    }

    // If the share-title attribute is set use it. Otherwise, use the page title
    let shareTitle = this.pageTitle;
    if (this.dataset.shareTitle) {
      shareTitle = this.dataset.shareTitle + "\n";
    } else {
      shareTitle = docTitle + "\n";
    }

    // If the share-description attribute is set use it. Otherwise, only use this for formating
    let desc = this.dataset.shareDescription;
    if (desc) {
      desc = desc + "\n\n";
    } else {
      desc = "\n";
    }

    // If the hashtags attribute is set use it. Otherwise, set it to an empty string
    let hashtags = this.dataset.hashtag;
    if (hashtags) {
      hashtags = "\n\n" + hashtags;
    } else {
      hashtags = "";
    }

    // If the author attribute is set use it. Otherwise, set it to an empty string
    let author = this.dataset.author;
    if (author) {
      author = "\n\n" + author;
    } else {
      author = "";
    }

    // Get the current page's URL
    const url = window.location.href;

    // Create the Share URL
    const instanceUrl = new URL(`${instance}share?`);
    const params = new URLSearchParams({
      text: shareTitle + desc + url + hashtags + author,
    });
    const shareUrl = instanceUrl + params;

    // Open a new tab at the share location
    window.open(shareUrl, "_blank");
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#mastodon-button")
      .addEventListener("click", () => this.openModal());
    this.shadowRoot
      .querySelector("#share-button")
      .addEventListener("click", () => this.shareOnMastodon());
    this.shadowRoot
      .querySelector("#instance-input")
      .addEventListener("blur", () => this.urlCheck());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#mastodon-button").removeEventListener();
    this.shadowRoot.querySelector("#share-button").removeEventListener();
  }
}

window.customElements.define("share-on-mastodon", shareOnMastodon);
