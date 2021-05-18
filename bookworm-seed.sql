-- both test users have the password "password"

INSERT INTO users (username, password, firstname, lastname, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com'),

       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com');

INSERT INTO books (title, authors, description, personalreview, category, thumbnail, username)
VALUES ('The Mortal Instruments', 'Cassandra Claire', 'A book about clary', 'One of my favorite series',
        'Favorites', 'http://books.google.com/books/content?id=MUo8DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'testuser'),
        ('Chain of Gold', 'Cassandra Claire', 'A book about cordelia', 'One of my favorite series',
        'Favorites', 'http://books.google.com/books/content?id=0zV-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'testuser')
      