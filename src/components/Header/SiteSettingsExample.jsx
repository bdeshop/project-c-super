import useSiteSettingsStore from '../../store/siteSettingsStore';

const SiteSettingsExample = () => {
  const { siteSettings, setSiteSettings } = useSiteSettingsStore();

  if (!siteSettings) {
    return <div>Loading site settings...</div>;
  }

  const updateSiteName = () => {
    setSiteSettings({
      ...siteSettings,
      siteName: 'Updated Site Name'
    });
  };

  return (
    <div>
      <h3>Site Settings</h3>
      <p>Site Name: {siteSettings.siteName || 'Not set'}</p>
      <p>Theme: {siteSettings.theme ? 'Loaded' : 'Not set'}</p>
      <button onClick={updateSiteName}>Update Site Name</button>
      <pre>{JSON.stringify(siteSettings, null, 2)}</pre>
      {/* Add more settings as needed */}
    </div>
  );
};

export default SiteSettingsExample;