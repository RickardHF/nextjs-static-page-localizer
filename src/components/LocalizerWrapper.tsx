'use client';

import React, { useState } from 'react';
import { ConfigurationInterface } from '../interfaces';
import { LocalizationContext } from './Contexts';

interface LocalizerWrapperProps extends React.ComponentProps<any> {
    configuration: ConfigurationInterface
}

export default function LocalizerWrapper( props: LocalizerWrapperProps ) {
    const [configuration, setConfiguration] = useState(props.configuration);

    function updateConfiguration( newConfig: ConfigurationInterface ) {
        setConfiguration( newConfig );
    }

    return (
        <LocalizationContext.Provider value={{ configuration, updateConfiguration }}>
            {props.children}
        </LocalizationContext.Provider>
    );
}
