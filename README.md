# note-taking-express
Simple note taking app made with node and express. I've tried to use very few external libraries for this one.
Attempting to follow the Airbnb style guide (https://github.com/airbnb/javascript) where possible

Current database schema is:

'notes' table:
{
  id SERIAL PRIMARY KEY,
  content TEXT,
  time_posted DATETIME,
  title TEXT,
  archived BOOLEAN
}

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
