import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig.ts';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const msalInstance = new PublicClientApplication(msalConfig);
const accounts = msalInstance.getAllAccounts();
const activeAccount = msalInstance.getActiveAccount();

if (!activeAccount && accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]); // Ensure proper account selection
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event: any) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload?.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
    }
});

const root = createRoot(document.getElementById('root'));
root.render(
    <App instance={msalInstance}/>
);