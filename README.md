# Development

### Link to Website
https://woefulworm.github.io/development/

### Goal and Value of the Application
I wanted to make a fun and whimsical application (almost game) where the user rifles through my background, stealing items.
I wanted to make a fun and whimsical application (almost game) where the user rifles through my background, stealing items. I also tried to harken back to an earlier geocities-esque design language to play up the fun and unseriousness of the website.

### Usability Principles Considered
I also added two sorting catagories. I thought the value critera would be helpful to a theif who wanted to inflict the most damage on me and the alphabetical one would be helpful if they were looking for a specific item. Then I added the two filtering catagories because I thought they were fun and whimsical. 

I also made it so that when hovering over an component it was clear that that component was highlighted and selectable. Also the buttons looked like traditional buttons and said what they did on them to make it as simple as possible.

For the visibility of system status, I made sure that the user could always see 1.) the value of and 2.) the specific items stolen at any given point. For accesibility, I ensured that the contrast was correct and anything could be read by a screenreader, including alt text for images.

### Organization of Components
I tried to make everything as simple as possible. I decided to show all the items in a grid at once, since that felt most similar to how exploring a backpack would be, where you are able to see the entire contents of it at once. Also, I had a two column system so one could keep track of all the items they had stolen while simultaneously looking at the contents of my backpack. The repeating items in the grid made it clear that they all behaved the same way and were a part of the same component family.

### How Data is Passed Down Through Components
The data on my website is from a JSON file with all the infromation on the items in it. From there, it is unpacked and stored in an array with a custom "generalItem" constructor that could hold all the data of the JSON line items. From there, I had three useState arrays that had all the currently visible elements, the filtered out ones, and the stolen ones. 

I also bolded the total value of items stolen to set it off from the rest of the sentance, as that felt like the most important piece of information for a theif and should be easy to see.

### How the User Triggers State Changes

I have it so that each array is a useState that can trigger changes on the page to refresh. I also have an "update" useState integer that I increment on changes that wouldn't be refelcted immedelty so that the website can change without changing other useState variables.
