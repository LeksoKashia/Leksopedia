const apiKey = "AIzaSyCfCKshWZlBTI9C-EYMTlCg8-apQICiQ1A"; // Replace with your actual API key
const SEARCH_API_Titles = `https://www.googleapis.com/books/v1/volumes?q=intitle:`;
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
const book_eye = document.querySelector(".book-eye");

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
    let { title, pageCount, averageRating, infoLink } = res[i].volumeInfo;
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

    localStorage.setItem(`authors${i}`, JSON.stringify(authors));

    output.innerHTML += `
      <div class="book" style="opacity: 0; animation: fadeIn 0.1s ease forwards ${
        i * 0.1
      }s">
        <div class="image">
          <img src="${image}" alt="" />
          <div class="hidden-info">
            <p class="author">${authors}</p>
            <div class="hidden-links">
            <a class="eye book-eye" book-index="${i}" authors="${authors}" averageRating="${averageRating}" pageCount="${pageCount}" image="${image}"><i class="fa-solid fa-eye"></i></a>
            <a href="${infoLink}" class="eye" target="_blank"><i class="fa-brands fa-google"></i></a>

            </div>
          </div>
        </div>
        <div class="text">
          <div class="info1">
            <p class="title" ${style}>${title}</p>

          </div>
          <div class="info2">
            <span class="pages"><i class="fa-solid fa-book-open" style="color: #53d3b1"></i> ${pageCount}</span>
            <span class="rate"><i class="fa-solid fa-star" style="color: #f2ff00"></i> ${averageRating}</span>
          </div>
        </div>
      </div>
    `;

    let book_eye = document.querySelectorAll(".book-eye");
    book_eye.forEach((eye) => {
      eye.addEventListener("click", () => {
        let index = eye.getAttribute("book-index");
        let authors = eye.getAttribute("authors");
        let averageRating = eye.getAttribute("averageRating");
        let pageCount = eye.getAttribute("pageCount");
        let image = eye.getAttribute("image");
        let bookInfo = {
          book: res[index],
          authors: authors,
          averageRating: averageRating,
          pageCount: pageCount,
          image: image,
        };
        localStorage.setItem("book", JSON.stringify(bookInfo));
        window.location = "./book.html";
      });
    });
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
const performSearch = () => {
  const searchTerm = search.value;
  const selectTerm = select.value;
  if (searchTerm && searchTerm !== "") {
    if (selectTerm == "Author") {
      res.textContent = "Author " + searchTerm + " Search Results";
      getBooks(SEARCH_API_Authors + searchTerm + "&maxResults=40");
      search.value = "";
    } else {
      res.textContent = "Title " + searchTerm + " Search Results";
      getBooks(SEARCH_API_Titles + searchTerm + "&maxResults=40");
      search.value = "";
    }
  } else {
    window.location.reload();
  }
};

icon.addEventListener("click", (e) => {
  e.preventDefault();
  performSearch();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  performSearch();
});
