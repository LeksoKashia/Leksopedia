const book = localStorage.getItem("book");
const bookData = JSON.parse(book);

const main = document.querySelector(".main");

console.log(bookData.book.volumeInfo.title);
const bookDesc = document.createElement("div");

bookDesc.innerHTML = `
<div class="book">
<figure>
  <img
  src="${bookData.image}"
    alt=""
  />
</figure>
<div class="text">
  <h1>${bookData.book.volumeInfo.title}</h1>
  <div class="info2">
    <span class="pages"
      ><i class="fa-solid fa-book-open"></i>
      ${bookData.pageCount}</span
    >
    <span class="rate"
      ><i class="fa-solid fa-star"></i> ${bookData.averageRating}</span
    >
  </div>
  <p>Written By: ${bookData.authors}</p>
  <div class="buttons">
    <a href="#video-container"><button>Play Review</button></a>
    <a href="${bookData.book.volumeInfo.previewLink}"><button>Start Reading</button></a>
  </div>
  <a href="${bookData.book.volumeInfo.infoLink}" class="google">Visit in google</a>
  <h3>Description</h3>
  <p class="desc">
  ${bookData.book.volumeInfo.description}
  </p>
</div>
</div>
`;

main.appendChild(bookDesc);

$.get(
  "https://www.googleapis.com/youtube/v3/search",
  {
    part: "snippet",
    q: bookData.book.volumeInfo.title + " book review",
    key: "AIzaSyBdxwNOKhxwj1B7Rlvcsl5-Y9E6_1nskmw",
  },
  function (data) {
    const videoId = data.items[0].id.videoId;
    const videoUrl = "https://www.youtube.com/embed/" + videoId;
    $("#video-player").attr("src", videoUrl);
  }
);
