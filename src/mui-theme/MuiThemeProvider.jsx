import React, { useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MuiThemeOptions } from "./_muiTheme";

const MuiThemeProvider = ({ children }) => {
    const themeOptions = useMemo(() => {
        return MuiThemeOptions("light");
    }, []);

    const theme = createTheme(themeOptions);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default MuiThemeProvider;