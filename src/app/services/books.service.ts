import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { PreBook } from '../models/bookForm';

const testingBooks: Book[] = [
  {
    id: 1,
    title: 'Dune',
    description:
      "Dune is a 1965 epic science fiction novel by American author Frank Herbert, originally published as two separate serials in Analog magazine. It tied with Roger Zelazny's This Immortal for the Hugo Award in 1966 and it won the inaugural Nebula Award for Best Novel. It is the first installment of the Dune saga.",
    author: 'Frank Herbert',
    quote:
      "The mystery of life isn't a problem to solve, but a reality to experience.",
    publicationDate: 'August 1965',
    pageCount: 500,
    rating: 4.93,
    coverUrl: 'https://m.media-amazon.com/images/I/513hKKmFzDL._AC_SY1000_.jpg',
    comments: [],
  },
  {
    id: 2,
    title: 'Nineteen Eighty-Four',
    description:
      "Nineteen Eighty-Four is a dystopian social science fiction novel and cautionary tale written by the English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
    author: 'George Orwell',
    quote:
      'Who controls the past controls the future. Who controls the present controls the past.',
    publicationDate: 'June 8, 1949',
    pageCount: 127,
    rating: 4.7,
    coverUrl:
      'https://emp-scs-uat.img-osdw.pl/img-p/1/kipwn/d576082e/std/2bc-452/951486472o.jpg',
    comments: [
      {
        author: 'Denys Lazorchyk',
        message: 'Ther very best novel I have ever read.',
        publicationDate: 'May 27, 2022',
        rating: 5.0,
      },
    ],
  },
  {
    id: 3,
    title: 'The Martian',
    description:
      "The Martian is a 2011 science fiction debut novel written by Andy Weir. The book was originally self-published on Weir's blog, in a serialized format. In 2014, the book was re-released after Crown Publishing Group purchased the exclusive publishing rights.",
    author: 'Andy Weir',
    quote:
      "The mystery of life isn't a problem to solve, but a reality to experience.",
    publicationDate: 'August 1965',
    pageCount: 420,
    rating: 4.93,
    coverUrl: 'https://www.bookcity.pl/bigcovers/9/0/2/1/9780804139021.jpg',
    comments: [
      {
        author: 'Random Guy',
        message: 'Nothing could not be better than this book.',
        publicationDate: 'May 27, 2022',
        rating: 3.9,
      },
      {
        author: 'Big dude',
        message:
          'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ipsa inventore architecto, tempora, accusantium non aperiam, fuga cupiditate voluptatibus odio eveniet accusamus sequi quis eligendi nam vitae earum fugiat sed.',
        publicationDate: '2020',
        rating: 3.0,
      },
    ],
  },
  {
    id: 4,
    title: 'The Lord of the Rings',
    description:
      'The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien’s extensive knowledge of philology and folklore. At 33, the age of adulthood among hobbits, Frodo Baggins receives a magic Ring of Invisibility from his uncle Bilbo. Frodo, a Christlike figure, learns that the ring has the power to control the entire world and, he discovers, to corrupt its owner. A fellowship of hobbits, elves, dwarfs, and men is formed to destroy the ring by casting it into the volcanic fires of the Crack of Doom, where it was forged. They are opposed on their harrowing mission by the evil Sauron and his Black Riders.',
    author: 'J.R.R. TOLKIEN',
    quote: 'All’s well that ends better.',
    publicationDate: 'July 29, 1954',
    pageCount: 800,
    rating: 5.0,
    coverUrl:
      'https://www.norli.no/media/catalog/product/cache/c4a11e66ee9433953f551e1adfcb16b9/9/7/9780261103252_1.jpg',
    comments: [],
  },
  {
    id: 5,
    title: 'The Colour of Magic',
    description:
      'The Colour of Magic is a collection of four stories set on Discworld, a flat planet that is carried by four huge elephants that stand on the back of the giant turtle Great A’Tuin. The stories pivot on the hapless failed wizard Rincewind. In the first adventure, Rincewind is required to act as guide and protector to Twoflower, a wealthy insurance salesman from the Counterweight Continent who has come as the first-ever tourist to Ankh-Morpork, Discworld’s biggest city. Twoflower’s wealth attracts thieves and assassins, but Rincewind and Twoflower’s Luggage—an overprotective traveling trunk with legs, teeth, and the ability to locate its master anywhere—keep him from harm. Meanwhile, Twoflower sells fire insurance to the owner of the Broken Drum tavern, and the owner then sets the tavern on fire. The conflagration consumes the city, but Rincewind and Twoflower escape.',
    author: 'Terry Pratchett',
    quote:
      'It was octarine, the colour of magic. It was alive and glowing and vibrant and it was the undisputed pigment of the imagination, because wherever it appeared it was a sign that mere matter was a servant of the powers of the magical mind. It was enchantment itself. But Rincewind always thought it looked a sort of greenish-purple.',
    publicationDate: 'November 24, 1983',
    pageCount: 213,
    rating: 4.62,
    coverUrl:
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1665087276i/601238.jpg',
    comments: [],
  },
  {
    id: 6,
    title: "The Hitchhiker's Guide to the Galaxy",
    description:
      "The novel is an adaptation of the first four parts of Adams's radio series of the same name, centering on the adventures of the only man to survive the destruction of Earth; while roaming outer space, he comes to learn the truth behind Earth's existence. The novel was first published in London on 12 October 1979.",
    author: 'Douglas Adams',
    quote: "Don't Panic.",
    publicationDate: '12 October 1979',
    pageCount: 190,
    rating: 4.76,
    coverUrl: 'https://m.media-amazon.com/images/I/51in2RmPhBS._AC_SY1000_.jpg',
    comments: [],
  },
];

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor() {}

  getBooks() {
    return [...testingBooks];
  }

  getBook(id: number) {
    const index = testingBooks.findIndex((book) => book.id === id);
    return index > -1 ? testingBooks[index] : undefined;
  }

  updateBook(id: number, book: Book) {
    console.log(book);
    console.log(id);

    if (id >= 0) {
      let index = testingBooks.findIndex((book) => book.id === id);
      console.log(index);

      console.log(testingBooks[index]);
      testingBooks[index] = book;
      console.log(testingBooks[index]);
    }
  }

  deleteBook(id: number) {
    let index = testingBooks.findIndex((book) => {
      book.id === id;
    });

    testingBooks.splice(index, 1);
  }

  addBook(book: PreBook) {
    let biggest = 0;
    testingBooks.map((el) => {
      if (el.id > biggest) biggest = el.id;
    });
    testingBooks.push({
      id: biggest + 1,
      ...book,
    });
  }
}
