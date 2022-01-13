import { LitElement, html } from 'lit-element'
import '../App/SideBar'
import { css } from "@lion/core";
import globalCss from "../../CSS/style-module";

class InternationalBooks extends LitElement{
    /**
   * Returns styles specifically related to this component
   */
  static get styles() {
    
}
    render(){
        return html`
        <side-bar></side-bar>
        
        `
    }
}

customElements.define('app-book-international', InternationalBooks)