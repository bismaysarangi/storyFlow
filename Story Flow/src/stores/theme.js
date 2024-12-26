import { writable } from 'svelte/store';

// Get initial theme from localStorage or default to 'light'
const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('theme') || 'light';
    }
    return 'light';
};

// Create the theme store
export const theme = writable(getInitialTheme());

// Subscribe to changes and update localStorage and document class
if (typeof window !== 'undefined') {
    theme.subscribe(value => {
        localStorage.setItem('theme', value);
        if (value === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
}