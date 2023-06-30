const book = localStorage.getItem("book");
const bookData = JSON.parse(book);

const main = document.querySelector(".main");

console.log(bookData.volumeInfo.title);
const movieDesc = document.createElement("div");
// movieDesc.classList.add("container");

movieDesc.innerHTML = `
<img src="${bookData.volumeInfo.imageLinks.thumbnail}" >
<h1> ${bookData.volumeInfo.title}</h1>
<h2> ${bookData.volumeInfo.authors}</h2>
<p> ${bookData.volumeInfo.description}</p>
<p> rating: ${bookData.volumeInfo.averageRating}</p>
<p> page count: ${bookData.volumeInfo.pageCount}</p>
<a href="${bookData.volumeInfo.infoLink}"> visit in google</a>
<br>
<a href="${bookData.volumeInfo.previewLink}"> start reading</a>

`;
main.appendChild(movieDesc);

$.get(
  "https://www.googleapis.com/youtube/v3/search",
  {
    part: "snippet",
    q: bookData.volumeInfo.title + "book review",
    key: "AIzaSyCfCKshWZlBTI9C-EYMTlCg8-apQICiQ1A",
  },
  function (data) {
    // Extract the first video result
    const videoId = data.items[0].id.videoId;

    // Display the video on your website
    const videoUrl = "https://www.youtube.com/embed/" + videoId;
    $("#video-player").attr("src", videoUrl);
  }
);
