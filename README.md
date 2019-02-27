# note-taking-express
simple note taking app made with node and express

Current database schema is:

'notes' table:
{
  id SERIAL PRIMARY KEY,
  content TEXT,
  time_posted DATETIME,
  display_order SERIAL UNIQUE,
  title TEXT,
}

planning to add:

time_last_modified DATETIME,
archived BIT NOT NULL,
trash BIT NOT NULL
