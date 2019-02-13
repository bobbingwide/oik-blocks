/*
 * Block prefix select control
 *
 * @TODO Reduce the list to just the prefixes
 * For the time being you select a block and we determine the prefix from the chosen block.
 * The onChange function will have to do that.
 *
 *
 * @copyright (C) Copyright Bobbing Wide 2019
 * @author Herb Miller @bobbingwide
 *
 */

const { Component }  = wp.element;
const{ getBlockTypes, getBlockType } = wp.blocks;
const { BlockIcon } = wp.editor;
const { SelectControl } = wp.components;

function BlockPrefixSelect( { value, onChange, ...props } ) {

    const options = getOptions();
    //console.log( options );
    options.sort( compareValues );
    //console.log( options );

    return (


        <SelectControl label="Prefix" value={ value } options={ options } onChange={ onChange } />
    );
    //this.renderBlockiconList();

}

function compareValues(a, b) {
    if (a.value < b.value )
        return -1;
    if (a.value > b.value )
        return 1;
    return 0;
}


/**
 * How do we reduce the list of Block types to a smaller array of Prefixes?
 * @returns {*}
 */

function getOptions() {
    var block_types = getBlockTypes();
    const namespaces = getNameSpaces( block_types );
    const options = namespaces.map ( ( namespace ) => getBlockPrefixOption( namespace ) );
    console.log( options );
    return options;
}

function getBlockPrefixOption( namespace ) {
    return {'label': namespace, 'value': namespace };
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function getNameSpaces( block_types) {
    var namespaces = block_types.map( ( block ) => getNameSpace( block ));
    var unique_namespaces = namespaces.filter( onlyUnique );

    console.log( namespaces );
    console.log( unique_namespaces );
    return unique_namespaces;

}

function getNameSpace( block ) {
    var block_name = block.name;
    var prefix_array = block_name.split( '/' );
    var namespace = prefix_array[0];
    return namespace;
}

/**
 * So how do I get the icon into the option label?
 * It seems it's not possible.
 *
 * @param block
 * @returns {string}
 */

function getOptionLabel( block ) {
    var label = `${block.name} - ${ block.title }`;
    return label;
}




export  { BlockPrefixSelect };