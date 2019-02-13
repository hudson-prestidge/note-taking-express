# note-taking-express
simple note taking app made with node and express

Current database schema is:

'notes' table:
{
  id SERIAL PRIMARY KEY,
  content STRING,
  time_posted DATETIME,
  display_order SERIAL UNIQUE
}
