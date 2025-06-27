import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';
import { useState } from 'react';

function valuetext(value) {
    return `${value}`;
}

const RangeSlider = ({ rangeCalculator, reset }) => {
    const [value, setValue] = useState([0, 100]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        rangeCalculator(newValue);
    };

    useEffect(() => {
        setValue([0, 100]);
    }, [reset]);

    return (
        // <Box sx={{ width: 280 }}>
        <Slider
            getAriaLabel={() => 'age range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
        />
        // </Box>
    );
};

export default RangeSlider;
