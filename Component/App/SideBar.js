import { LitElement, html } from "lit-element";
import { css } from "@lion/core";
import globalCss from "../../CSS/style-module";

class SideBar extends LitElement {
  /**
   * Returns styles specifically related to this component
   */
  static get styles() {
    return [
      globalCss,
      css`
        .sidebar {
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #333;
          transition: 0.5s;
          padding-top: 60px;
          overflow: hidden;
        }

        .sidebar a {
          padding: 8px 8px 8px 32px;
          text-decoration: none;
          font-size: 25px;
          color: #818181;
          display: block;
          transition: 0.3s;
        }

        .sidebar a:hover {
          color: #f1f1f1;
        }

        .sidebar .closebtn {
          position: absolute;
          top: 0;
          right: 25px;
          font-size: 36px;
          margin-left: 50px;
        }

        .openbtn {
          font-size: 20px;
          cursor: pointer;
          background-color: #111;
          color: white;
          padding: 10px 15px;
          border: none;
        }

        .openbtn:hover {
          background-color: #444;
        }

        #main {
          transition: margin-left 0.5s;
          padding: 16px;
        }

        /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
        @media screen and (max-height: 450px) {
          .sidebar {
            padding-top: 15px;
          }
          .sidebar a {
            font-size: 18px;
          }
        }

        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #333;
        }

        li {
          float: left;
        }

        li a {
          display: block;
          color: white;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
        }

        li a:hover {
          background-color: #111;
        }
        .header{
            display: flex;
            justify-content: center;
            color: white;
            font-size: 25px;
        }
      `,
    ];
  }

  /**
   * Open side navigation bar
   * @param {*} e Event object
   */
  openNav(e) {
    this.shadowRoot.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  /**
   * Close side navigation bar
   * @param {*} e Event object
   */
  closeNav(e) {
    this.shadowRoot.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  /**
     * 
     * @param {*} e Event Object
     */
    searchClick(e) {
       
    }

  render() {
    return html`
      <div id="mySidebar" class="sidebar" @click="${this.closeNav}">
        <a href="javascript:void(0)" class="closebtn">X</a>
        <a href="/home">Home</a>
        <a href="/IndianBooks">Indian Books</a>
        <a href="/about">About</a>
      </div>
      <ul>
        <li class="openbtn" @click="${this.openNav}">☰</li>
        <li class="header">Profile Database</li> 
      </ul>
    `;
  }
}

customElements.define("side-bar", SideBar);
