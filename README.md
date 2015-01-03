A simple personal bookmarking system. PHP back-end with (eventually) chrome extension and smooth and simple front-end.

##Installation
Since this is a personal bookmarking system, there is no user management currently. Put the back-end folder on your own server with PHP/MySQL installed... [more coming]

##Immediate Goals
- I would like the default to store things locally and use chromes internal synchronization (i.e. storage.sync). However, updating this would result in total rewrite of all bookmarks on any change, which can be expensive. I would like to use IndexedDB, but this is not synchronized. Alternatively, I can have the external PHP API as the default, and use the person's email as the default username (and no password), but this is highly insecure, and I'd rather have this as an explicit 'opt-in' option.

I think a compromise is to use the synchronized local storage for now.

- Reordering of lists and bookmarks
- Provide good feedback + error messages on AJAX and prompt refresh on error

##Future Goals
- Add an easy way to import bookmarks from other services (via copy paste of XML/JSON)
- Tempted to remove search in favor of user going to 'All' section and using ctrl-f
- Add manual bookmarking on front-end
- Add authentication settings page for extension

Notes
- All = -2, Queue category = -1, General category = 0
- Default user has ID 0.
- Doing a dynamic sorting with both manual sorting and sorting by date may be very difficult. Perhaps the simplest way is to make everything manual, and on insert, set the next to the root, etc.
- Use PDO
