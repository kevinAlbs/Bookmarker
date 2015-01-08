A minimal bookmarking system. PHP back-end with [chrome extension](https://chrome.google.com/webstore/detail/simple-bookmarker/epecificbpajmadjnlglfhdhccdeceha) and [simple interface](http://kevinalbs.com/bookmarks/front-end/).

Pages can be saved quickly with keyboard shortcuts. Saved bookmarks are initially put in a <i>Queue</i> category. The intended workflow is for the user to save articles/pages he/she finds interesting but does not have time to read at the moment. This way, the user can review the <i>Queue</i> at the end of the day/week when he/she has more free time. Afterwards, bookmarks can be archived in other categories or deleted.

If you'd like to try it, download the [chrome extension](https://chrome.google.com/webstore/detail/simple-bookmarker/epecificbpajmadjnlglfhdhccdeceha) and [create an account](http://kevinalbs.com/bookmarks/front-end/).

##Setting up your own Service
The main purpose of this bookmarker is to make it as painless as possible to host your own bookmarking service. This way you get complete ownership of your own bookmark data and the benefit of synchronizing through all instances of Google Chrome (via the extension). There are three main parts to the current architecture:

![Architecture diagram](/extension/img/diagram.png?raw=true)

In addition, the main interface to review and modify bookmarks is it's own website located alongside the back-end service. So you can access this from any computer. Finally, the back-end service has a simple API which can be easily extended or used (e.g. potential to make an easy mobile app).

[more info coming soon]

##Authentication
[coming soon]

##Upcoming features/fixes
- Easy installer and instructions
- Popup ping + drawer ping (to let user know if cannot reach server before attempting to bookmark)
- Ability to edit notes and titles
- Bookmark importing from other services (via copy paste and file upload)
- Front-end cache bug fixes
- Possible search feature (or just use ctrl+f on All page)
- Reordering of categories and bookmarks
- Manual bookmarking on front-end
- In-page refresh button on front-end
- Unit tests
- Add trash
- Add pagination if performance noticably suffers past a certain amount of bookmarks
- Custom keyboard shortcuts


###Notes
- All = -2, Queue category = -1, General category = 0
- Default user has ID 0.
- Doing a dynamic sorting with both manual sorting and sorting by date may be very difficult. Perhaps the simplest way is to make everything manual, and on insert, set the next to the root, etc.
- Use PDO
