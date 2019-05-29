export default class AirNav extends HTMLElement {
    constructor() {
        super();
        this.activeLink = null;
    }

    connectedCallback() {
        this.activeLinkClass = this.getAttribute('activeLinkClass');
        if (!this.activeLinkClass)
            this.activeLinkClass = 'active-link';
        const links = this.querySelectorAll("a");
        links.forEach(e => this.registerListener(e));

        // Are we coming back from a refresh, and need to reload the view?
        const location = window.location.href.split('#')[1]; // from address bar 
        if (location) { //like "Add" or "List"
            let hrefLink = this.querySelector(`[href="#${location}"]`);
            this.dispatchNavEvent(window.location.href, location, true);
            this.onLinkClicked({ target: hrefLink });
            this.activeLink = hrefLink;

        }
    }

    dispatchNavEvent(href, view, delay = false) {
        const event = new CustomEvent('air-nav', {
            detail: {
                href: href,
                hash: view
            },
            bubbles: true
        });

        if (delay) {
            setTimeout(() => { // Delayed event creation, why do we need to do this?
                this.dispatchEvent(event);
            }, 0);
        } else {
            this.dispatchEvent(event);
        }
    }

    registerListener(e) {
        e.onclick = evt => this.onLinkClicked(evt);
        window.onhashchange = evt => this.onAddressBarChanged(evt);
    }

    onAddressBarChanged(evt) {
        const { location } = window;
        const { href } = location;
        const { hash } = location;
        console.log(" onhashchange->", href, hash);

        this.dispatchNavEvent(href, hash.substring(1));
        const element = this.querySelector(`[href="${hash}"]`);
        this.onLinkClicked({ target: element });

    }

    onLinkClicked(evt) {
        const { target } = evt;
        if (this.activeLink) {
            this.activeLink.classList.toggle(this.activeLinkClass);
        }
        this.activeLink = target;
        this.activeLink.classList.toggle(this.activeLinkClass);
    }

}

customElements.define('air-nav', AirNav);