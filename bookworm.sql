\echo 'Delete and recreate bookworm db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE bookapp;
CREATE DATABASE bookapp;
\connect bookapp

\i bookworm-schema.sql
-- \i bookworm-seed.sql


