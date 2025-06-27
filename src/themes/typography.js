/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 */

export default function themeTypography(theme) {
    return {
        fontFamily: theme?.customization?.fontFamily,
        h7: {
            fontSize: '1.1rem',
            color: theme.heading,
            fontWeight: 600
        },
        h6: {
            fontSize: '0.75rem',
            fontWeight: 500,
            color: theme.heading
        },
        h5: {
            fontSize: '0.875rem',
            color: theme.heading,
            fontWeight: 500
        },
        h4: {
            fontSize: '1rem',
            color: theme.heading,
            fontWeight: 600
        },
        h3: {
            fontSize: '1.25rem',
            color: theme.heading,
            fontWeight: 600
        },
        h2: {
            fontSize: '1.5rem',
            color: theme.heading,
            fontWeight: 700
        },
        h1: {
            fontSize: '2.125rem',
            color: theme.heading,
            fontWeight: 700
        },
        formh6: {
            fontSize: '0.7rem',
            fontWeight: 500,
            color: theme.colors.formHeader6
        },
        formh7: {
            fontSize: '10px',
            fontWeight: 400,
            color: '#878A8D'
        },
        subtitle1: {
            fontSize: '0.975rem',
            fontWeight: 500,
            color: theme.textDark
        },
        subtitle1Large: {
            fontSize: '1rem',
            fontWeight: 600,
            color: theme.textDark
        },
        subHeader: {
            fontSize: '0.89rem',
            fontWeight: 500,
            color: theme.textDark
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 400,
            color: theme.darkTextSecondary
        },
        subtitle3: {
            fontSize: '18px',
            fontWeight: 500,
            color: theme.colors.subtitle3
        },
        formHeader6: {
            fontSize: '13px',
            fontWeight: 500,
            color: theme.colors.formHeader6
        },
        caption: {
            fontSize: '0.75rem',
            color: theme.darkTextSecondary,
            fontWeight: 400
        },
        body1: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.334em'
        },
        body2: {
            letterSpacing: '0em',
            fontWeight: 400,
            lineHeight: '1.5em',
            color: theme.darkTextPrimary
        },
        menuItem1: {
            fontSize: '1rem',
            color: theme.heading,
            fontWeight: 500
        },
        menuItem2: {
            fontSize: '1rem',
            color: theme.heading,
            fontWeight: 500
        },
        listItemHeader: {
            fontSize: '1.2rem',
            fontWeight: 500,
            color: '#333537'
        },
        listItemSubHeader: {
            fontSize: '1rem',
            fontWeight: 500,
            color: '#333537'
        },
        submMenuItem: {
            fontSize: '0.9rem',
            color: theme.heading,
            fontWeight: 400
        },
        filterItemTitle: {
            fontSize: '1rem',
            color: theme.darkTextPrimary,
            fontWeight: 500
        },
        messageBoxText: {
            fontSize: '1rem',
            color: theme.darkTextSecondary,
            fontWeight: 400
        },
        button: {
            textTransform: 'capitalize'
        },
        customInput: {
            marginTop: 1,
            marginBottom: 1,
            '& > label': {
                top: 23,
                left: 0,
                color: theme.grey500,
                '&[data-shrink="false"]': {
                    top: 5
                }
            },
            '& > div > input': {
                padding: '30.5px 14px 11.5px !important'
            },
            '& legend': {
                display: 'none'
            },
            '& fieldset': {
                top: 0
            }
        },
        mainContent: {
            backgroundColor: theme.background,
            width: '100%',
            minHeight: 'calc(100vh - 88px)',
            flexGrow: 1,
            padding: '20px',
            marginTop: '88px',
            marginRight: '20px',
            borderRadius: `${theme?.customization?.borderRadius}px`
        },
        menuCaption: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: theme.heading,
            padding: '6px',
            textTransform: 'capitalize',
            marginTop: '10px'
        },
        subMenuCaption: {
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: theme.darkTextSecondary,
            textTransform: 'capitalize'
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '8px'
        },
        smallAvatar: {
            width: '22px',
            height: '22px',
            fontSize: '1rem'
        },
        mediumAvatar: {
            width: '34px',
            height: '34px',
            fontSize: '1.2rem'
        },
        largeAvatar: {
            width: '44px',
            height: '44px',
            fontSize: '1.5rem'
        }
    };
}
