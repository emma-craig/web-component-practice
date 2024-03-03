class Tooltip extends HTMLElement {
  // every autonomous web component must extend HTMLElement
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "Some dummy tooltip text";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
   <style> 
   div {
       background-color: black; 
       color: white;
       position: absolute;
       z-index: 10;
       background-color : "black";
    }

   </style>
    <slot></slot>
    <span> (?) </span>
    `;
  }
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));

    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }

  _showTooltip() {
    // use _ to signify its a private method ie will only be called within this class. Its a convention
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }
  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("ec-tooltip", Tooltip);
