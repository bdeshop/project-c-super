# Site Settings Store

This store manages the site settings using Zustand with persistence.

## Usage

### In Components

```jsx
import useSiteSettingsStore from '../store/siteSettingsStore';

const MyComponent = () => {
  const { siteSettings, setSiteSettings } = useSiteSettingsStore();
  
  // Access settings
  if (siteSettings) {
    console.log(siteSettings);
  }
  
  // Update settings
  const updateSettings = (newSettings) => {
    setSiteSettings(newSettings);
  };
  
  return (
    // Your component JSX
  );
};
```

### In Actions/Functions

```jsx
import useSiteSettingsStore from '../store/siteSettingsStore';

// Get current settings
const getCurrentSettings = () => {
  const { getSiteSettings } = useSiteSettingsStore.getState();
  return getSiteSettings();
};

// Set new settings
const updateSettings = (newSettings) => {
  const { setSiteSettings } = useSiteSettingsStore.getState();
  setSiteSettings(newSettings);
};
```

## Features

- **Persistence**: Settings are automatically persisted to localStorage
- **Theme Application**: Theme colors are automatically applied when settings change
- **Global Access**: Access settings from anywhere in the application

## Structure

The store contains:
- `siteSettings`: The current site settings object
- `setSiteSettings(settings)`: Function to update settings
- `getSiteSettings()`: Function to retrieve settings

## Example Implementation

See `src/components/Header/SiteSettingsExample.jsx` for a working example of how to use this store in a component.