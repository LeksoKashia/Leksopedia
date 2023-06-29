const apiKey = "AIzaSyCfCKshWZlBTI9C-EYMTlCg8-apQICiQ1A"; // Replace with your actual API key
const SEARCH_API_Titles = `https://www.googleapis.com/books/v1/volumes?q=`;
const SEARCH_API_Authors = `https://www.googleapis.com/books/v1/volumes?q=inauthor:`;
const SEARCH_API_Subject = `https://www.googleapis.com/books/v1/volumes?q=subject:`;
const SEARCH_API_Publisher = `https://www.googleapis.com/books/v1/volumes?q=inpublisher:`;

const search = document.getElementById("search-box");
const form = document.querySelector("#form");
const output = document.querySelector("#output");
const select = document.querySelector("#select");
const category = document.querySelector("#category");
const publisher = document.querySelector("#publisher");
const res = document.querySelector(".res");

getBooks(SEARCH_API_Subject + "philosophy" + "&maxResults=30");
async function getBooks(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.items);
    console.log(data.items.length);
    showBooks(data.items);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

function showBooks(res) {
  output.innerHTML = " ";
  for (let i = 0; i < res.length; i++) {
    let { title, pageCount, averageRating } = res[i].volumeInfo;
    let image = "";
    if (res[i].volumeInfo.hasOwnProperty("imageLinks")) {
      image = res[i].volumeInfo.imageLinks.thumbnail;
    } else {
      image =
        "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg";
    }
    let authors = [];
    if (res[i].volumeInfo.hasOwnProperty("authors")) {
      authors = res[i].volumeInfo.authors;
      if (authors.length >= 2) {
        authors = authors[0] + "," + authors[1];
      } else {
        authors = authors[0];
      }
    } else {
      authors = "unknown";
    }

    let style = "style='font-size:1rem'";
    if (title.length > 55) {
      style = "style='font-size:0.9rem'";
    }
    if (!pageCount) {
      pageCount = "unk.";
    }
    if (!averageRating) {
      averageRating = "unk.";
    }

    output.innerHTML += `
      <div class="book" style="opacity: 0; animation: fadeIn 0.1s ease forwards ${
        i * 0.1
      }s">
        <div class="image">
          <img src="${image}" alt="" />
          <a href="" class="eye"><i class="fa-solid fa-eye"></i></a>
        </div>
        <div class="text">
          <div class="info1">
            <p class="title" ${style}>${title}</p>
            <p >${authors}</p>
          </div>
          <div class="info2">
            <span class="pages"><i class="fa-solid fa-book-open" style="color: #53d3b1"></i> ${pageCount}</span>
            <span class="rate"><i class="fa-solid fa-star" style="color: #f2ff00"></i> ${averageRating}</span>
          </div>
        </div>
      </div>
    `;
  }

  const books = document.querySelectorAll(".book");
  books.forEach((book) => {
    book.style.opacity = 1;
  });
}
select.addEventListener("change", function () {
  const selectedValue = select.value;
  search.classList.add("phStyle");
  search.classList.remove("show-placeholder"); // Remove the class initially

  search.classList.add("phStyle");
  if (selectedValue === "Title") {
    search.placeholder = "Enter Book Title ";
  } else if (selectedValue === "Author") {
    search.placeholder = "Enter Book Author ";
  }
});

category.addEventListener("change", function () {
  const selectedValue = category.value;
  if (selectedValue != "") {
    res.textContent = "Category " + selectedValue;
    publisher.value = publisher.options[0].value;
    getBooks(SEARCH_API_Subject + selectedValue + "&maxResults=30");
  }
});

publisher.addEventListener("change", function () {
  const selectedValue = publisher.value;
  if (selectedValue != "") {
    res.textContent = "Publisher " + selectedValue;
    category.value = category.options[0].value;
    getBooks(SEARCH_API_Publisher + selectedValue + "&maxResults=30");
  }
});

const icon = document.querySelector(".submit");
icon.addEventListener("click", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  const selectTerm = select.value;
  if (searchTerm && searchTerm !== "") {
    if (selectTerm == "Title") {
      res.textContent = "Title " + searchTerm + " Search Results";
      getBooks(SEARCH_API_Titles + searchTerm + "&maxResults=40");
      search.value = "";
    } else {
      res.textContent = "Author " + searchTerm + " Search Results";
      getBooks(SEARCH_API_Authors + searchTerm);
      search.value = "";
    }
  } else {
    window.location.reload();
  }
});
