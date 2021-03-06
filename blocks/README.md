# oik blocks


## Summary of blocks

`index.js` defines the blocks that are built for this plugin.

The `blocks` folder contains the source for the Editor blocks.
SSR = Server Side Rendered

Block            | Type    | Shortcode(s)        | Purpose
-----            | ----    | --------            | -----
github           | Static  | [github]            | Wrapper to [github] shortcode
oik-address      | Static  | [bw_address]        | Address block
oik-blockicon    | Static  | -                   | Block icon
oik-contact-form | Dynamic | [bw_contact_form]   | Contact form 
oik-countdown    | Static  | [bw_countdown]      | Countdown timer
oik-css          | Dynamic | [bw_css]            | Inline CSS 
oik-csv          | Dynamic | [bw_csv]            | Display CSV content
oik-dashicon     | Dynamic SSR | [bw_dash[       | Dash icon
oik-fields       | Dynamic SSR | [bw_fields]         | Displays fields / virtual fields
oik-follow-me    | Static  | [bw_follow_me]      | Social media follow me
oik-geshi        | Dynamic SSR | [bw_geshi] | Generic Syntax Highlighting: none, PHP, HTML, JavaScript, CSS
oik-googlemap    | Static  | [bw_show_googlemap] | Google Maps Map
oik-nivo         | Static  | [nivo]              | Nivo slider
oik-person       | Static  | [bw_user] [bw_follow_me] | Person block
oik-search       | Dynamic SSR | [bw_search] | Search form
oik-shortcode    | Dynamic | various             | Dynamic shortcode block
oik-uk-tides     | Dynamic SSR | [bw_tides]      | UK tides block
oik-wp           | Dynamic SSR | [wp]            | Displays information about WordPress and PHP versions

In each folder there is at least 1 .js file, and there could be some .scss files.

File |  Target | Contents
----- | ------	| --------------
editor.scss | blocks.editor.css | Styling for the editor
index.js | editor.blocks.js | REACT JS for the block
style.scss | blocks.style.css | Styling for the front end



## Build folder

The `build` folder contains the run-time components:

Folder | File | Contents
------ | ----- | -------
css    | blocks.editor.css | Styles used in the Block editor
css    | blocks.style.css | Styles used in the front end
images | js-wapuu.svg | wapuu SVG file - from Zac's course
js     | dummy.blocks.js | Dummy editor.blocks.js for testing Issue #4678
js     | editor.blocks.js | Built JS for the Editor
js     | frontend.blocks.js | Built JS for the front end


## Build process

To build the JavaScript code in the blocks folder you need to use npm (Node Package Manager),
which is part of Node.js. 

If you don't already have it [download and install Node.js](https://nodejs.org/en/download/)

Check what versions you have using `node -v` and `npm -v`.

```
C:\Users\Herb>node -v
v8.9.4

C:\Users\Herb>npm -v
6.4.1 
```


npm 6 is needed for building Gutenberg 4.0.0


Then you need to install the dependencies locally.

```
npm install
```

Run this command from the plugin's directory. 

This will install a gazillion files into the `node_modules` folder, creating over 2000 sub-directories.

If you're unfamiliar with npm, then you may want to read something about it.
See [What is npm?](https://docs.npmjs.com/getting-started/what-is-npm) 
and [npm javascript package manager](and https://docs.npmjs.com/cli/npm)

To build the blocks into the run time code you then need to run either

```
npm run dev
```

or 

```
npm run build
```





 
