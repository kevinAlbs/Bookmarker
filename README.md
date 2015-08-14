A minimal bookmarking system which can be easily set up on an "AMP" server. Consists of a simple API with [chrome extension](https://chrome.google.com/webstore/detail/simple-bookmarker/epecificbpajmadjnlglfhdhccdeceha) and [front-end interface](http://kevinalbs.com/bookmarks/front-end/).

Pages can be saved quickly with keyboard shortcuts. Saved bookmarks are initially put in a <i>Queue</i> category. The intended workflow is for the user to save articles/pages he/she finds interesting and review the <i>Queue</i> at the end of the day/week when he/she has more free time. Afterwards, bookmarks can be archived in other categories or deleted.

If you'd like to try it, download the [chrome extension](https://chrome.google.com/webstore/detail/simple-bookmarker/epecificbpajmadjnlglfhdhccdeceha) and [create an account](http://kevinalbs.com/bookmarks/front-end/).

##Setting up your own Service
The main purpose of this bookmarker is to make it as painless as possible to host your own bookmarking service. This way you get complete ownership of your own bookmark data and the benefit of synchronizing through all instances of Google Chrome (via the extension). There are three main parts to the current architecture:

![Architecture diagram](/extension/img/diagram.png?raw=true)

In addition, the main interface to review and modify bookmarks is it's own website located alongside the back-end service. So you can access this from any computer. Finally, the back-end service has a simple API which can be easily extended or used (e.g. by a mobile app).

[more info coming soon]

##Authentication
[coming soon]

##Cache
For responsiveness, the front-end interface uses a local cache, initially fully populated by all saved bookmarks. When working in the front-end interface (e.g. switch categories, add/edit/delete bookmarks, rename a category) it asynchronously updates the database in the background and updates the local cache. This has the benefit of added responsiveness on the interface. However, there is also the danger that the cache may not accurately represent the actual state of your bookmarks. If a bookmark is added outside of the front-end interface (e.g. via the chrome extension), the front-end interface is not notified, and it will not appear unless you refresh the page. This isn't a big issue (only need to refresh the page) but will be fixed by having a websocket notify the front-end when any back-end data changes.

##Upcoming features/fixes
In order of priority

- Have the setup (registration link) contained in the popup
	+ Restyle the popup to hide other links during login
	+ The installation page should only show a welcome message and brief instructions for setting up your own server
- Easy installer and instructions
  + Wordpress uses regular expressions to modify the sample config file on installation
- Check if keyboard shortcut is actually working (Cmd+Shift+S doesn't work on Mac by default)
- Mobile friendly
- Change DATETIME to TIMESTAMP in database
- Custom keyboard shortcuts
- Unit tests for API and front-end
- Add trash
- Search bar
- Reordering of categories and bookmarks
- Add pagination (for very large amounts of bookmarks)
- Add a splash page with gif on usage
- Add sticky status text on UI
- Place default server on subdomain (bookmarks.kevinalbs.com)
- Comment every function
- Let import create categories, use file upload, and export. Put on separate page.

###Notes
- All = -2, Queue category = -1, General category = 0
- Default user has ID 0.
- Doing a dynamic sorting with both manual sorting and sorting by date may be very difficult. Perhaps the simplest way is to make everything manual, and on insert, set the next to the root, etc.
- Change the name of "model" to proxy, as it proxy's the API
- Checking if a page is bookmarked while browsing could potentially bog down load time, so it may not be a good idea
- Swap out the current jQuery.loadTemplate library for a library which just returns the element (i.e. John Resig's simple template library)
