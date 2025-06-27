import React from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

const DateTimeForm = () => {
    const initialValues = {
        date: null,
        startTime: null,
        endTime: null
    };

    const validationSchema = Yup.object().shape({
        date: Yup.date().required('Date is required').typeError('Invalid date'),

        startTime: Yup.mixed()
            .nullable()
            .test('start-required-if-end-exists', 'Start time is required if end time is selected', function (startTime) {
                const { endTime } = this.parent;
                return !endTime || !!startTime;
            }),

        endTime: Yup.mixed()
            .nullable()
            .test('end-required-if-start-exists', 'End time is required if start time is selected', function (endTime) {
                const { startTime } = this.parent;
                return !startTime || !!endTime;
            })
            .test('end-after-start', 'End time must be after start time', function (endTime) {
                const { startTime } = this.parent;
                if (startTime && endTime) {
                    return dayjs(endTime).isAfter(dayjs(startTime));
                }
                return true;
            })
    });

    const handleSubmit = (values) => {
        console.log('Submitted values:', values);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ values, setFieldValue, touched, errors }) => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <DatePicker
                                    label="Select Date"
                                    value={values.date}
                                    onChange={(value) => setFieldValue('date', value)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            error={touched.date && Boolean(errors.date)}
                                            helperText={touched.date && errors.date}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TimePicker
                                    label="Start Time"
                                    value={values.startTime}
                                    onChange={(value) => {
                                        debugger;
                                        setFieldValue('startTime', value);
                                        // Reset end time if start time is changed
                                        setFieldValue('endTime', null);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            error={touched.startTime && Boolean(errors.startTime)}
                                            helperText={touched.startTime && errors.startTime}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TimePicker
                                    label="End Time"
                                    value={values.endTime}
                                    onChange={(value) => setFieldValue('endTime', value)}
                                    minTime={values.startTime ? dayjs(values.startTime).add(1, 'minute') : undefined}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            error={touched.endTime && Boolean(errors.endTime)}
                                            helperText={touched.endTime && errors.endTime}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </LocalizationProvider>
    );
};

export default DateTimeForm;
