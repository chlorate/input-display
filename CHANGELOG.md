# Changelog

## 1.1.0 (unreleased)

- Revamp the config menu. It is now organized into multiple sections instead of a single long list.
- New color picker. This replaces the browser default which had issues like not updating in real time as you select colors and not being available in the OBS browser source.
- Color fields are now more lenient: 3-digit hex values are accepted and `#` is optional.
- The browser back and forward buttons can now be used to navigate within the menu.
- Fix some minor display issues when entering invalid values in numeric and color fields.
- Upgrade internal dependencies.

## 1.0.1 (2019-01-20)

- Add a tooltip that displays axis values with higher precision when hovering over their values in the Controller tab.
- Fix analog stick inaccuracy caused by axes not updating when the controller reports all axis values as zero. ([#9](https://github.com/chlorate/input-display/issues/9))
- Mitigate analog stick inaccuracy caused by abnormal axis values from connecting a controller while the display is active. ([#10](https://github.com/chlorate/input-display/issues/10))

## 1.0.0 (2017-11-14)

- Initial version.
