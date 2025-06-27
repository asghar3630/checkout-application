import {
    Button,
    CardContent,
    Chip,
    Grid,
    InputAdornment,
    OutlinedInput,
    Stack,
    TableCell,
    Typography,
    useMediaQuery,
    Box,
    Paper,
    Divider,
    DialogActions,
    ClickAwayListener,
    Popper,
    Checkbox,
    Autocomplete,
    TextField,
    IconButton
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { useTheme } from '@mui/styles';
import MainCard from 'ui-component/cards/MainCard';
import {
    appHeaderHeight,
    largeHeaderHeightTablet,
    smallHeaderHeight,
    smallHeaderHeightTablet,
    smallHeaderHeightTabletWithoutSerach,
    TableInnerSpacing
} from 'store/constant';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
    largeHeaderHeightMobile,
    mainLayoutInnerSpacing,
    mainLayoutOuterSpacing,
    smallHeaderHeightMobile,
    largeHeaderHeight
} from 'store/constant';
import profile_img from '../../assets/images/profile.png';
import { useState, useRef } from 'react';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import * as moment from 'moment';
import { DateRange, DateRangePicker } from 'react-date-range';
import Transitions from 'ui-component/extended/Transitions';
import { toFormatedDate, toTitleCase } from 'views/utilities/helperFunctions.';
import { IconSearch } from '@tabler/icons';
import CloseIcon from '@mui/icons-material/Close';
import { IconChevronLeft } from '@tabler/icons';
import { IconArrowLeft } from '@tabler/icons';
import { useNavigate } from 'react-router';

export const ListViewCard = ({ ...props }) => {
    const theme = useTheme();
    return (
        <MainCard
            content={false}
            sx={{
                // '& .css-m35kij-MuiGrid-root': {
                //     marginTop: '-34px',
                //     marginBottom: '-9px'
                // },
                border: 1,
                borderColor: theme.palette.listViewCard.borderColor,
                ml: `${mainLayoutOuterSpacing}px`,
                mr: `${mainLayoutOuterSpacing}px`
            }}
        >
            {props.children}
        </MainCard>
    );
};
export const CardPrintingCard = ({ ...props }) => {
    const theme = useTheme();
    return (
        <MainCard
            content={false}
            sx={{
                // '& .css-m35kij-MuiGrid-root': {
                //     marginTop: '-34px',
                //     marginBottom: '-9px'
                // },
                border: 1,
                height: `calc(100vh - (${appHeaderHeight}px + ${mainLayoutOuterSpacing * 2}px + ))`,
                borderColor: theme.palette.listViewCard.borderColor,
                ml: `${mainLayoutOuterSpacing}px`,
                mr: `${mainLayoutOuterSpacing}px`
            }}
        >
            {props.children}
        </MainCard>
    );
};

