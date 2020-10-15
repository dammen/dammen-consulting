import {createContext} from 'react';
import {Config} from '../types/config';

export const ConfigContext = createContext<Config | null>(null)
