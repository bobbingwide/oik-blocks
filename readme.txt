=== oik-blocks ===
Contributors: bobbingwide
Donate link: https://www.oik-plugins.com/oik/oik-donate/
Tags: gutenberg, shortcode, blocks, oik
Requires at least: 4.9.8
Tested up to: 5.0-RC1
Gutenberg compatible: Yes
Stable tag: 0.0.0-alpha-20181125
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

== Description ==
WordPress 5.0 blocks, aka Gutenberg blocks, for oik shortcodes.

This is mostly prototype code delivering a number of the oik shortcodes 
as blocks for the new WordPress content editor.


oik delivers over 80 shortcodes. 
Some of these are crying out to be converted into advanced WordPress blocks.

oik-blocks provides 11 blocks

- Address
- CSS
- CSV 
- Contact form
- Countdown
- Follow me
- GitHub Issue
- Google Maps
- Nivo slider
- Person
- Prototype Generic shortcode block

For more info on the blocks included in the plugin see:

[blocks readme](https://github.com/bobbingwide/oik-blocks/tree/master/blocks)

This is just the start. 

This plugin is currently being used for education, demonstration, experimentation and estimation.

The code is being developed to work with latest version of the Gutenberg plugin and/or the latest build of WordPress 5.0.

We'll refer to Gutenberg as the new editor.
And each block will be called a block.


The oik-block plugin, from which this plugin was forked, includes logic to evaluate Gutenberg's compatibility with site contents.
It forms opinions at multiple levels and applies these to decide which editor is the safest to use for the content and context.



== Installation ==
1. Upload the contents of the oik-blocks plugin to the `/wp-content/plugins/oik-blocks' directory
1. Activate the oik-blocks plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

Where can I find out more?

[github bobbingwide oik-blocks ]


Yes, it's dependent upon a number of other plugins:

- oik 
- oik-bob-bing-wide
- gutenberg and / or WordPress 5.0-beta5
- oik-nivo-slider
- oik-css

== Screenshots ==
1. oik-blocks's address block

== Upgrade Notice ==
= 0.0.0-alpha-20181125 =
No longer displays the Preferred editor meta box 


= 0.0.0-alpha-20181120 =
Forked from oik-block which will now only implement opinions.

== Changelog == 
= 0.0.0-alpha-20181125 =
* Deleted: Remove preferred editor, opinions and other stuff that'll remain in oik-block [github bobbingwide oik-blocks issues 1]
* Changed: Updated banner and icon assets to oik-blocks

= 0.0.0-alpha-20181120 =
* Added: New plugin for oik-blocks only, cloned from oik-block
* Changed: oik-block to oik-blocks, and other variations
* Deleted: Removed opinion logic
* Tested: With Gutenberg 4.4.0
* Tested: With PHP 7.1 and 7.2
* Tested: With WordPress 4.9.8 and WordPress 5.0-beta5

== Further reading ==
If you want to read more about the oik plugins then please visit the
[oik plugin](https://www.oik-plugins.com/oik) 
**"the oik plugin - for often included key-information"**

