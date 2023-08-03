import { createContext } from 'react';

import { initialStateFilter } from '../utils/initialState.filter';

export const FilterContext = createContext({
    filterCon: initialStateFilter,
    setFilterCon: (s: any) => {s},
})