A minimal bookmarking system. PHP back-end with chrome extension and simple interface.

##Getting started
[coming soon]

##Setting up your own Service
The main purpose of this bookmarker is to make it as painless as possible to host your own bookmarking service. This way you get complete ownership of your own bookmark data and the benefit of synchronizing through all instances of Google Chrome (via the extension). There are three main parts to the current architecture:

![Architecture diagram](/extension/img/diagram.png?raw=true)

In addition, the main interface to review and modify bookmarks is it's own website located alongside the back-end service. So you can access this from any computer. Finally, the back-end service has a simple API which can be easily extended or used (e.g. potential to make an easy mobile app).


##Upcoming features/fixes
- Bookmark importing from other services (via copy paste and file upload)
- Possible search feature (or just use ctrl+f on All page)
- Check if page is already bookmarked when drawer pops out
- Ability to edit notes and titles
- Reordering of categories and bookmarks
- Easy installer
- Manual bookmarking on front-end
- In-page refresh button on front-end
- Unit tests
- Add trash
- Add pagination if performance noticably suffers past a certain amount of bookmarks
- Front-end cache bug fixes

##Before putting in chrome store
- Add Getting Started (basic + advanced) and hide server url in advanced options
- Add https

###Notes
- All = -2, Queue category = -1, General category = 0
- Default user has ID 0.
- Doing a dynamic sorting with both manual sorting and sorting by date may be very difficult. Perhaps the simplest way is to make everything manual, and on insert, set the next to the root, etc.
- Use PDO
