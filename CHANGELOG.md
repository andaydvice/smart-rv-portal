
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Google Maps API key integration (AIzaSyAGKkTg0DlZd7fCJlfkVNqkRkzPjeqKJ2o)
- Ratings and reviews display in map markers for both Google Maps and Mapbox
- Facility count badge on map display
- Enhanced popup content with ratings stars

### Changed
- Updated vite.config.ts configuration for improved dev server stability
- Modified HMR settings for better hot reload performance
- Changed server host to '0.0.0.0' for universal access
- Added clientPort configuration for HMR
- Forced dependency optimization
- Disabled usePolling to prevent file watching issues
- Improved facility popup styling for better readability
- Enhanced marker click handling to be more reliable across previews

### Fixed
- Dev server initialization issues
- HMR connectivity problems
- Project remixing stability issues
- Network interface binding problems
- Map marker visibility and clickability in all preview modes
- Consistent display of facility information between list and map views

### Performance
- Implemented initial performance monitoring
- Enhanced build optimization settings
- Improved dependency handling
