
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added Lovable script tag for enabling new features like Select and Pick
- Enhanced Mapbox integration with proper marker implementation
- Initial CHANGELOG.md creation
- Performance monitoring setup
- Enhanced console logging for debugging
- Added preconnect for critical resources
- Updated to the latest Lovable version

### Changed
- Updated vite.config.ts configuration for improved dev server stability
- Modified HMR settings for better hot reload performance
- Changed server host to '0.0.0.0' for universal access
- Added clientPort configuration for HMR
- Forced dependency optimization
- Disabled usePolling to prevent file watching issues
- Improved HTML structure for better performance

### Fixed
- Dev server initialization issues
- HMR connectivity problems
- Project remixing stability issues
- Network interface binding problems
- Mapbox marker visibility issues 

### Performance
- Implemented initial performance monitoring
- Enhanced build optimization settings
- Improved dependency handling
- Added resource hints for faster loading
