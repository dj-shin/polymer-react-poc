import React from 'react';
import ReactDOM from 'react-dom';
import { SimpleComponent } from './components/react/SimpleComponent';

ReactDOM.render(
    <React.StrictMode>
        <SimpleComponent count={0}/>
    </React.StrictMode>,
    document.getElementById('react-root')
);