export const ListViewHeaderSmallWithDate = ({
    headerTitle,
    buttonTitle,
    placeholder,
    searchList,
    showAddForm,
    toggleShowAddForm,
    reporting = false,
    totalRecords,
    displayDate = false,
    setDate
}) => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
    const anchorRef = useRef(null);
    const [showDatepickerModal, setShowDatepickerModal] = useState(false);
    const [dateState, setDateState] = useState({
        startDate: '',
        endDate: ''
    });
    const [tempDate, setTempDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const formatDate = (date) => {
        const dateObj = { startDate: null, endDate: null };
        if (date.startDate instanceof Date && !isNaN(date.startDate) && date.endDate instanceof Date && !isNaN(date.endDate)) {
            dateObj.startDate = toFormatedDate(date.startDate);
            dateObj.endDate = toFormatedDate(date.endDate);
        }
        setDate(dateObj);
    };

    return (
        <CardContent
            sx={{
                backgroundColor: theme.palette.headerBackgroundColor.lightBlue,
                // [theme.breakpoints.up('md')]: {
                //     height: `${smallHeaderHeight}vh`
                // },
                // [theme.breakpoints.down('md')]: {
                //     height: `${smallHeaderHeightMobile}vh`
                // },
                height: `${matchDownMd ? smallHeaderHeightTablet : smallHeaderHeight}px`,
                p: mainLayoutInnerSpacing,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: matchDownMd ? 0.5 : 0 }}>
                {reporting ? (
                    <Grid item alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={3}>
                            <Typography variant="h3">{headerTitle}</Typography>
                            <Typography sx={{ pt: 0.5 }}>{totalRecords} Records Found</Typography>
                        </Stack>
                    </Grid>
                ) : (
                    <Grid item>
                        <Typography variant="h3">{headerTitle}</Typography>
                    </Grid>
                )}

                <Grid item sx={{ pt: matchDownMd ? 2 : 0 }}>
                    <Grid container justifyContent={matchDownMd ? 'space-between' : 'flex-end'}>
                        {!matchDownSm && displayDate && !showAddForm && (
                            <Grid item xs={12} sm={4} md={4}>
                                <OutlinedInput
                                    id="input-date-range-list-style1"
                                    placeholder="Select Date Range"
                                    sx={{ height: '3.18em', '& .MuiOutlinedInput-input': { padding: '10.5px 14px' } }}
                                    endAdornment={
                                        <InputAdornment position="end" sx={{ height: '1em !important' }}>
                                            <CalendarTodayIcon style={{ fontSize: '1rem' }} />
                                        </InputAdornment>
                                    }
                                    onClick={() => {
                                        setShowDatepickerModal((state) => !state);
                                    }}
                                    disabled
                                    size="medium"
                                    // sx={{ maxWidth: '100% !important' }}
                                    ref={anchorRef}
                                    fullWidth
                                    value={
                                        dateState.startDate instanceof Date &&
                                        !isNaN(dateState.startDate) &&
                                        dateState.endDate instanceof Date &&
                                        !isNaN(dateState.endDate)
                                            ? `${moment(dateState.startDate).format('yyyy-MM-DD')} - ${moment(dateState.endDate).format(
                                                  'yyyy-MM-DD'
                                              )}`
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
                                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
                                                        >
                                                            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                                                                <DateRange
                                                                    editableDateInputs={true}
                                                                    onChange={(item) => setTempDate([item.selection])}
                                                                    moveRangeOnFirstSelection={false}
                                                                    ranges={tempDate}
                                                                    maxDate={new Date()}
                                                                    direction="horizontal"
                                                                />
                                                            </Box>
                                                            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                                                                <DateRangePicker
                                                                    onChange={(item) => {
                                                                        setTempDate([item.selection]);
                                                                    }}
                                                                    showSelectionPreview={true}
                                                                    moveRangeOnFirstSelection={false}
                                                                    months={2}
                                                                    ranges={tempDate}
                                                                    direction="horizontal"
                                                                    maxDate={new Date()}
                                                                />
                                                            </Box>

                                                            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
                                                            <DialogActions sx={{ pr: 2.5, paddingBottom: 2.5, paddingTop: 1 }}>
                                                                <TransparentButton
                                                                    title="Clear"
                                                                    onClick={() => {
                                                                        setTempDate((state) => {
                                                                            return [
                                                                                {
                                                                                    ...state[0],
                                                                                    startDate: new Date(),
                                                                                    endDate: new Date(),
                                                                                    key: 'selection'
                                                                                }
                                                                            ];
                                                                        });
                                                                        setDateState({
                                                                            startDate: '',
                                                                            endDate: ''
                                                                        });
                                                                        const dateObj = { startDate: null, endDate: null };
                                                                        setDate(dateObj);
                                                                    }}
                                                                />
                                                                <FilledButton
                                                                    title="Apply"
                                                                    onClick={() => {
                                                                        const date = {
                                                                            startDate: tempDate[0].startDate,
                                                                            endDate: tempDate[0].endDate
                                                                        };
                                                                        setDateState(date);
                                                                        setShowDatepickerModal(false);
                                                                        formatDate(date);
                                                                    }}
                                                                />
                                                            </DialogActions>
                                                        </MainCard>
                                                    )}
                                                </Paper>
                                            </Transitions>
                                        </ClickAwayListener>
                                    )}
                                </Popper>
                            </Grid>
                        )}
                        {!showAddForm && (
                            <Grid item xs={matchDownSm ? 6 : 4} sx={{ ml: matchDownSm ? 0 : 3 }}>
                                <OutlinedInput
                                    id="input-search-list-style1"
                                    placeholder={placeholder}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconSearch stroke={1.5} size="16px" />
                                        </InputAdornment>
                                    }
                                    size="small"
                                    sx={{ height: '3.18em' }}
                                    onChange={(e) => {
                                        searchList(e.target.value);
                                    }}
                                />
                            </Grid>
                        )}

                        {showAddForm ? (
                            <Grid item>
                                <TransparentButton title="Close" onClick={toggleShowAddForm} />
                            </Grid>
                        ) : (
                            buttonTitle && (
                                <Grid item sx={{ ml: matchDownSm ? 0 : 3 }}>
                                    <FilledButton title={` Add ${buttonTitle}`} onClick={toggleShowAddForm} />
                                </Grid>
                            )
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    );
};

