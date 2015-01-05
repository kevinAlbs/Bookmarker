A minimal bookmarking system. PHP back-end with chrome extension and simple interface.

##Installation
[coming soon]


##Upcoming features/fixes
- Bookmark importing from other services (via copy paste and file upload)
- Possible search feature (or just use ctrl+f on All page)
- Check if page is already bookmarked when drawer pops out
- Ability to edit notes and titles
- Reordering of categories and bookmarks
- Easy installer
- Manual bookmarking on front-end
- In-page refresh button on front-end

##Before putting in chrome store
- Add usage info page (shortcuts, installation, etc.) and easy way to get to front-end page!
- Add captcha
- Make icon
- Add https
- Keyboard shortcuts!

###Notes
- All = -2, Queue category = -1, General category = 0
- Default user has ID 0.
- Doing a dynamic sorting with both manual sorting and sorting by date may be very difficult. Perhaps the simplest way is to make everything manual, and on insert, set the next to the root, etc.
- Use PDO
