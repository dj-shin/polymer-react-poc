import React, { useEffect, useState } from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'child-element': any;       // required to pass typechecking of custom elements
        }
    }
}

interface SimpleComponentProps {
    count: number;
}
export const SimpleComponent: React.FunctionComponent<SimpleComponentProps> = (props) => {
    console.log('SimpleComponent');
    const [count, setCount] = useState(props.count);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [count]);
    return (
        <div className="simple-box" style={{
            border: "1px solid black",
            padding: "1em",
            backgroundColor: "skyblue",
        }}>
            <p>[React] counter: {count}</p>
            {count % 2 ? <child-element count={count}></child-element> : undefined}
        </div>
    );
};
