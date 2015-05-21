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

##Upcoming features/fixes
In order of priority

- Front-end cache bug to address category deletion bugs
- Easy installer and instructions
- Replace HTML injection with the Chrome extension popup to save on page load time and ensure functioning on irregular pages (e.g. pages using frameset).
- Check if page is already bookmarked and update icon (fill in transparent area with red)
- Custom keyboard shortcuts
- Search bar
- Reordering of categories and bookmarks
- Unit tests
- Add trash
- Add pagination (for very large amounts of bookmarks)
- Add a splash page with gif on usage
- Add sticky status text on UI
- Add function to export bookmarks, let import use file uploads
- Place default server on subdomain (bookmarks.kevinalbs.com)


###Notes
- All = -2, Queue category = -1, General category = 0
- Default user has ID 0.
- Doing a dynamic sorting with both manual sorting and sorting by date may be very difficult. Perhaps the simplest way is to make everything manual, and on insert, set the next to the root, etc.
- Change the name of "model" to proxy, as it proxy's the API
