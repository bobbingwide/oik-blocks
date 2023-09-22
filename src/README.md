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

## Build process
The build process is only necessary if you want to build the block yourself.

Command | Purpose                                                      | Notes
-------- |--------------------------------------------------------------| -----
`npm start` or `npm run dev` | To build the blocks during development.                      | Press Ctrl-C to stop the process.
`npm run build` | To build the blocks for production                           | The routine should terminate when the build is complete.
`npm run makepot` | To build the main .pot file for translation                  | Uses wp-cli. Note the plugin specific parameters
`npm run l10n` | To automatically generate language (.po) files.              | See below
`npm run makejson` | To create the block editor language files after translation. |
`npm run packages-update` | Update packages                                              | Updates node_modules, package.json and package-lock.json


### Notes:
l10n is a process that automatically generates language files for:

    - UK English ( locale: en_GB )
    - bbboing ( a language used for testing, locale: bb_BB )

These `.po` files are processed using `msgfmt` to create the `.mo` files loaded at runtime to perform the localization of the PHP code.

The process for internationalization and localization is

1. Run `npm run dev` or `npm run build` to build the code.
2. Run `npm run makepot` to extract translatable strings.
3. Run `npm run l10n` to translate into UK English and bbboing.
4. Run `npm run makejson` to generate the translation files used in the editor.

Pre-requisites:

You need to have `npm` - Node Package Manager - installed.

For some basic instructions see the Build process section of [oik-blocks summary of blocks README](https://github.com/bobbingwide/oik-blocks/blob/master/src/README.md)

Many people run the `npm` command from the command line.

For `l10n` see [Internationalization for the oik suite of plugins](https://github.com/bobbingwide/oik-i18n)
