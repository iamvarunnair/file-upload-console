import * as React from 'react';

const AtomLine = (props: { dir?: 'x' | 'y'; bgClass?: string }) => {
    const { dir = 'x', bgClass = 'bg-black' } = props;
    return (
        <div
            className={
                (dir === 'x' ? 'w-100 h-q' : dir === 'y' ? 'h-100 w-q' : '') +
                ' ' +
                bgClass
            }
        ></div>
    );
};

export default AtomLine;
