// Class to represent book
	class Book {
		constructor(title, author, isbn) {
			this.title = title;
			this.author = author;
			this.isbn = isbn;
		}
	}
// Class: UI Tasks
	class UI {
		static displayBooks() {
			
			let books = Store.getBooks();
			books.forEach((book) => UI.addBookToList(book))
		}

		static addBookToList(book) {
			let bookListBody = document.querySelector('#book-list')

			let bookListRow = document.createElement('tr')

			bookListRow.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="btn btn-sm btn-danger delete">X</a></td>
			`
			bookListBody.appendChild(bookListRow)
		}

		static deleteBook(el) {
			if (el.classList.contains('delete')) {
				el.parentNode.parentNode.remove()
			}
		}

		static clearFields() {
			document.querySelector('#title').value = ''; 
			document.querySelector('#author').value = ''; 
			document.querySelector('#isbn').value = ''; 
		} 

		static showAlert(message, className, icon) {
			let div = document.createElement('div')
			div.className = `alert alert-${className}`
			div.innerHTML = `<i class="fas ${icon} pr-2"></i>`
			let messageNode = document.createTextNode(message)
			div.appendChild(messageNode)
			let container = document.querySelector('.container')
			let formContainer = document.querySelector('#book-form')
			container.insertBefore(div, formContainer);
			// Make alert disappear after 2 seconds
			setTimeout(() => document.querySelector('.alert').remove(), 2000)
		}
	}

// Class: Handle Storage
class Store {
	static getBooks(){
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}

		return books;
	}

	static addBook(book) {
		let bookItem = Store.getBooks();
		bookItem.push(book);
		localStorage.setItem('books', JSON.stringify(bookItem));
	}

	static removeBook(isbn) {
		let bookItem = Store.getBooks();
		bookItem.forEach((book, index) => {
			if (book.isbn === isbn) {
				bookItem.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(bookItem));
	}

}

// Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Prevent default
	e.preventDefault();
	//Get Form Values
	let title = document.getElementById('title').value
	let author = document.getElementById('author').value
	let isbn = document.getElementById('isbn').value

// Validate
if (title === '' || author === '' || isbn === '') {
	UI.showAlert('Please fill all the fields', 'danger', 'fa-exclamation-triangle' )
} else {
	// Instantiate the book class
	let book = new Book(title, author, isbn) 

	// And then add the book to the list
	UI.addBookToList(book)

	// Add Book to Store
	Store.addBook(book)

	// Show success message when 'Add Book' is clicked
	UI.showAlert('Book Added', 'success', 'fa-check')

	// Clear the input fields after clicking 'Add Book'
	UI.clearFields()
	}
})

// Event: Remove Book
document.querySelector('#book-list').addEventListener('click', (e) =>{
	// Remove book from UI
	UI.deleteBook(e.target)

	// Remove book from Store
	Store.removeBook(e.target.parentNode.previousElementSibling.textContent)

	// Show error message when a book is removed from the list
	UI.showAlert('Book Removed', 'success', 'fa-check')
})

let checkbox = document.getElementById('checkbox');

