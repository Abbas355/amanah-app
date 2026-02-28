# Design Notes – Channel Details

## Channel Page (Other's Channel)

**Replaced:** "21 Followers | 40 Following"  
**With:** Subscribers • totalViews • videoCount (from backend response)

**Current backend fields shown:**
- `id` – used for routing
- `name` – channel name
- `handle` – @handle
- `description` – channel description
- `avatar` – profile image (shown in card when `showAvatar`)
- `banner` – cover image (shown as top cover)
- `subscribers` – formatted (e.g. 1.5K)
- `totalViews` – formatted (e.g. 100K)
- `videoCount` – number of videos

## Design considerations

1. **Avatar placement:** Avatar appears inside `ChannelDetailsCard` when visiting other’s channel (`showAvatar={true}`). For profile demos (My Channel), the card stays compact without avatar.
2. **Stats layout:** Subscribers, Views, and Videos are shown on one line. On very small screens this might wrap; consider stacking on narrow devices if needed.
3. **Banner fallback:** If `banner` is missing, a placeholder ("رمضان كريم") is shown.
