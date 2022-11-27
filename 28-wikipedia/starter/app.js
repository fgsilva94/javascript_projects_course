const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";
const page_url = "http://en.wikipedia.org/?curid=";

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

formDOM.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = inputDOM.value;

  if (!value) {
    resultsDOM.innerHTML =
      '<div class="error">please enter valid search term</div>';
    return;
  }

  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  try {
    resultsDOM.innerHTML = '<div class="loading"></div>';

    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;

    if (results.length < 1) {
      resultsDOM.innerHTML =
        '<div class="error">no matching results. Please try again</div>';
      return;
    }

    renderResults(results);
  } catch (error) {
    resultsDOM.innerHTML = '<div class="error">there was an error...</div>';
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map(({ pageid, title, snippet }) => {
      return `<a href="${page_url}${pageid}" target="_blank">
            <h4>${title}</h4>
            <p>${snippet}</p>
          </a>`;
    })
    .join("");

  resultsDOM.innerHTML = `<div class="articles">${cardsList}</div>`;
};
