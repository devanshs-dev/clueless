# Clueless – multi-page party game site
Pages: index, games, about, bolo-mat (the live game), daily (solo puzzle), how-to-play, hall (hall of fame), suggest.
Add a game: edit the GAMES list in shared.js. Deploy: see SHIP.md (GitHub + Cloudflare Pages).

## Firebase rules (Realtime Database > Rules, then Publish)
{ "rules": {
  "rooms": { "$room": { ".read": true, ".write": true } },
  "hall": { ".read": true, ".write": true, ".indexOn": ["ts"] },
  "suggestions": { ".read": false, ".write": true }
} }
Read suggestions in Firebase console > Realtime Database > Data.
