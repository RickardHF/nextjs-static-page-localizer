'use client';

import { createContext, useContext } from 'react';
import { ConfigurationInterface } from '../interfaces';
import Configuration from '../classes/Configuration';

interface LocalizationInterface {
    configuration: ConfigurationInterface,
    updateConfiguration?: (config: ConfigurationInterface) => void,
}

const defaultLocalization: LocalizationInterface = {
    configuration: new Configuration("", [], {}),
};

export const LocalizationContext = createContext(defaultLocalization);

export function useLocalization() {
    return useContext(LocalizationContext);
}