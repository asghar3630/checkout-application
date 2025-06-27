import rgbHex from 'rgb-hex';

export const toTitleCase = (string) => {
    const aplittedString = string?.split(' ');
    const titleCaseString = (aplittedString ?? []).map((str) => {
        return str[0]?.toUpperCase() + str.slice(1);
    });
    return titleCaseString.join(' ');
};

export const toFormatedDate = (selectedDate) => {
    let date = new Date(selectedDate);
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${year}-${month}-${day}`;
};
export const toGetMonthName = (selectedDate) => {
    let date = new Date(selectedDate);
    const month = date.toLocaleString('default', { month: 'long' });
    // let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    // let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    // let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return month.substring(0, 3);
};
export const toMakeTitleCase = (value) => {
    return value.charAt(0)?.toUpperCase() + value.slice(1);
};

export const deflateErrors = (serverErrors) => {
    if (serverErrors && serverErrors.length > 0) {
        let resp = {};

        serverErrors.forEach((error) => {
            var keyNames = Object.keys(error);
            resp = {
                ...resp,
                [keyNames[0] === 'field' ? error[keyNames[0]] : error[keyNames[1]]]:
                    keyNames[0] === 'field' ? error[keyNames[1]] : error[keyNames[0]]
            };
        });
        return resp;
    } else {
        return {};
    }
};

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const snakeBarErrorMessageObject = (err) => {
    const errorObj = { type: 'error', message: 'Something Went Wrong' };
    if (isJson(err?.message)) {
        const error = JSON.parse(err.message);
        if (error.status == 'INVALID_CREDENTIALS') {
            errorObj.message = 'Invalid Credentials';
        } else if (error.status == 'SESSION_EXPIRED') {
            errorObj.message = 'SESSION EXPIRED';
        } else if (error.status == 'BAD_REQUEST') {
            if (error.data.status == 'VALIDATION_FAILED') {
                const errorBody = deflateErrors(error.data.errors);
                const errorMessageArray = Object.values(errorBody);
                const errorMessage = errorMessageArray && errorMessageArray.length && errorMessageArray[0];
                errorObj.message = errorMessage;
            } else if (error.data.status == 'NOT_FOUND') {
                errorObj.message = error.data.message;
            } else if (error.data.status == 'BUSSINESS_RULE_FAILED') {
                errorObj.message = error.data.message;
            }
        } else {
            errorObj.message = 'Something Went Wrong';
        }
    }

    return errorObj;
};

export const encodeImageFileAsURL = (element) => {
    var file = element;
    var reader = new FileReader();
    reader.onloadend = () => {
        return reader.result;
    };
    reader.readAsDataURL(file);
};

export const formatTimestamp = (timestamp) => {
    // Create a Date object from the input timestamp
    const date = new Date(timestamp);

    // Extract the components
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const year = date.getFullYear(); // Get the year

    const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with leading zero if needed
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Get seconds and pad with leading zero

    // Construct the formatted date and time string
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate} ${formattedTime}`;
};

export const Regex = {
    password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
    phoneNumber: '^(?!\\s)\\+?[0-9]+$',
    trackingId: '^[0-9]{12}$',
    idNumber: '^[0-9]{11}$',
    numeric: /^[0-9]+$/,
    floatingDigits: /^(?:\d{1,3}(?:\.\d{1,3})?|\.\d{1,3})$/,
    alphaWithSpace: '^(?! )(?!.*  )[A-Za-z]+( [A-Za-z]+)*(?! )$',
    alphaWithoutSpace: '^[A-Za-z]+(?:[A-Za-z]+)*$',
    alphaNumericWithSpaceAndUnderScoreDash: /^(?! )(?![\d_-]+$)[A-Za-z0-9_-]+( [A-Za-z0-9_-]+)*(?! )$/,
    alphaNumericAndUnderScoreDashWithoutSpace: /^(?! )(?!\d+$)(?![-_]+$)[A-Za-z0-9_-]+(?! )$/,
    alphaNumericAndUnderScoreDashWithSpaceWithNumberOnly: /^(?! )(?!.*\s{2,})(?!.*[_-]{2,})[A-Za-z0-9_-]+( [A-Za-z0-9_-]+)*(?![\s_-])$/
};

export const cmykToHex = (c, m, y, k) => {
    c = c / 100;
    m = m / 100;
    y = y / 100;
    k = k / 100;
    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);

    return rgbHex(r, g, b);
};

export const specificSubtringToUppercase = (string, subString) => {
    return string.replace(subString, function (l) {
        return l.toUpperCase();
    });
};

export const openXmlInNewTab = (base64file) => {
    debugger;
    // Convert base64 to ArrayBuffer

    const dataUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64file}`;
    window.open(dataUrl, '_blank');
    // fetch(`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64file}`)
    //     .then((response) => response.blob())
    //     .then((blob) => {
    //         // Create a URL for the Blob
    //         const blobUrl = URL.createObjectURL(blob);

    //         // Open the URL in a new tab
    //         window.open(blobUrl, '_blank');
    //     })
    //     .catch((error) => console.error('Error opening PDF:', error));
    // // Convert base64 to binary
    // const byteCharacters = atob(base64Pdf);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);

    // // Create a Blob from the bytes
    // const blob = new Blob([byteArray], { type: 'application/pdf' });

    // // Create a URL for the Blob
    // const blobUrl = URL.createObjectURL(blob);

    // // Open the URL in a new tab
    // window.open(blobUrl, '_blank');
};