export const ListViewHeaderSmall = ({
    headerTitle,
    buttonTitle,
    placeholder,
    searchList,
    showAddForm,
    toggleShowAddForm,
    reporting = false,
    totalRecords,
    issearchBar = true,
    isInventoryLibrary = true,
    searchFieldsList,
    onSearch,
    onClear,
    inputOnChange
}) => {
    const theme = useTheme();
    const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const [selectedSearchField, setSelectedSearchField] = useState();
    const [selectedSearchValue, setSelectedSearchValue] = useState();

    return (
        <CardContent
            sx={{
                backgroundColor: theme.palette.headerBackgroundColor.lightBlue,
                [theme.breakpoints.up('md')]: {
                    height: `${smallHeaderHeight}px`
                },
                [theme.breakpoints.down('md')]: {
                    height: `${issearchBar ? smallHeaderHeightTabletWithoutSerach : smallHeaderHeightTablet}px`
                },
                [theme.breakpoints.down('sm')]: {
                    height: `${matchDownSm && !isInventoryLibrary ? '90' : smallHeaderHeightMobile}px`
                },
                p: mainLayoutInnerSpacing,
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: matchDownMd ? 0.5 : 0 }}>
                {reporting ? (
                    <Grid item alignItems="center" justifyContent="space-between">
                        <Stack direction={matchDownSm ? 'column' : 'row'} spacing={matchDownSm ? 1 : 3}>
                            <Typography variant="h3">{headerTitle}</Typography>
                            <Typography sx={{ pt: 0.5 }}>{totalRecords} Records Found</Typography>
                        </Stack>
                    </Grid>
                ) : matchDownMd && !isInventoryLibrary ? (
                    ''
                ) : (
                    <Grid item>
                        <Typography variant="h3">{headerTitle}</Typography>
                    </Grid>
                )}

                <Grid item sx={{ pt: matchDownSm ? 2 : 0, ml: matchDownSm ? (!isInventoryLibrary ? 0 : '10%') : 0 }}>
                    <Grid container>
                        {!showAddForm &&
                            (searchFieldsList ? (
                                <Stack direction="row" spacing={0}>
                                    <Autocomplete
                                        size="small"
                                        id="field"
                                        options={searchFieldsList}
                                        getOptionLabel={(option) => toTitleCase(option.label)}
                                        sx={{
                                            '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
                                                pt: '9px !important',
                                                pb: '9px !important'
                                            },
                                            '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                borderTopRightRadius: 0,
                                                borderBottomRightRadius: 0
                                            },
                                            minWidth: 220
                                        }}
                                        onChange={(e, obj) => {
                                            if (obj) {
                                                setSelectedSearchField(obj);
                                                setSelectedSearchValue('');
                                            } else {
                                                onClear();
                                                setSelectedSearchField();
                                                setSelectedSearchValue('');
                                            }
                                            inputOnChange();
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                name="searchField"
                                                label="Select Field"
                                                inputProps={{
                                                    ...params.inputProps
                                                }}
                                                InputLabelProps={
                                                    {
                                                        // required: true
                                                    }
                                                }
                                            />
                                        )}
                                    />

                                    {selectedSearchField?.category == 'dropdown' ? (
                                        <Autocomplete
                                            size="small"
                                            id="field"
                                            options={selectedSearchField.list}
                                            getOptionLabel={(option) => toTitleCase(option.label)}
                                            sx={{
                                                '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
                                                    pt: '9px !important',
                                                    pb: '9px !important'
                                                },
                                                '& .MuiInputBase-root.MuiOutlinedInput-root': {
                                                    borderRadius: 0
                                                },
                                                minWidth: 250
                                            }}
                                            onChange={(e, obj) => {
                                                if (obj) {
                                                    setSelectedSearchValue(obj.value);
                                                } else {
                                                    setSelectedSearchValue('');
                                                }
                                                inputOnChange();
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    name="fieldValue"
                                                    label="Field Value"
                                                    inputProps={{
                                                        ...params.inputProps
                                                    }}
                                                    InputLabelProps={
                                                        {
                                                            // required: true
                                                        }
                                                    }
                                                />
                                            )}
                                        />
                                    ) : (
                                        <OutlinedInput
                                            id="input-search-list-style1"
                                            placeholder={placeholder}
                                            value={selectedSearchValue}
                                            endAdornment={
                                                selectedSearchValue ? (
                                                    <InputAdornment position="start">
                                                        <CloseIcon
                                                            stroke={1.5}
                                                            size="16px"
                                                            sx={{ cursor: 'pointer' }}
                                                            onClick={() => {
                                                                setSelectedSearchValue('');
                                                                searchList('');
                                                                onClear();
                                                                inputOnChange();
                                                            }}
                                                        />
                                                    </InputAdornment>
                                                ) : (
                                                    <InputAdornment position="start">
                                                        <CloseIcon stroke={1.5} size="16px" style={{ color: 'white' }} />
                                                    </InputAdornment>
                                                )
                                            }
                                            size="small"
                                            style={{ borderRadius: 0, minWidth: 250 }}
                                            onChange={(e) => {
                                                setSelectedSearchValue(e.target.value);
                                                !selectedSearchField && searchList(e.target.value);
                                                inputOnChange();
                                            }}
                                        />
                                    )}

                                    <IconButton
                                        disabled={selectedSearchValue && selectedSearchField ? false : true}
                                        size="small"
                                        aria-label="close"
                                        color="blue"
                                        onClick={() => {
                                            onSearch({
                                                selectedSearchField,
                                                selectedSearchValue
                                            });
                                        }}
                                        style={{
                                            backgroundColor:
                                                selectedSearchValue && selectedSearchField ? theme.palette.buttonColor.blue : '#FFFFFF'
                                        }}
                                        sx={{
                                            border: selectedSearchValue && selectedSearchField ? 0 : 1,
                                            // borderColor: '#a5b3c1',
                                            borderRadius: 0,
                                            borderTopRightRadius: 8,
                                            borderBottomRightRadius: 8
                                        }}
                                    >
                                        <IconSearch
                                            stroke={2}
                                            fontSize="large"
                                            style={{
                                                marginLeft: 3,
                                                marginRight: 3,
                                                color: selectedSearchValue && selectedSearchField ? '#FFFFFF' : 'gray'
                                            }}
                                        />
                                    </IconButton>
                                </Stack>
                            ) : (
                                <OutlinedInput
                                    id="input-search-list-style1"
                                    placeholder={placeholder}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconSearch stroke={1.5} size="16px" />
                                        </InputAdornment>
                                    }
                                    size="small"
                                    onChange={(e) => {
                                        searchList(e.target.value);
                                    }}
                                />
                            ))}

                        {showAddForm ? (
                            <Grid item>
                                <TransparentButton title="Close" onClick={toggleShowAddForm} />
                            </Grid>
                        ) : (
                            buttonTitle && (
                                <Grid
                                    item
                                    sx={{
                                        pt: matchDownSm ? 1 : 0,
                                        ml: matchDownSm ? '15%' : 3
                                    }}
                                >
                                    {matchDownSm && !isInventoryLibrary ? (
                                        ''
                                    ) : (
                                        <FilledButton title={` Add ${buttonTitle}`} onClick={toggleShowAddForm} />
                                    )}
                                </Grid>
                            )
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    );
};

