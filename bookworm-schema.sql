
CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT,
  description TEXT,
  personalreview TEXT,
  category TEXT,
  thumbnail TEXT,
  username VARCHAR(25) NOT NULL 
    REFERENCES users ON DELETE CASCADE
);


-- CREATE TABLE jobs (
--   id SERIAL PRIMARY KEY,
--   title TEXT NOT NULL,
--   salary INTEGER CHECK (salary >= 0),
--   equity NUMERIC CHECK (equity <= 1.0),
--   company_handle VARCHAR(25) NOT NULL
--     REFERENCES companies ON DELETE CASCADE
-- );

-- CREATE TABLE applications (
--   username VARCHAR(25)
--     REFERENCES users ON DELETE CASCADE,
--   job_id INTEGER
--     REFERENCES jobs ON DELETE CASCADE,
--   PRIMARY KEY (username, job_id)
-- );

-- CREATE TABLE companies (
--   handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
--   name TEXT UNIQUE NOT NULL,
--   num_employees INTEGER CHECK (num_employees >= 0),
--   description TEXT NOT NULL,
--   logo_url TEXT
-- );

\i bookworm-seed.sql
