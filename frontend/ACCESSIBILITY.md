# Accessibility Guidelines for SignLearn

## Overview
This document outlines the accessibility features and best practices implemented in the SignLearn platform, specifically designed for deaf and mute users.

## Key Accessibility Features

### 1. Video-First Design
- **Large video players** with prominent controls (minimum 56x56px)
- **High contrast video controls** with white/black backgrounds
- **Keyboard shortcuts** for all video operations
- **Fullscreen support** for better viewing
- **Progress indicators** with clear visual feedback

### 2. Icon-Based Navigation
- **Bottom navigation bar** with large icons (80x80px minimum)
- **Clear visual labels** below each icon
- **Active state indicators** with high contrast
- **Touch-friendly** spacing between elements

### 3. Color Contrast
- **WCAG AA compliant** color ratios (minimum 4.5:1 for text)
- **High contrast mode** support via `prefers-contrast: high`
- **Border indicators** for interactive elements
- **Color is never the only indicator** - icons and text accompany colors

### 4. Keyboard Navigation
- **Full keyboard support** for all interactive elements
- **Global shortcuts**:
  - `H` - Home
  - `S` - Signs
  - `C` - Courses
  - `D` - Dashboard
  - `?` - Show keyboard shortcuts
- **Video controls**:
  - `Space/K` - Play/Pause
  - `←/→` - Seek 10 seconds
  - `↑/↓` - Volume control
  - `M` - Mute
  - `F` - Fullscreen
- **Tab order** follows logical flow
- **Focus indicators** are always visible (4px ring)

### 5. ARIA Attributes
- **Semantic HTML** with proper roles
- **ARIA labels** on all interactive elements
- **ARIA live regions** for dynamic content
- **ARIA describedby** for complex interactions
- **Screen reader announcements** for state changes

### 6. Touch Targets
- **Minimum 56x56px** for all interactive elements (WCAG AAA)
- **Large spacing** between clickable areas
- **No hover-only interactions** - all features accessible via touch

### 7. Typography
- **18px base font size** for readability
- **1.75 line height** for comfortable reading
- **Bold headings** for hierarchy
- **High contrast text** (minimum 4.5:1 ratio)

## Component-Specific Features

### AccessibleVideo Component
- Large play/pause button (56x56px minimum)
- High contrast progress bar
- Volume control with visual feedback
- Fullscreen toggle
- Keyboard shortcuts overlay
- ARIA labels for all controls

### IconNavigation Component
- Fixed bottom navigation
- Large icons (4xl size)
- Clear text labels
- Active state indicators
- Touch-friendly spacing

### AccessibleButton Component
- Minimum 56x56px size
- High contrast colors
- Clear focus rings
- Loading states
- Icon support

### AccessibleCard Component
- Keyboard navigable
- High contrast borders
- Clear hover states
- ARIA support

## Testing Checklist

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] No keyboard traps
- [ ] Global shortcuts work

### Screen Readers
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Buttons have descriptive labels
- [ ] Dynamic content is announced
- [ ] Navigation landmarks are used

### Visual
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Text is readable at 200% zoom
- [ ] Focus indicators are visible
- [ ] Icons have text labels
- [ ] No information conveyed by color alone

### Touch
- [ ] All targets are at least 56x56px
- [ ] Spacing between targets is adequate
- [ ] No hover-only interactions
- [ ] Gestures are simple and intuitive

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