export const ListViewHeaderLarge = ({ headerTitle, message, showBackButton = false, ...props }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <CardContent
            sx={{
                backgroundColor: theme.palette.headerBackgroundColor.lightBlue,
                [theme.breakpoints.up('md')]: {
                    height: `${largeHeaderHeight}px`
                },
                [theme.breakpoints.down('md')]: {
                    height: `${largeHeaderHeightTablet}px`
                },
                [theme.breakpoints.down('sm')]: {
                    height: `${largeHeaderHeightMobile}px`
                },
                p: mainLayoutInnerSpacing
            }}
        >
            <Stack direction="row">
                {showBackButton && (
                    <IconButton
                        sx={{
                            color: theme.palette.buttonColor.blue,
                            position: 'relative',
                            bottom: 5,
                            right: 10,
                            '&:hover ': { backgroundColor: 'unset' }
                        }}
                        size="small"
                        onClick={() => {
                            navigate('/batch-history');
                        }}
                    >
                        <IconArrowLeft />
                    </IconButton>
                )}

                <Typography variant="h3">{headerTitle}</Typography>
            </Stack>
            <Grid container direction="row" sx={{ pt: 2, pb: 1 }}>
                <Stack direction="row" spacing={1}>
                    <InfoOutlinedIcon style={{ position: 'relative', top: '-3' }} />
                    <Typography align="left" variant="h5" component="div" textTransform="none" style={{ position: 'relative', top: '1' }}>
                        {message}
                    </Typography>
                </Stack>
            </Grid>
            {props.children}
        </CardContent>
    );
};

