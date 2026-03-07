

## Kinetic Stomp Word Animator

### Overview
A single-page tool where you upload a music track, type in your words, and watch them animate on-screen synced to the beat — kinetic typography / stomp style. No accounts needed.

### Pages & Flow

**Single Page App** with three sections:

1. **Upload & Setup Panel**
   - Drag-and-drop or click to upload an audio file (MP3, WAV, etc.)
   - Text area to type/paste your words (one per line or comma-separated)
   - Beat sensitivity slider to fine-tune detection threshold

2. **Beat Detection & Word Mapping**
   - Uses the Web Audio API to analyze the audio waveform and detect beats/onsets in the browser
   - Each detected beat timestamp gets mapped to the next word in your list
   - Visual timeline showing beat markers — you can click a marker to reassign or skip a word
   - Add/remove/reorder words, adjust which beat each word lands on

3. **Live Preview Player**
   - Full-screen-style dark canvas area
   - Play/pause controls synced to the audio
   - Words slam onto screen at each beat with kinetic stomp animations: random positions, bold fonts, scale-in with shake, rotation, color variety
   - Words stack/overlap as the track plays, creating the classic kinetic stomp collage effect
   - Style controls: choose font size range, color palette (neon, monochrome, warm, etc.), animation intensity

### Design
- Dark background (black or very dark gray) for the preview — makes the colorful words pop
- Clean sidebar or top panel for controls
- Bold, impactful typography for the animated words
- Responsive layout but optimized for desktop use

### Technical Approach
- Web Audio API for beat detection (analyzing frequency/amplitude peaks)
- Canvas or DOM-based animation using CSS transforms and keyframes for the stomp effects
- All processing happens in-browser — no backend needed
- Audio playback synced with requestAnimationFrame for precise timing

