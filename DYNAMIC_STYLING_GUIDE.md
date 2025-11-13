# Dynamic Styling Implementation Guide

This guide explains how to implement dynamic styling throughout your application using the `siteSettings` data.

## Overview

The application now supports dynamic styling based on the `siteSettings` object received from your API. The settings are automatically applied to CSS variables and can be used in individual components.

## Available Settings

### Site Info

- `siteSettings.siteInfo.logo` - Site logo URL
- `siteSettings.siteInfo.favicon` - Favicon URL

### Header Settings

- `siteSettings.header.bgColor` - Header background color
- `siteSettings.header.textColor` - Header text color
- `siteSettings.header.fontSize` - Header font size
- `siteSettings.header.logoWidth` - Logo width
- `siteSettings.header.loginButtonBg` - Login button background
- `siteSettings.header.loginButtonTextColor` - Login button text color
- `siteSettings.header.signupButtonBg` - Signup button background
- `siteSettings.header.signupButtonTextColor` - Signup button text color

### Web Menu Settings

- `siteSettings.webMenu.bgColor` - Menu background color
- `siteSettings.webMenu.textColor` - Menu text color
- `siteSettings.webMenu.fontSize` - Menu font size
- `siteSettings.webMenu.hoverColor` - Menu hover color
- `siteSettings.webMenu.activeColor` - Active menu item color

### Mobile Menu Settings

- `siteSettings.mobileMenu.bgColor` - Mobile menu background
- `siteSettings.mobileMenu.textColor` - Mobile menu text color
- `siteSettings.mobileMenu.fontSize` - Mobile menu font size
- `siteSettings.mobileMenu.loginButtonBg` - Mobile login button background
- `siteSettings.mobileMenu.loginButtonTextColor` - Mobile login button text color
- `siteSettings.mobileMenu.signupButtonBg` - Mobile signup button background
- `siteSettings.mobileMenu.signupButtonTextColor` - Mobile signup button text color

### Font Settings

- `siteSettings.fontSettings.globalFontFamily` - Global font family
- `siteSettings.fontSettings.globalTextColor` - Global text color
- `siteSettings.fontSettings.headingFontSize` - Heading font size
- `siteSettings.fontSettings.paragraphFontSize` - Paragraph font size

### Footer Settings

- `siteSettings.footer.bgColor` - Footer background color
- `siteSettings.footer.textColor` - Footer text color
- `siteSettings.footer.linkHoverColor` - Footer link hover color

### Custom Sections

- `siteSettings.customSections.topWinners.cardBgColor` - Top winners card background
- `siteSettings.customSections.topWinners.cardTextColor` - Top winners card text color
- `siteSettings.customSections.upcomingMatches.cardBgColor` - Upcoming matches card background
- `siteSettings.customSections.upcomingMatches.borderColor` - Upcoming matches border color

## Implementation Steps

### 1. Access siteSettings in Components

```jsx
import { useOutletContext } from "react-router-dom";

const YourComponent = () => {
  const { siteSettings } = useOutletContext() || {};

  // Extract the styles you need
  const bgColor = siteSettings?.header?.bgColor || "#defaultColor";
  const textColor = siteSettings?.header?.textColor || "#defaultTextColor";

  return (
    <div style={{ backgroundColor: bgColor, color: textColor }}>
      Your content here
    </div>
  );
};
```

### 2. Apply Inline Styles

```jsx
<div
  className="your-classes"
  style={{
    backgroundColor: siteSettings?.header?.bgColor || "#001",
    color: siteSettings?.header?.textColor || "#ffffff",
    fontSize: siteSettings?.header?.fontSize || "16px",
  }}
>
  Content
</div>
```

### 3. Use CSS Variables (Alternative Approach)

The `applyThemeColors` utility function automatically sets CSS variables that you can use:

```css
.your-component {
  background-color: var(--header-bg-color);
  color: var(--header-text-color);
  font-size: var(--header-font-size);
}
```

### 4. Handle Buttons and Interactive Elements

```jsx
<button
  className="px-4 py-2 rounded transition-colors"
  style={{
    backgroundColor: siteSettings?.header?.loginButtonBg || "#09bda2",
    color: siteSettings?.header?.loginButtonTextColor || "#ffffff",
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor =
      siteSettings?.webMenu?.hoverColor || "#0a9488";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor =
      siteSettings?.header?.loginButtonBg || "#09bda2";
  }}
>
  Button Text
</button>
```

## Components Already Updated

1. **MainLayout.jsx** - Fetches and applies site settings
2. **Header.jsx** - Passes settings to child components
3. **TopHeader.jsx** - Dynamic header styling
4. **LargeNavbar.jsx** - Dynamic navigation menu styling
5. **Footer.jsx** - Dynamic footer styling
6. **UpcomingMatch.jsx** - Dynamic card styling
7. **settings.js** - Utility function for applying theme colors

## Components That Need Updates

To complete the dynamic styling implementation, update these components:

### High Priority

- `src/components/Header/Smallbars.jsx` - Mobile navigation
- `src/components/Header/BottomNavbarTwo.jsx` - Bottom navigation
- `src/components/Home/HomeTabs.jsx` - Home page tabs
- `src/components/Home/Referral/Referral.jsx` - Referral section
- `src/components/Home/HomeTabsLarger/MainTabs.jsx` - Main tabs

### Medium Priority

- All components in `src/components/Home/` folder
- `src/components/Promotion/` components
- `src/components/MainProfile/` components

### Low Priority

- Game-specific components (Cricket, Slots, etc.)
- Modal components
- Form components

## Best Practices

1. **Always provide fallback values** when accessing siteSettings
2. **Use optional chaining** (`?.`) to prevent errors
3. **Extract commonly used colors** into variables at the component level
4. **Test with different color combinations** to ensure readability
5. **Consider accessibility** when applying dynamic colors
6. **Use semantic color names** in your fallbacks

## Example Implementation

See `src/components/DynamicStyleExample.jsx` for a complete example of how to implement dynamic styling in a component.

## Testing

To test the dynamic styling:

1. Check the browser console for the siteSettings object
2. Modify the API response to test different color combinations
3. Ensure all components gracefully handle missing settings
4. Test on different screen sizes for responsive behavior

## Troubleshooting

- If styles aren't applying, check that `siteSettings` is being passed correctly through the component tree
- Ensure the `applyThemeColors` function is being called in MainLayout
- Check browser developer tools to see if CSS variables are being set
- Verify that fallback colors are appropriate for your design
