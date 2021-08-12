# oik blocks


## Summary of blocks in the src folder

`index.js` defines the blocks that are built for this plugin.

The `blocks` folder contains the source for the Editor blocks.
SSR = Server Side Rendered

Block            | Type    | Shortcode(s)        | Purpose
-----            | ----    | --------            | -----
oik-blockicon    | Static  | -                   | Block icon
oik-blockinfo    | Static  | -                   | Block info
oik-blocklist    | Static  | -                   | Block list for selected prefix
oik-content      | Dynamic SSR | various         | Dynamic content block
oik-fields       | Dynamic SSR | [bw_fields]     | Displays fields / virtual fields
oik-nivo         | Dynamic SSR  | [nivo]              | Nivo slider
oik-person       | Dynamic SSR  | [bw_user] [bw_follow_me] | Person block

In each folder there is at least 1 .js file, and there could be some .scss files.

File |  Target | Contents
----- | ------	| --------------
editor.scss | blocks.editor.css | Styling for the editor
index.js | index.js | REACT JS for the block
style.scss | style-index.css | Styling for the front end
*.js | index.asset.php | Automatically built dependencies

## Build folder

The `build` folder contains the run-time components:

File | Contents
---- | -------
index.asset.php | Dependencies and version used when registering blocks
index.css | editorStyle - built CSS for the Editor
index.js | editorScript - built JS for the Editor
style-index.css | style - built CSS for the Front end


## Build process

To build the JavaScript code in the `src` folder you need to use `npm` (Node Package Manager),
which is part of Node.js. 

If you don't already have it [download and install Node.js](https://nodejs.org/en/download/)

Check what versions you have using `node -v` and `npm -v`.

```
C:\Users\herb>node -v
v14.17.0

C:\Users\Herb>npm -v
6.4.11
```

Then you need to install the dependencies locally.
Run these commands from the plugin's directory.

```
npm install
npm install @wordpress/scripts --save-dev
```

These will install a gazillion files into the `node_modules` folder, creating over 2000 sub-directories.

If you're unfamiliar with npm, then you may want to read something about it.
See [What is npm?](https://docs.npmjs.com/getting-started/what-is-npm) 
and [npm javascript package manager](and https://docs.npmjs.com/cli/npm)

To build the blocks into the run time code you then need to run either

```
npm run dev
```
which builds the development version,

or, to build the production version,

```
npm run build
```


There are other scripts in `package.json` that you can run. 
- `npm run dev` is equivalent to `npm run start` or `npm start`.
- other scripts are for internationalisation and localisation.