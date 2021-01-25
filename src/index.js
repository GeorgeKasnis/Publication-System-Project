import axios from "axios";

// GET DATA FROM DATABASE
const getPubs = async () => {
  try {
    const response = await axios.get("https://intern-proj-14dbc-default-rtdb.europe-west1.firebasedatabase.app/.json");
    let counter = 0;
    let counterOrg1 = 0;
    let counterOrg2 = 0;
    let counterOrg3 = 0;
    let counterOrg4 = 0;
    let counterOrg5 = 0;
    for (let y in response.data) {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
          <div class="card-body">
            <h5 class="card-title text-te">${response.data[y].title}</h5>
            <h6 class="card-subtitle mt-2 mb-2 text-muted">${response.data[y].authorname}</h6>
            <p class="card-text">${response.data[y].publicationarea}</p>
            <div class="d-flex justify-content-between">
              <button  id="pubbtn" class="btn"  style="width: 30%;">Read More</button>
              <div id="cardfooter">
              <span id="time">${response.data[y].pubdate}</span>
              <span id="footerspan">${response.data[y].organization}</span>
              </div>
            </div>
          </div>
          `;

      document.body.appendChild(div);

      if (response.data[y].organization == "Org1") {
        counterOrg1++;
      } else if (response.data[y].organization == "Org2") {
        counterOrg2++;
      } else if (response.data[y].organization == "Org3") {
        counterOrg3++;
      } else if (response.data[y].organization == "Org4") {
        counterOrg4++;
      } else {
        counterOrg5++;
      }

      counter++;
    }

    document.querySelector("#org1").innerHTML = ` Org1 Pubilications: ${counterOrg1}`;
    document.querySelector("#org2").innerHTML = ` Org2 Pubilications: ${counterOrg2}`;
    document.querySelector("#org3").innerHTML = ` Org3 Pubilications: ${counterOrg3}`;
    document.querySelector("#org4").innerHTML = ` Org4 Pubilications: ${counterOrg4}`;
    document.querySelector("#org5").innerHTML = ` Org5 Pubilications: ${counterOrg5}`;

    document.querySelector("#lastitem").innerHTML = `
      <a  class="nav-link" id="lastlink" href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      Total Publications:${counter}
    </a>
      `;
  } catch (err) {
    console.error(err);
  }
};

getPubs();

// POST DATA TO DATABASE
$(document).on("click", "#submitBtn", async function () {
  if (
    document.querySelector("#Title").value !== "" &&
    document.querySelector("#AuthorName").value !== "" &&
    document.querySelector("#pubDate").value !== ""
  ) {
    const response = await axios
      .post("https://intern-proj-14dbc-default-rtdb.europe-west1.firebasedatabase.app/.json", {
        title: document.querySelector("#Title").value,
        authorname: document.querySelector("#AuthorName").value,
        pubdate: document.querySelector("#pubDate").value,
        publicationarea: document.querySelector("#pubArea").value,
        organization: document.querySelector("#organization").value,
      })

      .then((response) => {
        console.log(response);
      });
  }
});

// SUBMIT FORM DATA
function logSubmit(event) {
  log.textContent = "Publication was succesfull";
  event.preventDefault();
}

const form = document.getElementById("myForm");
const log = document.getElementById("log");
form.addEventListener("submit", logSubmit);

// RELOAD PAGE AFTER FROM CLOSING TO GET NEW DATA
$("#closeBtn").click(function (e) {
  location.reload();
});
