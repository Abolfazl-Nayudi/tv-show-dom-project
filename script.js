const parentCard = document.querySelector(".parent-card");
const navForm = document.querySelector(".nav-form");
const searchInput = document.querySelector(".nav-form input");
const dropdown = document.querySelector(".episod-dropdown");
const specialLiDropDown = document.querySelector(".special-li");
console.log(specialLiDropDown);

// render the data
const getData = async () => {
  const request = await axios.get("https://api.tvmaze.com/shows/82/episodes");

  request.data.forEach((item) => {
    const html = `<div class="card" style="width: 19rem">
          <img src="${item.image.medium}" class="card-img-top" alt="..." />
          <div class="episod-name">
          <h5 >${item.name}</h5>
          </div>
          <div class="card-body summary">
            ${item.summary}
          </div>
          <div class="episod-parent card-header text-center">
            <p class="episod">
              ${item.season < 10 ? "S0" + item.season : "S" + item.season}${
      item.number < 10 ? "E0" + item.number : "E" + item.number
    }
            </p>
          </div>
        </div>`;

    parentCard.innerHTML += html;
  });

  searchFunc(request.data);
  episodDropdown(request.data);
};

getData();

// make the search bar

function searchFunc(term) {
  searchInput.addEventListener("keyup", (e) => {
    parentCard.innerHTML = "";
    term
      .filter((ele) => {
        return (
          ele.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          ele.summary.toLowerCase().includes(e.target.value.toLowerCase())
        );
      })
      .forEach((item) => {
        const render = `<div class="card" style="width: 19rem">
          <img src="${item.image.medium}" class="card-img-top" alt="..." />
          <div class="episod-name">
          <h5 >${item.name}</h2>
          </div>
          <div class="card-body summary">
            ${item.summary}
          </div>
          <div class="episod-parent card-header text-center">
          <p class="episod">
          ${item.season < 10 ? "S0" + item.season : "S" + item.season}${
          item.number < 10 ? "E0" + item.number : "E" + item.number
        }
          </p>
          </div>
        </div>`;
        parentCard.innerHTML += render;
      });
  });
}

// make the dropdown
function episodDropdown(data) {
  const arrOfLiEl = [];
  const arrOfNameEpisod = [];
  data.forEach((ele) => {
    arrOfNameEpisod.push(ele.name);
  });

  // this for loop create the list of episods in dropdown
  data.forEach((item) => {
    const liEl = document.createElement("li");
    liEl.classList += "dropdown-item list-of-episod";
    arrOfLiEl.push(liEl);
    liEl.textContent = ` ${
      item.season < 10 ? "S0" + item.season : "S" + item.season
    }${item.number < 10 ? "E0" + item.number : "E" + item.number} ${item.name}`;
    dropdown.append(liEl);
  });

  // this loop make the list of episods in dropdown interactive and when we click on each item the website will show us just that card that has the same episod's name
  data.forEach((item, index) => {
    arrOfLiEl[index].addEventListener("click", (e) => {
      if (arrOfNameEpisod.includes(e.target.textContent.slice(8))) {
        parentCard.innerHTML = "";

        const card = `<div class="card" style="width: 19rem">
            <img src="${item.image.medium}" class="card-img-top" alt="..." />
            <div class="episod-name">
            <h5 >${item.name}</h2>
            </div>
            <div class="card-body summary">
              ${item.summary}
            </div>
            <div class="episod-parent card-header text-center">
            <p class="episod">
            ${item.season < 10 ? "S0" + item.season : "S" + item.season}${
          item.number < 10 ? "E0" + item.number : "E" + item.number
        }
        </p>
            </div>
          </div>`;
        parentCard.innerHTML += card;
      }
    });
  });

  // this eventListener of the first item of dropdwon and when we click on that it will show all cards
  specialLiDropDown.addEventListener("click", () => {
    console.log("helo");
    parentCard.innerHTML = "";
    data.forEach((item) => {
      const html = `<div class="card" style="width: 19rem">
          <img src="${item.image.medium}" class="card-img-top" alt="..." />
          <div class="episod-name">
          <h5 >${item.name}</h5>
          </div>
          <div class="card-body summary">
            ${item.summary}
          </div>
          <div class="episod-parent card-header text-center">
            <p class="episod">
              ${item.season < 10 ? "S0" + item.season : "S" + item.season}${
        item.number < 10 ? "E0" + item.number : "E" + item.number
      }
            </p>
          </div>
        </div>`;

      parentCard.innerHTML += html;
    });
  });
}
