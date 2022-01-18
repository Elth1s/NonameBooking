import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateRangePicker from "@mui/lab/DateRangePicker";
import { FC, useState } from "react";
import { Box, TextField } from "@mui/material";
import { compareAsc } from 'date-fns'

import { CssTextField } from "../CssTextField"
import { IDateRange } from "../../user/ApartmentPage/types";

interface IDate {
    value: any,
    setValue: any,
    datesForDisable: Array<IDateRange>
}

function addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}

function addMonths(date: any, months: number) {
    let d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
        date.setDate(0);
    }
    return date;
}






const SelectDate: FC<IDate> = ({ value, setValue, datesForDisable }) => {

    const [maxDateValue, setMaxDateValue] = useState<Date>();

    function sortStartDates() {
        let datesStart = [] as Array<Date>;
        datesForDisable.forEach(element => {
            let date = new Date(element.start);
            date.setHours(0, 0, 0, 0);
            datesStart.push(date);
        });
        datesStart.sort(compareAsc);
        return datesStart;
    }

    function getMaxDate(newValue: Date) {
        let dates = sortStartDates();
        for (let i = 0; i < dates.length; i++) {
            if (newValue.getTime() < dates[i].getTime()) {
                setMaxDateValue(dates[i])
                return;
            }
        }
        setMaxDateValue(addMonths(new Date(), 6))
    }

    function setMaxDate(date: any) {
        return date ? maxDateValue : addMonths(new Date(), 6);
    }

    function getDates(startDate: Date, stopDate: Date) {
        let dateArray = new Array<Date>();
        let currentDate = startDate;
        stopDate.setHours(0, 0, 0, 0);

        if (value[0])
            if (value[0].getTime() < startDate.getTime()) {
                currentDate = addDays(currentDate, 1);
            }
        while (currentDate < stopDate) {
            currentDate.setHours(0, 0, 0, 0);
            dateArray.push(new Date(currentDate));
            currentDate = addDays(currentDate, 1);
        }
        return dateArray;
    }

    function disableDays(date: any) {
        const dateInterditesRaw = [] as Array<Date>;
        datesForDisable.forEach(item => {
            let dates = getDates(new Date(item.start), new Date(item.end));
            dateInterditesRaw.push(...(dates));
        })


        const dateInterdites = dateInterditesRaw.map((arrVal) => {
            return arrVal.getTime();
        });

        return dateInterdites.includes(date.getTime());
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
                disablePast
                shouldDisableDate={disableDays}
                value={value}
                maxDate={setMaxDate(value[0])}
                onChange={(newValue) => {
                    if (newValue[0])
                        getMaxDate(newValue[0])

                    if (value[0]?.getTime() != newValue[0]?.getTime()) {
                        setValue([newValue[0], null]);
                    }
                    else if (newValue[1]) {
                        setValue(newValue);
                    }
                }}
                renderInput={(startProps, endProps) => (
                    <>
                        <CssTextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <CssTextField {...endProps} />
                    </>
                )}
            />
        </LocalizationProvider>
    );
}

export default SelectDate