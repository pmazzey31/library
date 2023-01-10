
var totalBooks = document.getElementById("totalBooks");
var totalReadBooks = document.getElementById("totalReadBooks");
var totalNotReadBooks = document.getElementById("totalNotReadBooks");
var submitBook = document.getElementById("submitBook");

let myLibrary = [ 
{
    title: "El sutil arte de que te importe un caraj@",
    author: "Mark Mason",
    genre: "Self-help",
    pages: "224",
    readStatus: true,
}

,{
    title: "Metodo Lean Startup",
    author: "Eric Ries",
    genre: "Startups",
    pages: "319",
    readStatus: true,
},

{
    title: "Habitos atomicos",
    author: "James Clear",
    genre: "Self-help",
    pages: "326",
    readStatus: true,
},

{
    title: "Como ganar amigos e influir en las personas",
    author: "Dale Carnegie",
    genre: "Biography",
    pages: "327",
    readStatus: true,
},

{
    title: "Fuego y Sangre",
    author: "George R. R. Martin",
    genre: "Fiction",
    pages: "448",
    readStatus: false,
},

{
    title: "Como ganar amigos e influir en las personas",
    author: "Dale Carnegie",
    genre: "Biography",
    pages: "327",
    readStatus: true,
},
];

function Book(title, author, pages, genre, readingStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.readStatus = readingStatus;
  }

function displayBooks(library) {
    const booksContainer = document.querySelector(".books-container");
    booksContainer.innerHTML = "";
    for(let i=0; i<library.length; i++){
        booksContainer.innerHTML = booksContainer.innerHTML + createBook(library[i], i)
    }
    readingTextStatus();
    deletingBooks();
    setBooksCount();
}


const createBook =  (book, i) => {
    book.id = i;
    const newBook = `
        <div class="book" id="${i}">
            <div class="book-main-info">
                <h2 class="book-title">${book.title}</h2>
                <p class="author">${book.author}</p>
                <hr>
            </div>
            <div class="book-info">
                <div class="book-info-left">
                    <p class="type-of-genre">Genre: <span class="genre">${book.genre}</span></p>
                    <p class="n-pages">Number of pages: <span class="pages">${book.pages}</span></p>
                    <button class="deleteBook">Remove</button>
                </div>
                <div class="book-info-right">
                    <label class="switch">
                        <input type="checkbox" class="bookCheckbox" ${book.readStatus? "checked" : ""}>
                        <span class="slider round"></span>
                    </label>
                    <p class="reading-status">${book.readStatus? "Read" : "Not read"}</p>
                </div>
            </div>
        </div>
    `;
    return newBook
}


displayBooks(myLibrary);


//MODAL FOR NEW BOOK

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var addNewBook = document.getElementById("addNewBook");

// Get the <span> element that closes the modal
var closeModal = document.getElementsByClassName("closeModal")[0];

// When the user clicks on the button, open the modal
addNewBook.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//SUBMIT FORM FROM MODAL
var newBookForm = document.querySelector(".newBookForm");
var newBookTitle = document.querySelector("#newBookTitle");
var newBookAuthor = document.querySelector("#newBookAuthor");
var newBookPages = document.querySelector("#newBookPages");
var newBookGenre = document.querySelector("#newBookGenre");
var newBookReadingStatus = document.querySelector(".modalCheckbox");
newBookForm.addEventListener('submit', addBookToLibrary);


function addBookToLibrary(event) {
    event.preventDefault();
    const CreatingNewBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value, newBookGenre.value, newBookReadingStatus.checked)
    myLibrary.push(CreatingNewBook);
    displayBooks(myLibrary);
    newBookTitle.value = "";
    newBookAuthor.value = "";
    newBookPages.value = "";
    newBookGenre.value = "";
    newBookReadingStatus.checked = false;
    modal.style.display = "none";
};


//CHANGE BOOKS COUNT BOX

function setBooksCount(){
    totalBooks.textContent = `${myLibrary.length}`;
    let read = 0;
    for(let i=0; i<myLibrary.length; i++){
        if(myLibrary[i].readStatus === true){
            read += 1;
        };
    }
    totalReadBooks.textContent = `${read}`;
    totalNotReadBooks.textContent = `${myLibrary.length - read}`
}

setBooksCount();

submitBook.onclick = function() {
    setBooksCount();
};

//REMOVE BUTTONS FOR BOOKS
function deletingBooks() {
    var deleteBook = document.querySelectorAll(".deleteBook");
    for (let i = 0; i < deleteBook.length; i++) {
        deleteBook[i].addEventListener("click", function() {
            var bookToRemove = document.getElementById(`${i}`);
            bookToRemove.remove();
            myLibrary.splice(i, 1);
            displayBooks(myLibrary);
    });
    }
}


//CHECKBOX TEXT STATUS
function readingTextStatus() {
    var checkbox = document.querySelectorAll(".bookCheckbox");
    var readingStatus = document.querySelectorAll(".reading-status");
    
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('change', function() {
            if(myLibrary[i].readStatus === true){
                myLibrary[i].readStatus = false;
                readingStatus[i].textContent = "Not Read"; 
                setBooksCount();
            } else {
                myLibrary[i].readStatus = true;
                readingStatus[i].textContent = "Read";
                setBooksCount();
            }})
    }

}




