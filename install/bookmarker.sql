-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 04, 2015 at 03:44 AM
-- Server version: 5.5.25a
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bookmarker`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmark`
--

CREATE TABLE IF NOT EXISTS `bookmark` (
  `url` varchar(2083) NOT NULL,
  `title` varchar(512) DEFAULT NULL,
  `notes` varchar(1024) NOT NULL,
  `category` int(64) NOT NULL DEFAULT '-1',
  `date_added` datetime NOT NULL,
  `next` int(11) NOT NULL DEFAULT '-1',
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=511 ;

--
-- Dumping data for table `bookmark`
--

INSERT INTO `bookmark` (`url`, `title`, `notes`, `category`, `date_added`, `next`, `id`, `user_id`) VALUES
('http://www.html5rocks.com/en/tutorials/eventsource/basics/', 'Stream Updates with Server-Sent Events - HTML5 Rocks', '', 5, '2014-07-15 23:48:47', -1, 284, 0),
('http://hammerjs.github.io/', 'Hammer.js', '', 15, '2014-07-15 23:48:48', -1, 285, 0),
('http://css-tricks.com/snippets/css/a-guide-to-flexbox/', 'A Complete Guide to Flexbox | CSS-Tricks', '', -1, '2014-07-15 23:48:49', -1, 286, 0),
('http://it.wikipedia.org/wiki/Bejelit', 'Bejelit - Wikipedia', '', -1, '2014-07-15 23:48:50', -1, 287, 0),
('http://animagraffs.com/', 'Animagraffs - Animated infographics by Jacob O''Neal', '', -1, '2014-07-15 23:48:51', -1, 288, 0),
('http://handlebarsjs.com/', 'Handlebars.js: Minimal Templating on Steroids', '', 15, '2014-07-15 23:48:53', -1, 289, 0),
('http://www.2ality.com/2012/10/javascript-properties.html', 'Object properties in JavaScript', '', -1, '2014-07-15 23:48:54', -1, 290, 0),
('http://www.2ality.com/', 'â‘¡ality â€“ JavaScript and more', '', -1, '2014-07-15 23:48:55', -1, 291, 0),
('http://speakingjs.com/es5/index.html', 'Speaking JavaScript', '', -1, '2014-07-15 23:48:56', -1, 292, 0),
('https://cloud.google.com/developers/articles/real-time-gaming-with-node-js-websocket-on-gcp', 'Gaming Articles &amp; Gaming Tutorials â€” Google Cloud Platform', '', -1, '2014-07-15 23:48:57', -1, 293, 0),
('http://zaach.github.io/jison/docs/', 'Jison / Documentation', '', -1, '2014-07-15 23:48:58', -1, 294, 0),
('http://www.phpfreaks.com/blog/or-die-must-die', 'PHP Freaks - PHP Help or die() must die', '', -1, '2014-07-15 23:48:59', -1, 295, 0),
('http://www.visiondummy.com/', 'Computer vision for dummies - A blog about intelligent algorithms, machine learning, computer vision, datamining and more.', '', -1, '2014-07-15 23:49:00', -1, 296, 0),
('http://phonegap.com/', 'PhoneGap | Home', '', -1, '2014-07-15 23:49:01', -1, 297, 0),
('https://www.iforce2d.net/rube/', 'R.U.B.E Box2D editor - iforce2d', '', -1, '2014-07-15 23:49:02', -1, 298, 0),
('http://www.cavestory.org/pixels-works/pxtone-collage.php', 'Cave Story (Doukutsu Monogatari), A Tribute Site', '', -1, '2014-07-15 23:49:03', -1, 299, 0),
('http://gameprogrammingpatterns.com/introduction.html', 'Introduction Â· Game Programming Patterns', '', -1, '2014-07-15 23:49:04', -1, 300, 0),
('http://gamemechanicexplorer.com/#', 'Game Mechanic Explorer', '', -1, '2014-07-15 23:49:05', -1, 301, 0),
('http://kenney.nl/assets', 'Kenney.nl â€¢ Mobile &amp; casual game development and distribution', '', -1, '2014-07-15 23:49:07', -1, 302, 0),
('http://www.photoshoptutorials.ws/photoshop-tutorials/photo-manipulation/create-dark-abstract-crow-photo-manipulation/', 'Create A Dark Abstract Crow Photo Manipulation | Photoshop Tutorials', '', -1, '2014-07-15 23:49:08', -1, 303, 0),
('http://pyxeledit.com/about.php', 'Pyxel Edit: pixel art and tileset creation tool', '', -1, '2014-07-15 23:49:09', -1, 304, 0),
('http://www.melissaevans.com/tutorials/colouring-line-art', 'Colouring Line Art Photoshop Tutorial :: Melissa Evans', '', -1, '2014-07-15 23:49:10', -1, 305, 0),
('http://gamedevelopment.tutsplus.com/tutorials/make-a-neon-vector-shooter-in-jmonkeyengine-the-basics--gamedev-11616', 'Make a Neon Vector Shooter in jMonkeyEngine: The Basics - Tuts+ Game Development Tutorial', '', -1, '2014-07-15 23:49:11', -1, 306, 0),
('http://higherorderfun.com/blog/2012/05/20/the-guide-to-implementing-2d-platformers/', 'The guide to implementing 2D platformers | Higher-Order Fun', '', -1, '2014-07-15 23:49:12', -1, 307, 0),
('https://www.tropo.com/', 'Tropo - Cloud API for Voice and SMS', '', -1, '2014-07-15 23:49:13', -1, 308, 0),
('http://pybrain.org/docs/', 'Welcome to PyBrainâ€™s documentation! â€” PyBrain v0.3 documentation', '', -1, '2014-07-15 23:49:14', -1, 309, 0),
('http://en.wikipedia.org/wiki/Collaborative_information_seeking#Coagmento_Collaboratory', 'Collaborative information seeking - Wikipedia, the free encyclopedia', '', -1, '2014-07-15 23:49:15', -1, 310, 0),
('http://people.whitman.edu/~hundledr/courses/M225S09/GradOrth.pdf', 'people.whitman.edu/~hundledr/courses/M225S09/GradOrth.pdf', '', -1, '2014-07-15 23:49:16', -1, 311, 0),
('http://wayofthepixel.net/index.php?PHPSESSID=ho5qc2323s2nggd9ie44d34v80&topic=9977.msg107936#msg107936', 'Dithering on Photoshop Question', '', -1, '2014-07-15 23:49:18', -1, 312, 0),
('http://www.pixeljoint.com/pixelart/12004.htm#', 'Forest Level Icon, Pixel Art, Buddy Icons, Forum Avatars', '', -1, '2014-07-15 23:49:19', -1, 313, 0),
('http://www.earslap.com/projectslab/otomata', 'Earslap.com: Otomata - Online Generative Musical Sequencer', '', -1, '2014-07-15 23:49:20', -1, 314, 0),
('http://soundbible.com/royalty-free-sounds-3.html', 'Royalty Free Sounds from Creative Commons and Public Domain', '', -1, '2014-07-15 23:49:21', -1, 315, 0),
('http://ocw.mit.edu/courses/mathematics/18-03-differential-equations-spring-2010/video-lectures/', 'Video Lectures | Differential Equations | Mathematics | MIT OpenCourseWare', '', -1, '2014-07-15 23:49:22', -1, 316, 0),
('http://www.maths.tcd.ie/~dwilkins/LaTeXPrimer/', 'Getting Started with LaTeX', '', -1, '2014-07-15 23:49:23', -1, 317, 0),
('http://mintaka.sdsu.edu/GF/bibliog/latex/LaTeXtoPDF.html', 'LaTeX to PDF', '', -1, '2014-07-15 23:49:24', -1, 318, 0),
('http://www.youtube.com/watch?v=t4kkzsRJObE', 'â–¶ Tech N9ne - Straight Out The Gate (Feat. Serj Tankian) - Official Music Video - YouTube', '', -1, '2014-07-15 23:49:25', -1, 319, 0),
('https://www.udacity.com/course/cs255', 'Learn HTML5 - Game Development Course Online - Udacity', '', -1, '2014-07-15 23:49:26', -1, 320, 0),
('http://www.coursebuffet.com/', 'Find and compare free online courses from Coursera, Udacity, edX and more', '', -1, '2014-07-15 23:49:27', -1, 321, 0),
('https://hacks.mozilla.org/2013/09/getting-started-with-html5-game-development/', 'Getting Started With HTML5 Game Development âœ© Mozilla Hacks â€“ the Web developer blog', '', -1, '2014-07-15 23:49:28', -1, 322, 0),
('http://www.html5rocks.com/en/tutorials/canvas/performance/', 'Improving HTML5 Canvas Performance - HTML5 Rocks', '', -1, '2014-07-15 23:49:30', -1, 323, 0),
('http://alex.smola.org/teaching/cmu2013-10-701x/index.html', 'Introduction to Machine Learning', '', -1, '2014-07-15 23:49:31', -1, 324, 0),
('http://www.statlect.com/', 'Statlect, the digital textbook', '', -1, '2014-07-15 23:49:32', -1, 325, 0),
('http://www.youtube.com/watch?v=WZiSx0J3fCI', 'â–¶ QualityTime2.avi : A Cinematic Analysis - YouTube', '', -1, '2014-07-15 23:49:33', -1, 326, 0),
('http://www.youtube.com/watch?v=UmPmpUTr22c&list=RD02P4vpBw3pf58', 'Disney''s "Lion King" - in 3D! - YouTube', '', -1, '2014-07-15 23:49:34', -1, 327, 0),
('http://stats.stackexchange.com/questions/47771/what-is-the-intuition-behind-beta-distribution', 'What is the intuition behind beta distribution? - Cross Validated', '', -1, '2014-07-15 23:49:35', -1, 328, 0),
('http://en.wikipedia.org/wiki/Cauchy_formula_for_repeated_integration', 'Cauchy formula for repeated integration - Wikipedia, the free encyclopedia', '', -1, '2014-07-15 23:49:36', -1, 329, 0),
('http://bigosaur.com/blog/23days', 'Bigosaur GameDev Blog', '', -1, '2014-07-15 23:49:37', -1, 330, 0),
('http://www.koffeinhaltig.com/fds/normalformen.php', 'Determining the schema''s normalform', '', -1, '2014-07-15 23:49:38', -1, 331, 0),
('http://mathgifs.blogspot.co.uk/', 'MathGifs', '', -1, '2014-07-15 23:49:40', -1, 332, 0),
('http://apigen.org/##features', 'ApiGen | API documentation generator for PHP 5.3+', '', -1, '2014-07-15 23:49:41', -1, 333, 0),
('http://mpec.sc.mahidol.ac.th/radok/physmath/mat12/start.htm', 'PROBLEMS IN MATHEMATICAL ANALYSIS', '', -1, '2014-07-15 23:49:42', -1, 334, 0),
('http://onsugarmountain.com/2012/09/27/deep-dish-microwave-chocolate-chip-cookie/', 'Deep Dish Microwave Chocolate Chip Cookie | On Sugar Mountain', '', -1, '2014-07-15 23:49:43', -1, 335, 0),
('http://toast.djw.org.uk/tarpipe.html', 'Netcat Tar Pipe', '', -1, '2014-07-15 23:49:44', -1, 336, 0),
('http://www.surgeonsimulator2013.com/', 'Surgeon Simulator 2013 | The darkly humorous over-the-top operation sim game', '', -1, '2014-07-15 23:49:45', -1, 337, 0),
('https://www.google.com/search?q=ken+m&source=lnms&tbm=isch&sa=X&ei=4opAUs3NC_ez4APk74DwCg&ved=0CAkQ_AUoAQ&biw=1600&bih=790&dpr=1', 'ken m - Google Search', '', -1, '2014-07-15 23:49:46', -1, 338, 0),
('http://canvasquery.com/#advanced-usage', 'Canvas Query - Documentation', '', -1, '2014-07-15 23:49:47', -1, 339, 0),
('http://rezoner.net/labs/potatolagoon/', 'Potato Lagoon LD27 48h', '', -1, '2014-07-15 23:49:48', -1, 340, 0),
('http://www.bfxr.net/', 'Bfxr. Make sound effects for your games.', '', -1, '2014-07-15 23:49:49', -1, 341, 0),
('http://www.gradiance.com/selfStudyClasses.html', 'Gradiance', '', -1, '2014-07-15 23:49:51', -1, 342, 0),
('http://nintendoage.com/forum/messageview.cfm?catid=22&threadid=7155', 'NA Â» NES Programming', '', -1, '2014-07-15 23:49:52', -1, 343, 0),
('http://nodeschool.io/', 'nodeschool.io', '', -1, '2014-07-15 23:49:53', -1, 344, 0),
('http://math.hws.edu/javanotes/index.html', 'Javanotes 6.0 -- Title Page', '', -1, '2014-07-15 23:49:54', -1, 345, 0),
('https://yourlogicalfallacyis.com/ad-hominem', 'Your logical fallacy is ad hominem', '', -1, '2014-07-15 23:49:55', -1, 346, 0),
('http://mrelusive.com/books/books.html', '-= Game Development Books =-', '', -1, '2014-07-15 23:49:56', -1, 347, 0),
('http://www.kickstarter.com/projects/556341540/pressy-the-almighty-android-button', 'Pressy - the Almighty Android Button! by Nimrod Back â€” Kickstarter', '', -1, '2014-07-15 23:49:57', -1, 348, 0),
('http://natureofcode.com/book/chapter-10-neural-networks/', 'The Nature of Code', '', -1, '2014-07-15 23:49:58', -1, 349, 0),
('http://useflashpunk.net/', 'FlashPunk: A game creation library for Actionscript 3', '', -1, '2014-07-15 23:49:59', -1, 350, 0),
('http://www.ogmoeditor.com/', 'OGMO EDITOR', '', -1, '2014-07-15 23:50:00', -1, 351, 0),
('http://www.youtube.com/channel/UCX6b17PVsYBQ0ip5gyeme-Q', 'Crash Course! - YouTube', '', -1, '2014-07-15 23:50:01', -1, 352, 0),
('http://www.guitarist.com/classical/beginners/repertoire.htm', 'Repertoire for Classical Guitar Beginners', '', -1, '2014-07-15 23:50:02', -1, 353, 0),
('http://en.wikipedia.org/wiki/Multiclass_classification', 'Multiclass classification - Wikipedia, the free encyclopedia', '', -1, '2014-07-15 23:50:03', -1, 354, 0),
('http://www.thebuzzmedia.com/designing-a-secure-rest-api-without-oauth-authentication/', 'Designing a Secure REST (Web) API without OAuth', '', -1, '2014-07-15 23:50:05', -1, 355, 0),
('http://www.chromatic.io/', 'Chromatic â€“ Instantly create beautiful photo galleries', '', -1, '2014-07-15 23:50:06', -1, 356, 0),
('http://pixelshaders.com/', 'Pixel Shaders: An Interactive Introduction to Graphics Programming', '', -1, '2014-07-15 23:50:08', -1, 358, 0),
('http://vimeo.com/24953046', 'Batsu Games - No Laughing High School on Vimeo', '', -1, '2014-07-15 23:50:09', -1, 359, 0),
('http://www.html5rocks.com/en/tutorials/eventsource/basics/', 'Stream Updates with Server-Sent Events - HTML5 Rocks', '', -1, '2014-07-15 23:50:10', -1, 360, 0),
('http://opengameart.org/', 'OpenGameArt.org', '', -1, '2014-07-15 23:50:11', -1, 361, 0),
('http://gamedev.tutsplus.com/tutorials/implementation/coding-destructible-pixel-terrain/', 'Coding Destructible Pixel Terrain: How to Make Everything Explode | Gamedevtuts+', '', -1, '2014-07-15 23:50:12', -1, 362, 0),
('http://gamedev.tutsplus.com/tutorials/implementation/let-your-players-undo-their-in-game-mistakes-with-the-command-pattern/', 'Using the Command Pattern to Implement Undo | Gamedevtuts+', '', -1, '2014-07-15 23:50:13', -1, 363, 0),
('http://gamedev.tutsplus.com/tutorials/implementation/understanding-steering-behaviors-seek/', 'Understanding Steering Behaviors: Seek | Gamedevtuts+', '', -1, '2014-07-15 23:50:14', -1, 364, 0),
('http://gamedev.tutsplus.com/tutorials/implementation/create-custom-2d-physics-engine-aabb-circle-impulse-resolution/', 'How to Create a Custom 2D Physics Engine: The Basics and Impulse Resolution | Gamedevtuts+', '', -1, '2014-07-15 23:50:15', -1, 365, 0),
('http://gamedev.tutsplus.com/tutorials/implementation/collision-detection-with-the-separating-axis-theorem/', 'Collision Detection Using the Separating Axis Theorem | Gamedevtuts+', '', -1, '2014-07-15 23:50:16', -1, 366, 0),
('http://gamedev.tutsplus.com/tutorials/implementation/simulate-fabric-and-ragdolls-with-simple-verlet-integration/', 'Simulate Tearable Cloth and Ragdolls With Simple Verlet Integration | Gamedevtuts+', '', -1, '2014-07-15 23:50:17', -1, 367, 0),
('http://gamedev.tutsplus.com/tutorials/implementation/make-a-splash-with-2d-water-effects/', 'Make a Splash With Dynamic 2D Water Effects | Gamedevtuts+', '', -1, '2014-07-15 23:50:18', -1, 368, 0),
('http://playerio.com/documentation/tutorials/building-flash-multiplayer-games-tutorial/synchronization', 'Building Flash Multiplayer Games - Synchronization - Player.IO', '', -1, '2014-07-15 23:50:19', -1, 369, 0),
('http://www.oneweirdkerneltrick.com/', 'Find a separating hyperplane with this One Weird Kernel Trick', '', -1, '2014-07-15 23:50:24', -1, 374, 0),
('http://en.wikipedia.org/wiki/Backpropagation', 'Backpropagation - Wikipedia, the free encyclopedia', '', -1, '2014-07-15 23:50:26', -1, 375, 0),
('http://www.codenameone.com/', 'Codename One - Reinventing Mobile Development (mobile app development mobile application development) - Home', '', -1, '2014-07-15 23:50:27', -1, 376, 0),
('https://code.google.com/p/kryonet/', 'kryonet - TCP and UDP client/server library for Java - Google Project Hosting', '', -1, '2014-07-15 23:50:28', -1, 377, 0),
('http://work.caltech.edu/lectures.html', 'Learning From Data MOOC - The Lectures', '', -1, '2014-07-15 23:50:29', -1, 378, 0),
('http://www.youtube.com/watch?v=O37yJBFRrfg', 'The European Union Explained* - YouTube', '', -1, '2014-07-15 23:50:30', -1, 379, 0),
('http://www.google.com/intl/en/jobs/students/tech/internships/uscanada/', 'United States &amp; Canada Technical Internship opportunities - Google Students - Google', '', -1, '2014-07-15 23:50:31', -1, 380, 0),
('http://fortawesome.github.io/Font-Awesome/icons/', 'Font Awesome Icons', '', -1, '2014-07-15 23:50:32', -1, 381, 0),
('http://www.gabrielgambetta.com/?p=11', 'Gabriel Gambetta Â» Fast-paced multiplayer (part I): Introduction', '', -1, '2014-07-15 23:50:33', -1, 382, 0),
('http://practicaltypography.com/', 'Butterickâ€™s Practical Typography', '', -1, '2014-07-15 23:50:34', -1, 383, 0),
('https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking', 'Source Multiplayer Networking - Valve Developer Community', '', -1, '2014-07-15 23:50:35', -1, 384, 0),
('http://reu.dimacs.rutgers.edu/', 'DIMACS REU: Research Experience for Undergraduates', '', -1, '2014-07-15 23:50:36', -1, 385, 0),
('http://nodewar.com/#', 'Nodewar', '', -1, '2014-07-15 23:50:37', -1, 386, 0),
('http://www.thisiscolossal.com/2013/07/the-pixel-painter-a-97-year-old-man-who-paints-using-microsoft-paint-from-windows-95/', 'The Pixel Painter: A 97-Year-Old Man Who Draws Using Microsoft Paint from Windows â€™95 | Colossal', '', -1, '2014-07-15 23:50:38', -1, 387, 0),
('http://www.essentialmath.com/tutorial.htm', 'Essential Math for Games Programmers', '', -1, '2014-07-15 23:50:40', -1, 388, 0),
('http://type.method.ac/#', 'Kern Type, the kerning game', '', -1, '2014-07-15 23:50:41', -1, 389, 0),
('http://orion.lcg.ufrj.br/Dr.Dobbs/books/book5/chap14.htm', 'Information Retrieval: CHAPTER 14: RANKING ALGORITHMS', '', -1, '2014-07-15 23:50:42', -1, 390, 0),
('http://www.wikihow.com/Calculate-Pi-by-Throwing-Frozen-Hot-Dogs', 'How to Calculate Pi by Throwing Frozen Hot Dogs: 8 Steps', '', -1, '2014-07-15 23:50:43', -1, 391, 0),
('http://docs.oracle.com/javase/tutorial/networking/datagrams/definition.html', 'What Is a Datagram? (The Javaâ„¢ Tutorials &gt; Custom Networking &gt; All About Datagrams)', '', -1, '2014-07-15 23:50:44', -1, 392, 0),
('http://science-education.pppl.gov/SULI/Overview.html', 'Summer Undergraduate Laboratory Internship', '', -1, '2014-07-15 23:50:45', -1, 393, 0),
('http://us.fulbrightonline.org/', 'Home Page', '', -1, '2014-07-15 23:50:46', -1, 394, 0),
('http://www.google.com/intl/en/jobs/students/proscho/programs/uscanada/', 'United States &amp; Canada Programs - Google Students - Google', '', -1, '2014-07-15 23:50:47', -1, 395, 0),
('http://www.gatescambridge.org/', 'Gates Cambridge Scholarships - Gates Cambridge Scholarships', '', -1, '2014-07-15 23:50:48', -1, 396, 0),
('http://www.glprogramming.com/red/chapter01.html', 'Chapter 1 - OpenGL Programming Guide', '', -1, '2014-07-15 23:50:49', -1, 397, 0),
('http://www.elijahmanor.com/2013/04/angry-birds-of-javascript-big-brother.html', 'Web Dev .NET: Angry Birds of JavaScript: Big Brother Bird - Patterns', '', -1, '2014-07-15 23:50:50', -1, 398, 0),
('http://www.nycgo.com/restaurantweek/?pid=hp-hero-1-full_image', 'Restaurant Week in New York City â€“ Official Information About NYC Restaurant Week Dining Deals / nycgo.com', '', -1, '2014-07-15 23:50:51', -1, 399, 0),
('http://www.linuxbsdos.com/2012/06/06/how-to-dual-boot-linux-mint-13-cinnamonmate-and-windows-7/', 'LinuxBSDos.com â€“ How to dual-boot Linux Mint 13 Cinnamon/MATE and Windows 7', '', -1, '2014-07-15 23:50:53', -1, 400, 0),
('http://www.linfo.org/kernel.html', 'Kernel Definition', '', -1, '2014-07-15 23:50:54', -1, 401, 0),
('http://www.raywenderlich.com/14865/introduction-to-pixel-art-for-games', 'Introduction to Pixel Art for Games | Ray Wenderlich', '', -1, '2014-07-15 23:50:55', -1, 402, 0),
('http://docs.worldviz.com/vizard/Old_Book/Instant_Python.htm', 'Instant Python', '', -1, '2014-07-15 23:50:56', -1, 403, 0),
('http://zeoworks.com/misc.php?page=minotaurmaze', 'Minotaur Maze - Forums', '', -1, '2014-07-15 23:50:57', -1, 404, 0),
('http://www.crummy.com/software/BeautifulSoup/', 'Beautiful Soup: We called him Tortoise because he taught us.', '', -1, '2014-07-15 23:50:58', -1, 405, 0),
('http://placekitten.com/', '{placekitten}', '', -1, '2014-07-15 23:50:59', -1, 406, 0),
('http://scikit-learn.org/stable/index.html', 'scikit-learn: machine learning in Python â€” scikit-learn 0.13.1 documentation', '', -1, '2014-07-15 23:51:00', -1, 407, 0),
('http://physics.stackexchange.com/questions/70839/how-can-you-weigh-your-own-head-in-an-accurate-way', 'everyday life - How can you weigh your own head in an accurate way? - Physics Stack Exchange', '', -1, '2014-07-15 23:51:01', -1, 408, 0),
('http://stats.stackexchange.com/questions/18058/how-would-you-explain-covariance-to-someone-who-understands-only-the-mean', 'variance - How would you explain covariance to someone who understands only the mean? - Cross Validated', '', -1, '2014-07-15 23:51:02', -1, 409, 0),
('http://www.popularmechanics.com/technology/aviation/diy-flying/finally-a-human-powered-helicopter-wins-the-250000-sikorsky-prize-15682369', 'Finally! A Human-Powered Helicopter Wins the $250,000 Sikorsky Prize - Popular Mechanics', '', -1, '2014-07-15 23:51:03', -1, 410, 0),
('http://www.cs.otago.ac.nz/cosc453/student_tutorials/principal_components.pdf', 'www.cs.otago.ac.nz/cosc453/student_tutorials/principal_components.pdf', '', -1, '2014-07-15 23:51:04', -1, 411, 0),
('https://maps.google.co.uk/maps?q=Diagon+Alley+at+Warner+Bros.+Studio+Tour+London,+Warner+Bros.+Studio+Tour+London,+Studio+Tour+Drive,+Leavesden&hl=en&ll=51.690882,-0.417287&spn=0.004835,0.013411&sll=51.689718,-0.417566&layer=c&cid=10355248391383225485&panoid=u1gcE6cVKELE_xgImwtVHQ&cbp=13,274.23,,0,-1.66&hq=Diagon+Alley+at+Warner+Bros.+Studio+Tour+London,+Warner+Bros.+Studio+Tour+London,+Studio+Tour+Drive,+Leavesden&t=h&z=17&cbll=51.690875,-0.417249', 'Google Maps', '', -1, '2014-07-15 23:51:05', -1, 412, 0),
('http://askubuntu.com/questions/65083/what-different-desktop-environments-and-shells-are-available', 'software recommendation - What different desktop environments and shells are available? - Ask Ubuntu', '', -1, '2014-07-15 23:51:07', -1, 413, 0),
('https://www.mturk.com/mturk/', 'Amazon Mechanical Turk - Welcome', '', -1, '2014-07-15 23:51:08', -1, 414, 0),
('http://gafferongames.com/networking-for-game-programmers/udp-vs-tcp/', 'UDP vs. TCP - gafferongames.com', '', -1, '2014-07-15 23:51:09', -1, 415, 0),
('http://www.tug.org/twg/mactex/tutorials/ltxprimer-1.0.pdf', 'www.tug.org/twg/mactex/tutorials/ltxprimer-1.0.pdf', '', -1, '2014-07-15 23:51:11', -1, 417, 0),
('http://ss64.com/osx/syntax-bashkeyboard.html', 'bash terminal Keyboard shortcuts | SS64.com', '', -1, '2014-07-15 23:51:12', -1, 418, 0),
('http://dl.acm.org/', 'ACM Digital Library', '', -1, '2014-07-15 23:51:13', -1, 419, 0),
('http://www.desura.com/', 'Games | Desura', '', -1, '2014-07-15 23:51:14', -1, 420, 0),
('http://store.steampowered.com/app/39140/', 'FINAL FANTASY VII on Steam', '', -1, '2014-07-15 23:51:16', -1, 422, 0),
('http://chi2014.acm.org/authors/interactivity', 'Interactivity : Call for Participation | CHI 2014', '', -1, '2014-07-15 23:51:17', -1, 423, 0),
('http://adarkroom.doublespeakgames.com/', 'A Firelit Room', '', -1, '2014-07-15 23:51:18', -1, 424, 0),
('http://en.wikipedia.org/wiki/Uncanny_valley', 'Uncanny valley - Wikipedia, the free encyclopedia', '', -1, '2014-07-15 23:51:19', -1, 425, 0),
('http://obviam.net/index.php/getting-started-in-android-game-development-with-libgdx-create-a-working-prototype-in-a-day-tutorial-part-1/', 'Getting Started in Android Game Development with libgdx â€“ Create a Working Prototype in a Day â€“ Tutorial Part 1 | Against the Grain â€“ Game Development', '', -1, '2014-07-15 23:51:20', -1, 426, 0),
('http://mitpress.mit.edu/sicp/full-text/book/book-Z-H-4.html', 'Structure and Interpretation of Computer Programs', '', -1, '2014-07-15 23:51:21', -1, 427, 0),
('http://matplotlib.org/users/pyplot_tutorial.html', 'Pyplot tutorial â€” Matplotlib 1.2.1 documentation', '', -1, '2014-07-15 23:51:22', -1, 428, 0),
('http://www.kickstarter.com/projects/1944625487/omni-move-naturally-in-your-favorite-game/', 'Omni: Move Naturally in Your Favorite Game by Virtuix â€” Kickstarter', '', -1, '2014-07-15 23:51:23', -1, 429, 0),
('http://en.wikipedia.org/wiki/ID3_algorithm', 'ID3 algorithm - Wikipedia, the free encyclopedia', '', -1, '2014-07-15 23:51:24', -1, 430, 0),
('http://robotics.stanford.edu/~ronnyk/glossary.html', 'Glossary of Terms Journal of Machine Learning', '', -1, '2014-07-15 23:51:25', -1, 431, 0),
('http://www.amazon.com/Artificial-Intelligence-Modern-Approach-Edition/dp/0137903952/ref=cm_cr_pr_product_top', 'Artificial Intelligence: A Modern Approach (2nd Edition): Stuart Russell, Peter Norvig: 9780137903955: Amazon.com: Books', '', -1, '2014-07-15 23:51:26', -1, 432, 0),
('http://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf', 'homes.cs.washington.edu/~pedrod/papers/cacm12.pdf', '', -1, '2014-07-15 23:51:27', -1, 433, 0),
('https://www.yelp.com/dataset_challenge/dataset', 'Yelp Dataset Challenge | Yelp', '', -1, '2014-07-15 23:51:29', -1, 434, 0),
('http://www.cs.waikato.ac.nz/ml/weka/downloading.html', 'Weka 3 - Data Mining with Open Source Machine Learning Software in Java', '', -1, '2014-07-15 23:51:30', -1, 435, 0),
('http://archive.ics.uci.edu/ml/', 'UCI Machine Learning Repository', '', -1, '2014-07-15 23:51:31', -1, 436, 0),
('http://steigert.blogspot.com/search/label/libgdx?updated-max=2012-03-01T21:04:00-03:00&max-results=20&start=10&by-date=false', 'steigert | Android Development: libgdx', '', -1, '2014-07-15 23:51:32', -1, 437, 0),
('http://forums.verizon.com/t5/FiOS-Internet/need-help-changing-from-WEP-to-WPA-ENCRYPTION/td-p/232247', 'need help changing from WEP to WPA ENCRYPTION - Verizon Forums', '', -1, '2014-07-15 23:51:33', -1, 438, 0),
('http://www.physicsforums.com/showthread.php?t=413317', 'Is the universe deterministic?', '', -1, '2014-07-15 23:51:34', -1, 439, 0),
('http://mathwithbaddrawings.com/2013/06/16/ultimate-tic-tac-toe/', 'Ultimate Tic-Tac-Toe | Math with Bad Drawings', '', -1, '2014-07-15 23:51:35', -1, 440, 0),
('http://www.google.com/insidesearch/tipstricks/all.html', 'Search Tips &amp; Tricks â€“ Inside Search â€“ Google', '', -1, '2014-07-15 23:51:36', -1, 441, 0),
('http://www.webrtc.org/', 'WebRTC', '', -1, '2014-07-15 23:51:37', -1, 442, 0),
('http://gafferongames.com/networking-for-game-programmers/', 'Game Development Tutorials â€“ Networking for Game Programmers', '', -1, '2014-07-15 23:51:38', -1, 443, 0),
('http://ondras.zarovi.cz/games/just-spaceships/', 'Just Spaceships!', '', -1, '2014-07-15 23:51:39', -1, 444, 0),
('https://www.udacity.com/courses#!/intermediate', 'Course Catalog for Free Online Classes - Udacity', '', -1, '2014-07-15 23:51:40', -1, 445, 0),
('http://www.nsf.gov/crssprgm/reu/list_result.cfm?unitid=5049', 'US NSF - REU - List Result', '', -1, '2014-07-15 23:51:41', -1, 446, 0),
('http://www.paulgraham.com/articles.html', 'Essays', '', -1, '2014-07-15 23:51:42', -1, 447, 0),
('http://en.wikibooks.org/wiki/MySQL/CheatSheet', 'MySQL/CheatSheet - Wikibooks, open books for an open world', '', -1, '2014-07-15 23:51:44', -1, 448, 0),
('http://www.sitepoint.com/understanding-sql-joins-mysql-database/', 'Understanding JOINs in MySQL and Other Relational Databases', '', -1, '2014-07-15 23:51:45', -1, 449, 0),
('https://soundcloud.com/1051tunes/unacceptable-condition', 'Unacceptable Condition by Thenamelessavenger on SoundCloud - Hear the worldâ€™s sounds', '', -1, '2014-07-15 23:51:46', -1, 450, 0),
('http://osgameclones.com/#Doom-clones', 'Open Source Game Clones', '', -1, '2014-07-15 23:51:47', -1, 451, 0),
('http://gamejolt.com/games/adventure/pokemon-3d/10545/', '(1) Pokemon 3D - An Indie Adventure Game | Game Jolt', '', -1, '2014-07-15 23:51:48', -1, 452, 0),
('http://www.aaronsw.com/weblog/', 'Raw Thought: Aaron Swartz''s Weblog', '', -1, '2014-07-15 23:51:49', -1, 453, 0),
('http://en.wikipedia.org/wiki/The_Musical_Offering', 'The Musical Offering - Wikipedia, the free encyclopedia', '', -1, '2014-07-15 23:51:50', -1, 454, 0),
('http://perceptualscience.rutgers.edu/?title=Undergraduates', 'Perceptual Science - Undergraduates', '', -1, '2014-07-15 23:51:51', -1, 455, 0),
('http://one-div.com/', 'One div - The single element HTML/CSS icon database', '', -1, '2014-07-15 23:51:52', -1, 456, 0),
('http://en.wikipedia.org/wiki/Random_dot_stereogram', 'Random dot stereogram - Wikipedia, the free encyclopedia', '', -1, '2014-07-15 23:51:53', -1, 457, 0),
('http://en.wikibooks.org/wiki/C_Programming', 'C Programming - Wikibooks, open books for an open world', '', -1, '2014-07-15 23:51:54', -1, 458, 0),
('http://webcast.berkeley.edu/series.html#c,d,Computer_Science', 'UC Berkeley Webcasts | Video and Podcasts: Events by Category', '', -1, '2014-07-15 23:51:55', -1, 459, 0),
('http://www.hack4ed.org/coders/', 'St. Hacktrick''s Day | Coders', '', -1, '2014-07-15 23:51:56', -1, 460, 0),
('http://webdesignerwall.com/tutorials/cross-browser-html5-placeholder-text', 'Cross-Browser HTML5 Placeholder Text', '', -1, '2014-07-15 23:51:57', -1, 461, 0),
('http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever', 'Keep a node.js server up with Forever â€” blog.nodejitsu.com', '', -1, '2014-07-15 23:51:59', -1, 462, 0),
('http://youarelistening.to/denver', 'You are listening to Denver', '', -1, '2014-07-15 23:52:00', -1, 463, 0),
('http://www.musictheory.net/lessons', 'musictheory.net - Lessons', '', -1, '2014-07-15 23:52:01', -1, 464, 0),
('http://www.boohbah.tv/zone.html', 'Boohbah Zone', '', -1, '2014-07-15 23:52:02', -1, 465, 0),
('https://trac.webkit.org/wiki/JSC', 'JSC â€“ WebKit', '', -1, '2014-07-15 23:52:03', -1, 466, 0),
('https://onetimesecret.com/', 'Share a secret - One Time', '', -1, '2014-07-15 23:52:04', -1, 467, 0),
('http://www.melonjs.org/tutorial/index.html', 'melonJS', '', -1, '2014-07-15 23:52:05', -1, 468, 0),
('http://craftyjs.com/tutorial/', 'Crafty - What we need', '', -1, '2014-07-15 23:52:06', -1, 469, 0),
('http://bits.blogs.nytimes.com/2013/02/27/scientists-uncover-invisible-motion-in-video/#.US8ic6HeXQo.hackernews', 'http://bits.blogs.nytimes.com/2013/02/27/scientists-uncover-invisible-motion-in-video/#.US8ic6HeXQo.hackernews', '', -1, '2014-07-15 23:52:07', -1, 470, 0),
('http://www.kchodorow.com/blog/2013/02/28/guide-to-tech-interviews/', 'Snail in a Turtleneck Â» Blog Archive Â» Guide to Tech Interviews', '', -1, '2014-07-15 23:52:08', -1, 471, 0),
('https://c9.io/', 'Cloud9 IDE | Online IDE â€“ Your code anywhere, anytime', '', -1, '2014-07-15 23:52:09', -1, 472, 0),
('http://www.altdevblogaday.com/2013/02/22/latency-mitigation-strategies/', '#AltDevBlogADay Â» Latency Mitigation Strategies', '', -1, '2014-07-15 23:52:10', -1, 473, 0),
('http://www.playadrift.com', 'http://www.playadrift.com', '', -1, '2014-07-15 23:52:11', -1, 474, 0),
('http://www.aaronsw.com/weblog/dying', 'A Moment Before Dying (Aaron Swartz''s Raw Thought)', '', -1, '2014-07-15 23:52:13', -1, 475, 0),
('http://www.amazon.com/Hutzler-5717-571-Banana-Slicer/product-reviews/B0047E0EII/ref=dp_top_cm_cr_acr_txt?ie=UTF8&showViewpoints=1&tag=rnwap-20', 'Amazon.com: Customer Reviews: Hutzler 571 Banana Slicer', '', -1, '2014-07-15 23:52:14', -1, 476, 0),
('http://qt-project.org/', 'Qt Project', '', -1, '2014-07-15 23:52:15', -1, 477, 0),
('http://en.wikipedia.org/wiki/Binary_space_partitioning', 'Binary space partitioning - Wikipedia, the free encyclopedia', '', -1, '2014-07-15 23:52:17', -1, 478, 0),
('http://limbogame.org/store/', 'LIMBO', '', -1, '2014-07-15 23:52:18', -1, 479, 0),
('http://games.greggman.com/game/programming_m_c__kids/', 'Programming M.C. Kids Â« games.greggman.com', '', -1, '2014-07-15 23:52:19', -1, 480, 0),
('http://gamedev.stackexchange.com/questions/23554/general-2d-collision-detection-question', 'General 2D Collision Detection Question - Game Development', '', -1, '2014-07-15 23:52:20', -1, 481, 0),
('http://spiffygif.com/', 'SpiffyGif', '', -1, '2014-07-15 23:52:21', -1, 482, 0),
('http://simplecv.sourceforge.net/doc/index.html', 'Welcome to SimpleCVâ€™s documentation! â€” SimpleCV v1.2 documentation', '', -1, '2014-07-15 23:52:22', -1, 483, 0),
('http://www.newgrounds.com/portal/view/541124', 'Coma', '', -1, '2014-07-15 23:52:23', -1, 484, 0),
('http://www.paulgraham.com/disagree.html', 'How to Disagree', '', -1, '2014-07-15 23:52:24', -1, 485, 0),
('http://www.lwjgl.org/', 'lwjgl.org - Home of the Lightweight Java Game Library', '', -1, '2014-07-15 23:52:25', -1, 486, 0),
('http://www.slick2d.org/about/', 'Slick2D | Project Details', '', -1, '2014-07-15 23:52:26', -1, 487, 0),
('http://www.alchemyapi.com/api/categ/proc.html', 'API Calls: Text Categorization | AlchemyAPI', '', -1, '2014-07-15 23:52:28', -1, 489, 0),
('https://www.intellexere.com/en/homepage', 'Homepage | Intellexere', '', -1, '2014-07-15 23:52:29', -1, 490, 0),
('http://www.tiag.me/linux-mint-nvidia-drivers/', 'Linux Mint Nvidia Drivers - Tiag.me', '', -1, '2014-07-15 23:52:32', -1, 492, 0),
('http://www.tomshardware.com/forum/238831-50-need-installing-nvidia-drivers-linux-mint', 'Need help installing nvidia drivers for linux mint 14 - Linux Mint - Linux/', '', -1, '2014-07-15 23:52:33', -1, 493, 0),
('http://gamedev.tutsplus.com/tutorials/implementation/simulate-fabric-and-ragdolls-with-simple-verlet-integration/', 'Simulate Fabric and Ragdolls With Simple Verlet Integration | Gamedevtuts ', '', -1, '2014-07-15 23:52:34', -1, 494, 0),
('http://itch.io/', 'itch.io', '', -1, '2014-07-15 23:52:35', -1, 495, 0),
('https://blog.mozilla.org/blog/2013/03/27/mozilla-is-unlocking-the-power-of-the-web-as-a-platform-for-gaming/', 'Mozilla is Unlocking the Power of the Web as a Platform for Gaming | The Mo', '', -1, '2014-07-15 23:52:36', -1, 496, 0),
('http://laravel.com/', 'Laravel - A Clean &amp; Classy PHP Framework', '', -1, '2014-07-15 23:52:37', -1, 497, 0),
('http://studentwork.rutgers.edu/new/FWSMenustudent.htm', 'Student Employment', '', -1, '2014-07-15 23:52:38', -1, 498, 0),
('http://skybiometry.com/Documentation', 'Documentation - SkyBiometry - FREE cloud based Face Detection and Recogniti', '', -1, '2014-07-15 23:52:39', -1, 499, 0),
('http://rawkets.com/', 'Rawkets | A multiplayer game built using HTML5 canvas and WebSockets', '', -1, '2014-07-15 23:52:40', -1, 500, 0),
('http://bingweb.binghamton.edu/~scraver/underhanded/index.html', 'The Underhanded C Context', '', -1, '2014-07-15 23:52:41', -1, 501, 0),
('http://ssokolow.com/quicktile/', 'Main - QuickTile by ssokolow', '', -1, '2014-07-15 23:52:42', -1, 502, 0),
('http://c.learncodethehardway.org/book/', 'Learn C The Hard Way', 'To read', 5, '2014-10-25 00:46:44', -1, 504, 0),
('http://gryllus.net/Blender/3D.html', 'Blender 3D Design Course', 'test.', -1, '2015-01-03 18:51:03', -1, 506, 2),
('http://gryllus.net/Blender/3D.html', 'Blender 3D Design Course', 'test2', 11, '2015-01-03 18:51:14', -1, 507, 2),
('https://developer.chrome.com/extensions/storage', 'chrome.storage - Google Chrome', 'over https', 10, '2015-01-03 18:51:38', -1, 508, 2);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `name` varchar(500) NOT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`name`, `id`, `user_id`) VALUES
('Game Development', 3, 0),
('Articles', 5, 0),
('Machine Learning', 6, 0),
('Mathematics', 7, 0),
('Graphics', 8, 0),
('Test', 10, 2),
('Another name', 11, 2),
('Kevin''s Category', 13, 3),
('JS Libraries', 15, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(500) NOT NULL,
  `password` char(40) NOT NULL,
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`, `user_id`) VALUES
('default', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 0),
('test', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 2),
('kevin', 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3', 3);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
