import { LitElement, html } from "lit-element";
import "../App/SideBar";
import { css } from "@lion/core";
import globalCss from "../../CSS/style-module";
import { repeat } from "lit-html/directives/repeat.js";

class Home extends LitElement {
  /**
   * Return object
   */
  static get properties() {
    return {
      recommendedData2: { type: Array },
    };
  }
  /**
   * Returns styles specifically related to this component
   */
  static get styles() {
    return [
      globalCss,
      css`
      .main__body{
        background-image: url("../../Asset/dark_background.jpg");
      }
        .bookLanding__homepage {
          background-color: lightblue;
          overflow-y: scroll;
          height: 405px;
          border: 5px solid white 
        }

        .table {
          display: table;
          width: auto;
          border: 1px solid #666666;
        }
        .table-row {
          display: table-col;
          width: auto;
          clear: both;
        }
        .table-col {
          float: left;
          display: table-column;
          width: 200px;
          border: 1px solid #ccc;
        }

        .myclass {
          width: 1%;
          white-space: nowrap;
        }
        .avatar {
          width: 0
          height: 10px
          border-radius: 50%;
        }
        .userDataForm {
          display: flex;
          justify-content: center;
          background-color: red;
          color: white;
          align-item: center;
          border: 1px solid red;
          margin-left: 32%;
          margin-top: 2%;
          margin-bottom: 5%;
          padding: 1%;
          width: 30%;
        }
        .btn-submit {
          color: black;
          align: center;
          margin: 10px;
          margin-left: 35%;
          background-color: yellow;
        }
        .option-btn{
          margin: 15px;
          height: 25px;
        }
        footer{
          background-color: rebeccapurple;
          text-align: center;
          color: white;
          font-size: 19px;
        }
      `,
    ];
  }

  /**
   * Lifecycle callback method
   */
  async connectedCallback() { 
    await fetch("https://reqres.in/api/users?page=2")
      .then((response) => response.json())
      .then((json) => {
        this.recommendedData = JSON.stringify(json);
        this.recommendedData2 = JSON.parse(this.recommendedData);
        if (localStorage.getItem("data1")) {
          let value1 = JSON.parse(localStorage.getItem("data1"));
          value1.forEach((element) => {
            this.recommendedData2.data.push(element);
          });
        } else {
          this.recommendedData2;
        }
      });
    super.connectedCallback();
  }

  render() {
    return html`
      <div class="main__body">
        <div class="bookLanding__homepage">
          <side-bar></side-bar>
          <table width="100%" border="1">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Delete Specific Data</th>
              <th>Edit Specific Data</th>
            </tr>
            <tr>
              <td>
                ${repeat(
                  this.recommendedData2.data,
                  (item) => item.id,
                  (item) => html`<p><td>${JSON.stringify(item.id)}</td></p>
                    <hr />`
                )}
              </td>
              <td>
                ${repeat(
                  this.recommendedData2.data,
                  (item) => item.id,
                  (item) => html`<p><td>${JSON.stringify(item.email)}</td></p>
                    <hr />`
                )}
              </td>
              <td>
                ${repeat(
                  this.recommendedData2.data,
                  (item) => item.id,
                  (item) => html`<p>
                      <td>${JSON.stringify(item.first_name)}</td>
                    </p>
                    <hr />`
                )}
              </td>
              <td>
                ${repeat(
                  this.recommendedData2.data,
                  (item) => item.id,
                  (item) => html`<p>
                      <td>${JSON.stringify(item.last_name)}</td>
                    </p>
                    <hr />`
                )}
              </td>
              <td>
                ${repeat(
                  this.recommendedData2.data,
                  (item) => item.id,
                  (item) => html`<p class="option-btn">
              <lion-button class="delete-btn" @click=${this.deleteData.bind(
                this,
                item
              )}>Delete</lion-buton>
              </p><hr>`
                )}
              </td>
              <td>
                ${repeat(
                  this.recommendedData2.data,
                  (item) => item.id,
                  (item) => html`<p class="option-btn">
              <lion-button class="edit-btn" @click=${this.editButton.bind(
                this,
                item
              )}>Edit</lion-buton>
              </p><hr>`
                )}
              </td>

              <td></td>
            </tr>
          </table>
        </div>
        <div class="userDataForm">
          <lion-form>
            <form (ngSubmit)="formData($event)">
              <label>First Name</label>
              <lion-input
                name="firstName"
                id="fName"
                .modelValue=${this.firstName}
              ></lion-input>
              <label>Last Name</label>
              <lion-input
                name="lastName"
                id="lName"
                .modelValue=${this.lastName}
              ></lion-input>
              <label>Email</label>
              <lion-input
                name="email"
                id="eMail"
                .modelValue=${this.email}
              ></lion-input>
              <label>Job</label>
              <lion-input
                name="job"
                id="job"
                .modelValue=${this.job}
              ></lion-input>
              <lion-button
                type="Submit"
                class="btn-submit"
                @click="${this.formData}"
                >Submit</lion-button
              >
            </form>
          </lion-form>
        </div>
        <footer>App Made by Shubrat Singh</footer>
      </div>
    `;
  }

  /** Form Data method */
  formData() {
    let fName = this.shadowRoot.getElementById("fName").value;
    let lName = this.shadowRoot.getElementById("lName").value;
    let eMail = this.shadowRoot.getElementById("eMail").value;
    let job = this.shadowRoot.getElementById("job").value;
    let headerData = {
      first_name: fName,
      last_name: lName,
      email: eMail,
      job: job,
    };
    this.getDevices(headerData);
  }

  /** POST api call for the new data entry ID generation */
  getDevices = async (data) => {
    try {
      await fetch(`https://reqres.in/api/users`, {
        method: "POST",
        headers: {
          name: data.first_name,
          job: data.job,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.postData = JSON.stringify(json);
          this.postData2 = JSON.parse(this.postData);
          data.id = parseInt(this.postData2.id);
          const items = (() => {
            const fieldValue = localStorage.getItem("data1");
            return fieldValue === null ? [] : JSON.parse(fieldValue);
          })();
          items.push(data);
          localStorage.setItem("data1", JSON.stringify(items));
          location.reload();
        });
    } catch (e) {
      return e;
    }
  };

  deleteData = async (id) => {
    await fetch(`https://reqres.in/api/users/2`, {
      method: "DELETE",
    }).then((response) => {
      for (let i = 0; i < this.recommendedData2.data.length; i++) {
        if (this.recommendedData2.data[i].id === id.id) {
          this.recommendedData2.data.splice(i, 1);
          if (localStorage.getItem("data1")) {
            let localStorageFormData = JSON.parse(
              localStorage.getItem("data1")
            );
            for (let i = 0; i < localStorageFormData.length; i++) {
              let localStorageFormData2 = localStorageFormData[i];
              if (localStorageFormData2.id == id.id) {
                localStorageFormData.splice(i, 1);
                let localStorageFormData3 = JSON.stringify(
                  localStorageFormData
                );
                localStorage.setItem("data1", localStorageFormData3);
              }
            }
          }
          this.requestUpdate();
        }
      }
    });
  };

  editButton() {}
}

customElements.define("app-home", Home);
