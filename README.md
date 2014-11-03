A simple personal bookmarking system. PHP back-end with (eventually) chrome extension and smooth and simple front-end.

##Installation
Since this is a personal bookmarking system, there is no user management currently. Put the back-end folder on your own server with PHP/MySQL installed... [more coming]

##Immediate Goals
- [half done] Show exactly what background requests are running, and prompt user when leaving while requests are still running
- Deletion and addition of categories
- Reordering of lists
- Shift to select multiple items
- Chrome extension
	+ Make popup shortcut Shift+qq
- Data import from Kippt
- Provide good feedback + error messages on AJAX and prompt refresh on error
- Fix: the front-end events fail when the extension is enabled

##Future Goals
- [done] I'm thinking that I should redo the front-end to have a complete copy of all bookmarks, and do all changes locally. Then the changes can be pushed to the server in the background without impeding performance (i.e. switching categories will not depend on another API request). This is probably similar to what Google Docs does (very responsive UI).
- Add an easy way to import bookmarks from other services (via copy paste of XML/JSON)
- Tempted to remove search in favor of user going to 'All' section and using ctrl-f

Notes
- All = -2, Queue category = -1, General category = 0
- Doing a dynamic sorting with both manual sorting and sorting by date may be very difficult. Perhaps the simplest way is to make everything manual, and on insert, set the next to the root, etc.
- Use PDO