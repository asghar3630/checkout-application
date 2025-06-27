import { Button, ClickAwayListener, DialogActions, Divider, Grid, InputAdornment, OutlinedInput, Paper, Popper } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { DateRange, DateRangePicker } from 'react-date-range';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useRef } from 'react';
import { useTheme } from '@emotion/react';
import * as moment from 'moment';

const DatePicker = ({ date, onDateSelection, minDate, isDisableField }) => {
    const anchorRef = useRef(null);
    const theme = useTheme();

    const [dateState, setDateState] = useState({
        startDate: date?.fromDate,
        endDate: date?.toDate
    });

    const onDateSelect = (dateRange) => {
        onDateSelection(dateRange);
    };
    const initialDateRange = [
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ];

    const [tempDate, setTempDate] = useState(initialDateRange);

    const [showDatepickerModal, setShowDatepickerModal] = useState(false);

    return (
        <Grid container>
            <OutlinedInput
                id="input-date-range-list-style1"
                placeholder="Date Range"
                endAdornment={
                    <InputAdornment position="end">
                        {!isDisableField && <CalendarTodayIcon style={{ fontSize: '1.1rem', cursor: 'pointer' }} />}
                    </InputAdornment>
                }
                onClick={() => {
                    setShowDatepickerModal((state) => !state);
                }}
                disabled={isDisableField}
                size="medium"
                ref={anchorRef}
                fullWidth
                value={
                    dateState?.startDate && dateState?.endDate
                        ? `${moment(dateState.startDate).format('yyyy-MM-DD')} - ${moment(dateState.endDate).format('yyyy-MM-DD')}`
                        : ''
                }
            />
            <Popper
                placement="bottom-end"
                open={showDatepickerModal}
                role={undefined}
                transition
                anchorEl={anchorRef.current}
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
                sx={{
                    position: 'relative !important',
                    inset: '0px 0px auto auto',
                    margin: '0px',
                    transform: 'translate(0px, 6.0667px) !important'
                }}
            >
                {({ TransitionProps }) => (
                    <ClickAwayListener
                        onClickAway={() => {
                            setShowDatepickerModal(false);
                        }}
                    >
                        <Transitions in={showDatepickerModal} {...TransitionProps}>
                            <Paper>
                                {showDatepickerModal && (
                                    <MainCard
                                        border={false}
                                        elevation={6}
                                        content={false}
                                        boxShadow
                                        shadow={theme.shadows[16]}
                                        sx={{
                                            zIndex: (theme) => theme.zIndex.modal + 1
                                        }}
                                    >
                                        <Box>
                                            <DateRange
                                                editableDateInputs={true}
                                                onChange={(item) => setTempDate([item.selection])}
                                                moveRangeOnFirstSelection={false}
                                                ranges={tempDate}
                                                maxDate={new Date()}
                                                minDate={minDate && moment(minDate, 'YYYY-MM-DD', true).isValid() ? new Date(minDate) : ''}
                                                direction="horizontal"
                                            />
                                        </Box>
                                        <Divider sx={{ mt: 0.25, mb: 1.25 }} />
                                        <DialogActions sx={{ pr: 2.5, paddingBottom: 2.5, paddingTop: 1 }}>
                                            <Button
                                                sx={{ color: theme.palette.text.dark }}
                                                onClick={() => {
                                                    setTempDate(initialDateRange);
                                                    setDateState({
                                                        startDate: null,
                                                        endDate: null
                                                    });
                                                    onDateSelect({
                                                        startDate: null,
                                                        endDate: null
                                                    });
                                                }}
                                                color="secondary"
                                                size="medium"
                                            >
                                                Clear
                                            </Button>
                                            <Button
                                                variant="contained"
                                                size="medium"
                                                onClick={() => {
                                                    setDateState({
                                                        startDate: tempDate[0].startDate,
                                                        endDate: tempDate[0].endDate
                                                    });
                                                    setShowDatepickerModal(false);
                                                    onDateSelect({
                                                        startDate: tempDate[0].startDate,
                                                        endDate: tempDate[0].endDate
                                                    });
                                                }}
                                                sx={{
                                                    backgroundColor: theme.palette.buttonColor.blue,
                                                    ':hover': { backgroundColor: theme.palette.buttonColor.blue },
                                                    borderRadius: theme.gui.button.borderRadius,
                                                    paddingRight: 3,
                                                    paddingLeft: 3
                                                }}
                                            >
                                                Apply
                                            </Button>
                                        </DialogActions>
                                    </MainCard>
                                )}
                            </Paper>
                        </Transitions>
                    </ClickAwayListener>
                )}
            </Popper>
        </Grid>
    );
};

export default DatePicker;
