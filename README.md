A simple personal bookmarking system. PHP back-end with (eventually) chrome extension and smooth and simple front-end.

I'm thinking that I should redo the front-end to have a complete copy of all bookmarks, and do all changes locally. Then the changes can be pushed to the server in the background without impeding performance (i.e. switching categories will not depend on another API request). This is probably similar to what Google Docs does (very responsive UI).

Notes
- All = -2, Queue category = -1, General category = 0
- Doing a dynamic sorting with both manual sorting and sorting by date may be very difficult. Perhaps the simplest way is to make everything manual, and on insert, set the next to the root, etc.
- Use PDO