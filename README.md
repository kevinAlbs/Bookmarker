A simple personal bookmarking system. PHP back-end with (eventually) chrome extension and smooth and simple front-end.

##Installation
Since this is a personal bookmarking system, there is no user management currently. Put the back-end folder on your own server with PHP/MySQL installed... [more coming]


##Upcoming features/fixes
- Add an easy way to import bookmarks from other services (via copy paste of XML/JSON)
- Tempted to remove search in favor of user going to 'All' section and using ctrl-f
- Add check if page is already bookmarked
- Add ability to edit notes and titles
- Reordering of categories and bookmarks
- Add easy installer
- Add manual bookmarking on front-end

##Before putting in chrome store
- Add usage info page (shortcuts, installation, etc.) and easy way to get to front-end page!
- Add captcha
- Make icon
- Add chrome button
- Add https
- Keyboard shortcuts!

###Notes
- All = -2, Queue category = -1, General category = 0
- Default user has ID 0.
- Doing a dynamic sorting with both manual sorting and sorting by date may be very difficult. Perhaps the simplest way is to make everything manual, and on insert, set the next to the root, etc.
- Use PDO
