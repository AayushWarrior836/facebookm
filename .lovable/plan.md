

# ConnectBook — Facebook-Style Social Feed App

## Part 1: Splash Screen
- Full-screen splash with `#f0f2f5` background
- Centered blue circle (`#1877f2`) with white "f" letter
- Fade + pulse animation
- "from" text and Meta-style branding at the bottom
- Auto-transitions to the main app after 1 second

## Part 2: Home Feed — 3-Column Layout

### Sticky Top Navbar
- **ConnectBook** logo (left)
- Search bar (center)
- Home icon, Profile icon, Notifications dropdown, Dark mode toggle (right)

### Left Sidebar
- User profile card (photo + name — using the uploaded image as the main user's profile photo)
- Navigation links: Friends, Messages, Saved, Groups

### Main Feed Area — 10 Diverse Post Types
All posts use realistic dummy JSON data and include: profile image, name, timestamp, animated like button with counter, expandable comments, share button, rounded card design with shadow and hover effects.

1. **Text-only post** — motivational/tech quote
2. **Single image post** — photo with caption
3. **Multi-image grid post** — 2–4 images in responsive grid
4. **Video-style post** — thumbnail with play button overlay (visual only)
5. **Poll post** — question with options and vote percentages (frontend-only interaction)
6. **Life update post** — milestone announcement
7. **Shared link preview** — preview image, title, description, site name
8. **Friend activity post** — "X updated their profile picture"
9. **Location check-in post** — "X is at Y location"
10. **Memory/throwback post** — "1 year ago today…"

New posts created via a "Create Post" box appear at the top of the feed using frontend state.

### Right Sidebar
- Online contacts list with green status dots
- Trending topics section
- Suggested friends widget

### Additional Details
- Dark mode support via the navbar toggle
- All data is frontend-only (no backend needed) using hardcoded dummy JSON
- Smooth animations and hover effects throughout
- Fully responsive layout

