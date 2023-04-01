const navbar = document.querySelector('.navbar .container');
const navbarToggler = document.querySelector('.navbar-toggler');
const navigationMenuItemsArr = [
    {id:'nvit-1', text: 'About Us', link: '#overview', active: 'true'},
    {id:'nvit-2', text: 'Packages', link: '#packages'},
    {id:'nvit-3', text: 'Reviews', link: '#reviews'},
    {id:'nvit-4', text: 'Book Now', link: '#book-now'}
];
const overviewSection = document.querySelector('#overview');
const packageSection = document.querySelector('#packages');
const reviewSection = document.querySelector('#reviews');
const bookingSection = document.querySelector('#book-now');

/**
 * @description Toggles active nav link and section by adding and removing active css classes
 * @param {*} activeNavItemId ID of the active nav item
 */
function toggleActiveNavItemAndSection(activeNavItemId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        if(item.id === activeNavItemId && !item.classList.contains('nav-item--active')) {
            item.classList.add('nav-item--active');
        } else if(item.id !== activeNavItemId && item.classList.contains('nav-item--active')) {
            item.classList.remove('nav-item--active');
        }
    });
    navigationMenuItemsArr.forEach(navMenuItem => {
        const el = document.querySelector(navMenuItem.link);
        if(navMenuItem.id === activeNavItemId && !el.classList.contains('section--active')) {
            el.classList.add('section--active');
        } else if(navMenuItem.id !== activeNavItemId && el.classList.contains('section--active')) {
            el.classList.remove('section--active');
        }
    })
};

/**
 * @description Click event callback that toggles between opening and closing animation css classes
 * of the navbar-menu and navbar-toggler.
 * @param {HTMLElement} navMenu Navigation menu (ul) list element.
 * @param {HTMLElement} navToggler Navigation menu toggler button element.
 */
function onToggleNavbar(navMenu, navToggler) {
    if(navToggler.classList.contains('navbar-toggler--ham')) {
        navToggler.classList.remove('navbar-toggler--ham');
        navToggler.classList.add('navbar-toggler--times');
        navMenu.classList.remove('navbar-nav--close');
        navMenu.classList.add('navbar-nav--open');
    } else if(navToggler.classList.contains('navbar-toggler--times')) {
        navToggler.classList.remove('navbar-toggler--times');
        navToggler.classList.add('navbar-toggler--ham');
        navMenu.classList.remove('navbar-nav--open');
        navMenu.classList.add('navbar-nav--close');
    } else {
        navToggler.classList.add('navbar-toggler--times');
        navMenu.classList.add('navbar-nav--open');
    }
}

/**
 * @description Click event callback that scrolls the page to the target
 * section by finding the target navigation link that was clicked.
 * @param {Event} e  Click event object.
 */
function onNavItemClick(e) {
    e.preventDefault();
    if(e.target.hash) {
        const targetSection = document.querySelector(e.target.hash);
        const scrollAmt = targetSection.getBoundingClientRect().top;
        window.scrollBy({
            behavior: 'smooth',
            top: scrollAmt
        });
    }
}

/**
 * @description Initializes the navbar by creating the navigation menu items 
 * dynamically, setting the '--default-navbar-menu-height' css variable equal 
 * to the height of the ul(navbar menu) element and attaching the click event 
 * listener to the navbar toggler button.
 * @param {HTMLElement} navbar Navigation bar top level element.
 * @param {HTMLElement} navToggler Navigation menu toggler button element.
 * @param {Array} navMenuItemsArr Array of object containing navigation menu data.
 */
function initNavbar(navbar, navToggler, navMenuItemsArr) {
    const navigationMenu = document.createElement('ul');
    navigationMenu.classList.add('navbar-nav');
    for(let navMenuItem of navMenuItemsArr) {
        let navItem = document.createElement('li');
        navItem.id = navMenuItem.id;
        navItem.classList.add('nav-item');
        if(navMenuItem.active) {
            navItem.classList.add('nav-item--active');
        }
    
        let navLink = document.createElement('a');
        navLink.classList.add('nav-link');
        navLink.textContent = navMenuItem.text;
        navLink.href = navMenuItem.link;
        navItem.appendChild(navLink);
        navigationMenu.appendChild(navItem);
    }
    navbar.appendChild(navigationMenu);
    document
        .documentElement
        .style
        .setProperty(
            '--default-navbar-menu-height', 
            `${navigationMenu.getBoundingClientRect().height}px`
        );
    navToggler.addEventListener('click', onToggleNavbar.bind(null, navigationMenu, navToggler));
    navigationMenu.addEventListener('click', onNavItemClick);
}

initNavbar(navbar, navbarToggler, navigationMenuItemsArr);
window.addEventListener('scroll', e => {
    const overviewSectionCBR = overviewSection.getBoundingClientRect();
    const packageSectionCBR = packageSection.getBoundingClientRect();
    const reviewSectionCBR = reviewSection.getBoundingClientRect();
    const bookingSectionCBR = bookingSection.getBoundingClientRect();
    if(overviewSectionCBR.top < window.innerHeight && overviewSectionCBR.bottom >= window.innerHeight / 2) {
        toggleActiveNavItemAndSection(navigationMenuItemsArr[0].id);
    } else if(packageSectionCBR.top < window.innerHeight && packageSectionCBR.bottom >= window.innerHeight / 2) {
        toggleActiveNavItemAndSection(navigationMenuItemsArr[1].id);
    } else if(reviewSectionCBR.top < window.innerHeight && reviewSectionCBR.bottom >= window.innerHeight / 2) {
        toggleActiveNavItemAndSection(navigationMenuItemsArr[2].id);
    } else if(bookingSectionCBR.top < window.innerHeight && bookingSectionCBR.bottom >= window.innerHeight / 2) {
        toggleActiveNavItemAndSection(navigationMenuItemsArr[3].id);
    }
})