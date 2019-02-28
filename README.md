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


Color palette currently used:

#251605
  RGB(37, 22, 5)
#F6E27F
  RGB(246, 226, 127)
#E2C391
  RGB(226, 195, 145)
#A8B7AB
  RGB(168, 183, 171)
#9BBEC7
  RGB(155, 190, 199)
