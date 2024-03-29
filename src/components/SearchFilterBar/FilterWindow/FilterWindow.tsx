import React, { useContext, useState } from 'react';
import {
    Autocomplete,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { FilterCon } from 'types';

import { FilterContext } from '../../../contexts/filter.context';
import { PaginationContext } from '../../../contexts/pagination.context';
import { initialStateFilter } from '../../../utils/initialState.filter';
import { month } from '../../../utils/month';

import './FilterWindow.scss';

interface FilterState extends FilterCon{
    [key: string]: any;
}

export const FilterWindow = (props:any) => {

    const { filterCon,setFilterCon } = useContext(FilterContext)
    const [filters, setFilters] = useState<FilterState>(filterCon);
    const { pagination, setPagination } = useContext(PaginationContext);

    const title= [['Ocena przejścia kursu','courseCompletion'],['Ocena aktywności i zaangażowania na kursie','courseEngagement'], ['Ocena kodu w projekcie własnym','projectDegree'], ['Ocena pracy w zespole w Scrum','teamProjectDegree']];

    const filtersChange = ( stateName: string,  substateName:string ,value?: string | number | undefined| null| boolean) => {
        if (substateName !== '') {
            setFilters({
                ...filters,
                [stateName]: {
                    ...filters[stateName],
                    [substateName]: value ?? !filters[stateName][substateName],
                },
            });
        } else {
            setFilters({
                ...filters,
                [stateName]: value,
            });
        }
    };

    const monthList: string[] = Array.from({ length: 31 }, (_, i) => {
        return month(i);
    });

    const clear = () =>{
        setFilters(initialStateFilter);
        setFilterCon(initialStateFilter);
    }

    const lookState = ()=>{
        setFilterCon(filters);
        setPagination({
            ...pagination,
            page: 0,
        })
        props.handleClose();
    }

    return(

        <Paper className="dialog-paper">
            <Grid container alignItems="center" className="title-bar">
                <DialogTitle className="title">Filtrowanie</DialogTitle>
                <Button onClick={clear} className="clear-button">Wyczyść wszystkie</Button>
            </Grid>

            <DialogContent className="dialog">

                {title.map((title,index) => (
                    <div key={index} className="degree">
                        <p className="title">{title[0]}</p>
                        <Grid container alignItems="center">
                            <p className="text-checkbox">Ocena</p>
                            <FormControl variant="standard">
                                <Select
                                    onChange={(event) =>filtersChange(title[1],'', event.target.value as number)}
                                    value={filters[title[1]]}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                            <p className="text-checkbox margin-left">i wyższa</p>
                        </Grid>
                    </div>
                ))}

                <p className="title">Preferowane miejsce pracy</p>
                <ToggleButtonGroup>
                    <ToggleButton
                        value=''
                        onClick={() => filtersChange('expectedTypeWork', 'remoteWork')}
                        className={filters.expectedTypeWork.remoteWork ? 'box-star-checked' : 'box-star'}
                    >
                        <span className="text-checkbox">Praca zdalna</span>
                    </ToggleButton>

                    <ToggleButton
                        value=''
                        onClick={() =>filtersChange('expectedTypeWork', 'inOffice')}
                        className={filters.expectedTypeWork.inOffice ? 'box-star-checked' : 'box-star'}
                        style={{ marginLeft: '16px' }}
                    >
                        <span className="text-checkbox">Praca w biurze</span>
                    </ToggleButton>
                </ToggleButtonGroup>

                <p className="title">Oczekiwany typ kontraktu</p>
                <ToggleButtonGroup>
                    <ToggleButton
                        value=''
                        onClick={() =>filtersChange('expectedContractType', 'employmentContract')}
                        className={filters.expectedContractType.employmentContract ? 'box-star-checked' : 'box-star'}
                    >
                        <span className="text-checkbox">Umowa o pracę</span>
                    </ToggleButton>
                    <ToggleButton
                        value=''
                        onClick={() =>filtersChange('expectedContractType', 'b2b')}
                        className={filters.expectedContractType.b2b ? 'box-star-checked' : 'box-star'}
                        style={{ marginLeft: '16px' }}
                    >
                        <span className="text-checkbox">B2B</span>
                    </ToggleButton>
                    <ToggleButton
                        value=''
                        onClick={() =>filtersChange('expectedContractType', 'mandateContract')}
                        className={filters.expectedContractType.mandateContract ? 'box-star-checked' : 'box-star'}
                        style={{ marginLeft: '16px' }}
                    >
                        <span className="text-checkbox">Umowa zlecenie</span>
                    </ToggleButton>
                    <ToggleButton
                        value=''
                        onClick={() =>filtersChange('expectedContractType', 'workContract')}
                        className={filters.expectedContractType.workContract ? 'box-star-checked' : 'box-star'}
                        style={{ marginLeft: '16px' }}
                    >
                        <span className="text-checkbox">Umowa o dzieło</span>
                    </ToggleButton>
                </ToggleButtonGroup>

                <p className="title">Oczekiwane wynagrodzenie miesięczne netto</p>
                <Grid container alignItems="center">
                    <p className="text-checkbox margin-right">Od</p>
                    <TextField
                        className="box-star text-checkbox"
                        value={filters.expectedSalary.min}
                        placeholder="np. 1000 zł"
                        variant="standard"
                        onChange={(event) =>filtersChange('expectedSalary', 'min',event.target.value)}
                    />
                    <p className="text-checkbox margin-left margin-right">Do</p>
                    <TextField
                        className="box-star"
                        value={filters.expectedSalary.max}
                        placeholder="np. 4000 zł"
                        variant="standard"
                        onChange={(event) =>filtersChange('expectedSalary', 'max',event.target.value)}
                    />
                </Grid>

                <p className="title">Zgoda na odbycie bezptatnych praktyk/stażu na poczatek</p>
                <RadioGroup
                    name="controlled-radio-buttons-group"
                    className="controlled-radio"
                    onChange={(event) =>filtersChange('canTakeApprenticeship', '',event.target.value)}
                >
                    <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Tak"
                        className="text-checkbox"
                    />
                    <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="Nie"
                        className="text-checkbox"
                    />
                </RadioGroup>

                <p className="title">Ilość miesięcy doświadczenia komercyjnego kandydata w programowaniu</p>
                <Autocomplete
                    disablePortal
                    options={monthList}
                    className="box-star text-checkbox com-exp"
                    onChange={(event, value) => filtersChange('monthsOfCommercialExp', '', value)}
                    renderInput={(params) =>
                        <TextField
                            className="text-checkbox "
                            {...params}
                            variant="standard"
                        />}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} className="cancel-button">Anuluj</Button>

                <Button onClick={lookState} className="box-star-checked cancel-button">Pokaż wyniki</Button>
            </DialogActions>
        </Paper>

    )
}