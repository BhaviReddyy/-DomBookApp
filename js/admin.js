const STORAGE_KEY = "dombookapp_books";
const defaultImage = "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg";

const form = document.getElementById("addBookForm");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const categorySelect = document.getElementById("category");
const filterSelect = document.getElementById("filterSelect");
const sortAZ = document.getElementById("sortAZ");
const sortZA = document.getElementById("sortZA");
const booksGrid = document.getElementById("booksGrid");
const clearBtn = document.getElementById("clearBtn");

let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveBooks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function renderBooks() {
    booksGrid.innerHTML = "";

    let filter = filterSelect.value;
    let filteredBooks = books.filter(b => filter === "All" ? true : b.category === filter);

    if (filteredBooks.length === 0) {
        booksGrid.innerHTML = "<p>No books found.</p>";
        return;
    }

    filteredBooks.forEach(book => {
        let card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
      <img src="${book.imageUrl}" />
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <small>${book.category}</small>
      <button class="delete-btn" data-id="${book.id}">Delete</button>
    `;

        booksGrid.appendChild(card);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let book = {
        id: Date.now(),
        title: titleInput.value,
        author: authorInput.value,
        category: categorySelect.value,
        imageUrl: defaultImage
    };

    books.push(book);
    saveBooks();
    renderBooks();
    form.reset();
});

booksGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        let id = e.target.getAttribute("data-id");
        books = books.filter(b => b.id != id);
        saveBooks();
        renderBooks();
    }
});

filterSelect.addEventListener("change", renderBooks);
sortAZ.addEventListener("click", () => {
    books.sort((a, b) => a.title.localeCompare(b.title));
    saveBooks();
    renderBooks();
});
sortZA.addEventListener("click", () => {
    books.sort((a, b) => b.title.localeCompare(a.title));
    saveBooks();
    renderBooks();
});

clearBtn.addEventListener("click", () => form.reset());

renderBooks();