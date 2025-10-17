import React, { createContext, useEffect } from 'react';

// Create the ThemeContext
const ThemeContext = createContext();

// Create a ThemeProvider component - Dark theme only
export const ThemeProvider = ({ children }) => {
    // Always use dark theme
    const theme = 'dark';

    // Apply dark theme to document elements
    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        // Set data attribute for CSS targeting
        root.setAttribute('data-theme', 'dark');
        body.setAttribute('data-theme', 'dark');

        // Add theme class to body
        body.className = 'dark-theme';

        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', '#0f172a');
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = '#0f172a';
            document.getElementsByTagName('head')[0].appendChild(meta);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{
            theme: 'dark',
            isDark: true,
            isLight: false
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;