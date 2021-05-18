'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const partialUpdate = require('../helpers/sql');

/** Related functions for companies. */

class Book {
	/** Create a book (from data), update db, return new book data.
   *
   * data should be { title, authors, description, personalreview, category, thumbnail, username }
   *
   * Returns { title, authors, description, personalreview, category, thumbnail, username }
   *
   * Throws BadRequestError if book already in database.
   * */

	static async create({ title, authors, description, personalreview, category, thumbnail, username }) {
		const duplicateCheck = await db.query(
			`SELECT title, username
           FROM books
           WHERE title = $1 AND username LIKE '${username}';`,
			[ title ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate book: ${title}`);

		const result = await db.query(
			`INSERT INTO books
           (title, authors, description, personalreview, category, thumbnail, username)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING title, authors, description, personalreview, category, thumbnail, username`,
			[ title, authors, description, personalreview, category, thumbnail, username ]
		);
		const book = result.rows[0];

		return book;
	}

	/** Find all books (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - title
   * - author
   * -category
   * -(will find case-insensitive, partial matches)
   *
   * Returns [{ title, authors, description, personalReview, category, thumbnail, username }, ...]
   * */

	static async findAll(searchFilters = {}) {
		let query = `SELECT b.title,
    b.authors,
    b.description,
    b.personalreview,
    b.category,
    b.thumbnail,
    b.username
                 FROM books b
                  LEFT JOIN users AS u ON u.username = b.username`;

		let whereExpressions = [];
		let queryValues = [];

		//add author search
		const { category, title } = searchFilters;

		// For each possible search term, add to whereExpressions and queryValues so
		// we can generate the right SQL

		if (title) {
			queryValues.push(`%${title}%`);
			whereExpressions.push(`title ILIKE $${queryValues.length}`);
		}
		if (category) {
			queryValues.push(`%${category}%`);
			whereExpressions.push(`category ILIKE $${queryValues.length}`);
		}

		//add author search
		// Finalize query and return results

		const booksRes = await db.query(query, queryValues);
		return booksRes.rows;
	}

	static async findUserBooks(user) {
		let query = `SELECT * FROM books WHERE username LIKE '${user}';`;
		const booksRes = await db.query(query);
		return booksRes.rows;
	}

	static async findUserCategoryBooks(user, category) {
		let query = `SELECT * FROM books WHERE username LIKE '${user}' AND category ILIKE '${category}';`;
		const booksRes = await db.query(query);
		return booksRes.rows;
	}

	static async update(id, data) {
		const { setCols, values } = partialUpdate(data, {});
		const idVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE books 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, title, authors, description, personalreview, category, thumbnail, username;`;
		const result = await db.query(querySql, [ ...values, id ]);
		const book = result.rows[0];

		if (!book) throw new NotFoundError(`No book: ${id}`);

		return book;
	}

	//may need to do this off of ID#
	static async remove(id) {
		const result = await db.query(
			`DELETE
           FROM books
           WHERE id = $1
           RETURNING title`,
			[ id ]
		);
		const book = result.rows[0];

		if (!book) throw new NotFoundError(`No book: ${id}`);
	}
}

module.exports = Book;
