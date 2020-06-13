import React from 'react';

import { 

    BrowserRouter, 
    Route, 
    Switch 

} from 'react-router-dom';

import Main from './pages/Main/main';
import NotFound from './pages/NotFound/main';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}
