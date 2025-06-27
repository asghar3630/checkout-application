import { Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconUpload } from '@tabler/icons';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import { useEffect } from 'react';

const FileUploader = ({ formik }) => {
    const theme = useTheme();
    const [files, setFiles] = useState([]);

    const UploadButton = styled(Button, {
        shouldForwardProp: (prop) => prop !== 'error'
    })(({ error }) => ({
        border: error ? '1px solid #f44336' : '1px solid rgb(196 196 196)',
        '&:hover, &.Mui-focusVisible': {
            backgroundColor: 'rgb(255 255 255)',
            border: error ? '1px solid #f44336' : '1px solid rgb(97 97 97)'
        },
        '&:focus, &.Mui-focused': {
            border: error ? '1px solid #f44336' : '1px solid #1f8de5'
        }
    }));
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {};
    };

    const handleChangeFileInput = (event, formik) => {
        formik.handleChange('docBase64List');
        setFiles((currentFiles) => currentFiles.concat(event.target.files[0]));
    };

    const removeFileHandler = (fileName) => {
        setFiles((currentFiles) => currentFiles.filter((file) => file.name !== fileName));
    };

    const handleFileListUpdates = () => {
        const docBase64List = [];

        files.forEach((file, index, arr) => {
            getBase64(file, (result) => {
                const documentBase64 = result.replace('data:', '').replace(/^.+,/, '');
                docBase64List.push({ fileName: file.name, documentBase64 });
                if (index == arr.length - 1) {
                    formik.setFieldValue('docBase64List', docBase64List);
                }
            });
        });
    };

    useEffect(() => {
        handleFileListUpdates();
    }, [files]);
    return (
        <Grid container justifyContent="flex-start" spacing={2}>
            <Grid item>
                <TextField
                    type="file"
                    id="file-upload"
                    onChange={(event) => handleChangeFileInput(event, formik)}
                    onClick={(event) => {
                        event.target.value = null;
                    }}
                    error={formik.touched.docBase64List && Boolean(formik.errors.docBase64List)}
                    helperText={formik.touched.docBase64List && formik.errors.docBase64List}
                    InputLabelProps={{
                        required: true
                    }}
                    onBlur={formik.handleBlur}
                    fullWidth
                    sx={{ display: 'none' }}
                />
                <UploadButton
                    id="uploadButton"
                    htmlFor="file-upload"
                    component="label"
                    variant="outlined"
                    size="large"
                    error={formik.touched.docBase64List && Boolean(formik.errors.docBase64List) && files.length == 0}
                    sx={{
                        minHeight: '50px',
                        minWidth: '100px',
                        borderRadius: theme.gui.button.borderRadius,
                        color:
                            formik.touched.docBase64List && Boolean(formik.errors.docBase64List) && files.length == 0
                                ? '#f44336'
                                : '#9e9e9e'
                    }}
                    startIcon={<IconUpload />}
                >
                    Upload Receipt
                </UploadButton>
                {formik.touched.docBase64List && Boolean(formik.errors.docBase64List) && files.length == 0 && (
                    <p
                        style={{
                            color: '#f44336',
                            fontSize: '0.75rem',
                            fontWeight: '400',
                            fontFamily: `Roboto","Helvetica","Arial",sans-serif`,
                            lineHeight: '1.66',
                            letterSpacing: '0.03333em',
                            textAlign: 'left',
                            marginTop: '3px',
                            marginRight: '14px',
                            marginBottom: '0',
                            marginLeft: '14px'
                        }}
                    >
                        Receipt file must be uploaded
                    </p>
                )}
            </Grid>
            {files.length > 0 &&
                files.map((file) => {
                    return (
                        <Grid item>
                            <UploadButton
                                id="attachedFileButton"
                                component="label"
                                variant="outlined"
                                size="large"
                                error={formik.touched.docBase64List && Boolean(formik.errors.docBase64List) && files.length == 0}
                                sx={{
                                    minHeight: '50px',
                                    minWidth: '100px',
                                    backgroundColor: '#E7EFF8',
                                    borderRadius: theme.gui.button.borderRadius,
                                    color:
                                        formik.touched.docBase64List && Boolean(formik.errors.docBase64List) && files.length == 0
                                            ? '#f44336'
                                            : '#212121'
                                }}
                                startIcon={
                                    <CloseOutlinedIcon
                                        onClick={() => {
                                            formik.handleChange('docBase64List');
                                            formik.setFieldValue('docBase64List', '');
                                            removeFileHandler(file.name);
                                        }}
                                    />
                                }
                            >
                                <Typography
                                    sx={{
                                        flexWrap: 'nowrap'
                                    }}
                                >
                                    {file?.name.length > 20 ? file?.name.substring(0, 20) + '...' : file?.name}
                                </Typography>
                            </UploadButton>
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default FileUploader;
