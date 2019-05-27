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
        console.log("links=", links);
        links.forEach(e => this.registerListener(e));



        let location = window.location.href.split('#')[1];
        if (location) { //"Add"
            let hrefLink = this.querySelector(`[href="#${location}"]`);
            hrefLink.classList.add(this.getAttribute('activeLinkClass'));
            this.activeLink = hrefLink;
            this.onLinkClicked({ target: hrefLink });

            const event = new CustomEvent('air-nav', {
                detail: {
                    href: "http://localhost:3000/#" + location,
                    hash: location
                },
                bubbles: true
            });
            document.querySelector('air-nav').dispatchEvent(event);
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
        const event = new CustomEvent('air-nav', {
            detail: {
                href: href,
                hash: hash.substring(1)
            },
            bubbles: true

        });
        this.dispatchEvent(event);
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