export const FilledButton = ({ title, ...props }) => {
    const theme = useTheme();
    return (
        <AnimateButton>
            <Button
                variant="contained"
                size="large"
                sx={{
                    backgroundColor: theme.palette.buttonColor.blue,
                    ':hover': {
                        boxShadow: '0px 9px 12px 2px rgb(17 147 239 / 25%)'
                    },
                    '&.css-84e376': {
                        backgroundColor: theme.palette.buttonColor.blue,
                        boxShadow: '0px 9px 12px 2px rgb(17 147 239 / 25%)'
                    },
                    borderRadius: theme.gui.button.borderRadius,
                    minHeight: '40px',
                    minWidth: '100px'
                }}
                {...props}
            >
                {title}
            </Button>
        </AnimateButton>
    );
};

export const TransparentButton = ({ title, ...props }) => {
    const theme = useTheme();
    return (
        <AnimateButton>
            <Button
                variant="outlined"
                size="large"
                sx={{ minHeight: '40px', minWidth: '100px', borderRadius: theme.gui.button.borderRadius }}
                {...props}
            >
                {title}
            </Button>
        </AnimateButton>
    );
};

export const TextButton = ({ title, ...props }) => {
    const theme = useTheme();
    return (
        <AnimateButton>
            <Button
                variant="text"
                size="large"
                sx={{ minHeight: '40px', minWidth: '100px', borderRadius: theme.gui.button.borderRadius }}
                {...props}
            >
                {title}
            </Button>
        </AnimateButton>
    );
};

export const FormTableLabelElement = ({ label, value }) => {
    return (
        <TableCell sx={{ borderBottomWidth: 0, pt: 1.5, pb: 2, px: 3 }}>
            <Stack sx={{ borderBottom: '1pt solid', color: '#CBCBCB' }} spacing={1}>
                <Typography align="left" variant="formHeader6" noWrap>
                    {label}
                </Typography>
                <Typography align="left" variant="subtitle3" component="div" sx={{ pb: 0.5 }}>
                    {value}
                </Typography>
            </Stack>
        </TableCell>
    );
};

export const FormTableDateLabelElement = ({ label, value }) => {
    return (
        <TableCell sx={{ borderBottomWidth: 0, py: 1, px: 3 }}>
            <Stack sx={{ borderBottom: '1pt solid', color: '#CBCBCB' }} spacing={1}>
                <Typography align="left" variant="formHeader6" noWrap>
                    {label}
                </Typography>
                <Grid container display="flex" justifyContent="space-between" sx={{}}>
                    <Typography align="left" variant="subtitle3" component="div" sx={{ pb: 0.5 }}>
                        {value}
                    </Typography>
                    <CalendarTodayRoundedIcon />
                </Grid>
            </Stack>
        </TableCell>
    );
};

export const FormTableSectionHeader = ({ icon, title }) => {
    const theme = useTheme();
    return (
        <TableCell
            sx={{
                border: 0,
                pt: 0.8,
                pb: 0.8,
                borderBottom: '1pt solid',
                borderBottomColor: '#EDEDEF',
                backgroundColor: theme.palette.headerBackgroundColor.lightBlue
            }}
            colSpan={3}
        >
            <Stack direction="row" spacing={1}>
                {icon}
                <Typography align="left" variant="subtitle1" component="div">
                    {title}
                </Typography>
            </Stack>
        </TableCell>
    );
};

export const FormTableSectionSubHeader = ({ icon, title }) => {
    return (
        <TableCell sx={{ border: 0, pt: 1.5 }} colSpan={3}>
            <Stack direction="row" spacing={1} sx={{ color: '#1565C0' }}>
                {icon}
                <Typography align="left" variant="subHeader" component="div">
                    {title}
                </Typography>
            </Stack>
        </TableCell>
    );
};

export const Statuslabel = ({ label, bgColor }) => {
    const theme = useTheme();
    return (
        <Chip
            label={label}
            size="medium"
            sx={{
                background: bgColor,
                color: '#fff',
                minWidth: '100px',
                height: '40px',
                borderRadius: theme.gui.button.borderRadius
            }}
        />
    );
};

export const PhotoAvatarBox = ({ loadImage }) => {
    const [isShown, setIsShown] = useState(false);

    const onHover = () => {
        setIsShown(true);
    };

    const onHoverLeave = () => {
        setIsShown(false);
    };
    return (
        <Grid
            item
            onClick={loadImage}
            onMouseEnter={onHover}
            onMouseLeave={onHoverLeave}
            sx={{
                opacity: isShown ? 0.3 : 1,
                textTransform: 'lowercase',
                cursor: 'pointer',
                mt: TableInnerSpacing,
                mb: TableInnerSpacing
            }}
        >
            <>
                <img src={profile_img} style={{ width: '133px' }} alt="" />
                <Typography
                    sx={{
                        display: 'block',
                        // width: '133px',
                        pl: 1
                    }}
                >
                    Click to load photo
                </Typography>
            </>
        </Grid>
    );
};
