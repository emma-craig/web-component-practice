class Tooltip extends HTMLElement {
  // every autonomous web component must extend HTMLElement
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "Some dummy tooltip text";
    this.attachShadow({ mode: "open" });
    const template = document.querySelector("#tooltip-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true)); // true to deep clone
  }
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    tooltipIcon = this.shadowRoot.querySelector("span");
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
    this._tooltipContainer.style.backgroundColor = "black";
    this._tooltipContainer.style.color = "white";
    this._tooltipContainer.style.position = "absolute";
    this._tooltipContainer.style.zIndex = "10";
  }
  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("ec-tooltip", Tooltip);
