import { LitElement, html } from 'lit-element'
import '../App/SideBar'
import { css } from "@lion/core";
import globalCss from "../../CSS/style-module";

class IndianBooks extends LitElement{
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

customElements.define('app-indian-books', IndianBooks)