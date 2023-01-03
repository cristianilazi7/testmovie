import React from 'react';

const SearchBox = (props: any) => {

    return (
        <>
        <input
        className='form-control'
        value= {props.value}
        onChange= {(event)=> props.setSearchValue(event.target.value)}
        placeholder='Type to search...'
        >
        </input>
        </>
    )

}

export default SearchBox;