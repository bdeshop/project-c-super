// Utility function to apply theme colors from settings
export const applyThemeColors = (settings) => {
  if (!settings) return;

  const root = document.documentElement;

  // Header styles
  if (settings.header) {
    root.style.setProperty(
      "--header-bg-color",
      settings.header.bgColor || "#001"
    );
    root.style.setProperty(
      "--header-text-color",
      settings.header.textColor || "#ffffff"
    );
    root.style.setProperty(
      "--header-font-size",
      settings.header.fontSize || "16px"
    );
    root.style.setProperty(
      "--logo-width",
      settings.header.logoWidth || "140px"
    );
    root.style.setProperty(
      "--login-button-bg",
      settings.header.loginButtonBg || "#09bda2"
    );
    root.style.setProperty(
      "--login-button-text-color",
      settings.header.loginButtonTextColor || "#ffffff"
    );
    root.style.setProperty(
      "--signup-button-bg",
      settings.header.signupButtonBg || "#09bda2"
    );
    root.style.setProperty(
      "--signup-button-text-color",
      settings.header.signupButtonTextColor || "#ffffff"
    );
  }

  // Web Menu styles
  if (settings.webMenu) {
    root.style.setProperty(
      "--web-menu-bg-color",
      settings.webMenu.bgColor || "#012b2b"
    );
    root.style.setProperty(
      "--web-menu-text-color",
      settings.webMenu.textColor || "#ffffff"
    );
    root.style.setProperty(
      "--web-menu-font-size",
      settings.webMenu.fontSize || "15px"
    );
    root.style.setProperty(
      "--web-menu-hover-color",
      settings.webMenu.hoverColor || "#09bda2"
    );
    root.style.setProperty(
      "--web-menu-active-color",
      settings.webMenu.activeColor || "#01aea1"
    );
  }

  // Mobile Menu styles
  if (settings.mobileMenu) {
    root.style.setProperty(
      "--mobile-menu-bg-color",
      settings.mobileMenu.bgColor || "#012b2b"
    );
    root.style.setProperty(
      "--mobile-menu-text-color",
      settings.mobileMenu.textColor || "#ffffff"
    );
    root.style.setProperty(
      "--mobile-menu-font-size",
      settings.mobileMenu.fontSize || "14px"
    );
    root.style.setProperty(
      "--mobile-menu-login-button-bg",
      settings.mobileMenu.loginButtonBg || "#09bda2"
    );
    root.style.setProperty(
      "--mobile-menu-login-button-text-color",
      settings.mobileMenu.loginButtonTextColor || "#ffffff"
    );
    root.style.setProperty(
      "--mobile-menu-signup-button-bg",
      settings.mobileMenu.signupButtonBg || "#09bda2"
    );
    root.style.setProperty(
      "--mobile-menu-signup-button-text-color",
      settings.mobileMenu.signupButtonTextColor || "#ffffff"
    );
  }

  // Font settings
  if (settings.fontSettings) {
    root.style.setProperty(
      "--global-font-family",
      settings.fontSettings.globalFontFamily || "Poppins, sans-serif"
    );
    root.style.setProperty(
      "--global-text-color",
      settings.fontSettings.globalTextColor || "#ffffff"
    );
    root.style.setProperty(
      "--heading-font-size",
      settings.fontSettings.headingFontSize || "24px"
    );
    root.style.setProperty(
      "--paragraph-font-size",
      settings.fontSettings.paragraphFontSize || "16px"
    );
  }

  // Footer styles
  if (settings.footer) {
    root.style.setProperty(
      "--footer-bg-color",
      settings.footer.bgColor || "#001a1a"
    );
    root.style.setProperty(
      "--footer-text-color",
      settings.footer.textColor || "#cccccc"
    );
    root.style.setProperty(
      "--footer-link-hover-color",
      settings.footer.linkHoverColor || "#09bda2"
    );
  }

  // Custom sections
  if (settings.customSections) {
    if (settings.customSections.topWinners) {
      root.style.setProperty(
        "--top-winners-card-bg-color",
        settings.customSections.topWinners.cardBgColor || "#012b2b"
      );
      root.style.setProperty(
        "--top-winners-card-text-color",
        settings.customSections.topWinners.cardTextColor || "#ffffff"
      );
    }

    if (settings.customSections.upcomingMatches) {
      root.style.setProperty(
        "--upcoming-matches-card-bg-color",
        settings.customSections.upcomingMatches.cardBgColor || "#012b2b"
      );
      root.style.setProperty(
        "--upcoming-matches-border-color",
        settings.customSections.upcomingMatches.borderColor || "#09bda2"
      );
    }
  }

  // Site info
  if (settings.siteInfo) {
    root.style.setProperty("--site-logo", `url(${settings.siteInfo.logo})`);
    // Update favicon dynamically
    const favicon =
      document.querySelector('link[rel="icon"]') ||
      document.querySelector('link[rel="shortcut icon"]');
    if (favicon && settings.siteInfo.favicon) {
      favicon.href = settings.siteInfo.favicon;
    }
  }
};
