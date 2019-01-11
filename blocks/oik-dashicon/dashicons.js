/*
 * Dashicons Select list
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 *
 * We want a big list of icons from which the user can choose one to have displayed in the Dashicon block.
 * The Dashicon component covers the standard WordPress list
 * How do we enumerate the icon attributes of the registered block types?
 *
 */

const { Component }  = wp.element;
const { Dashicon } = wp.components;

const dashicons = [
    'heart',
    'album'
];

/**
 * This hard coded logic should be replaced by some mapping stuff
 * where each of the Dashicons values are displayed.
 * Assume we can do this in a standard select list
 */



class DashiconsSelect extends Component {
    render() {
        return(
            <ul>
                <li><Dashicon icon="heart" /></li>
                <li><Dashicon icon="album" /></li>
            </ul>
        )
    }
}
export {dashicons, DashiconsSelect};



