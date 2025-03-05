
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Added Lovable script tag in index.html
- Enhanced Web Vitals monitoring
- Improved date handling in usePersistence.ts
- Added preconnect for fonts in index.html

### Changed
- Updated vite.config.ts configuration for improved build performance
- Modified SWC plugin configuration to fix build errors
- Disabled usePolling to prevent file watching issues
- Improved chunking strategy for better code splitting
- Added stronger typechecking for date objects

### Fixed
- Fixed TypeScript error with Date handling in storage checklist
- Resolved build errors related to missing @swc/plugin-emotion
- Fixed blank preview issue with document visibility
- Improved initialization sequence for faster rendering

### Performance
- Implemented performance optimizations for bundle sizes
- Enhanced critical rendering path with preloads
- Improved dependency handling
- Optimized localStorage operations with retry mechanisms
