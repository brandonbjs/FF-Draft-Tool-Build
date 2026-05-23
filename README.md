![Alt Text](https://github.com/dh2225/CS312-Fantasy-Draft/blob/main/public/images/ffdt_banner.png)

# Fantasy Football Draft Tool

A full stack MERN web application for hosting live, in-person 10-team snake 
drafts from a single dashboard. Supports real-time draft order management, 
player filtering, roster tracking, and automatic ADP-based auto-pick when a 
team's timer expires.

Try it out: https://brandonbjs.github.io/FFDT-gh-pages/

---

## Authors
- **Brandon James Shaffer** — [GitHub](https://github.com/brandonbjs) | 
  [LinkedIn](https://www.linkedin.com/in/brandonbjs/) | bjs397@nau.edu
- **Drew J. Heller** — [GitHub](https://github.com/dh2225) | dh2225@nau.edu

---

## Features
- Host a full 10-team snake draft from one dashboard
- Live draft board displaying all picks per team in snake draft order
- Per-team countdown timer — auto-picks top available ADP player on expiration
- Available player list with real-time search, sorting, and pagination
- Smart roster slot logic — players fill correct position slots and flex spots 
  automatically
- Team management console — view any team's current roster sorted by position
- Reset draft functionality — resets all player statuses for a fresh draft
- Dark-themed UI with color-coded team borders (red highlight for picking team)

---

## Migration Notes
This project was originally built as a university course project and hosted 
entirely on an Amazon EC2 instance (MongoDB + Express API). It has since been 
migrated for two key reasons:

1. **Automated ADP data** — the player database is now sourced from the 
   Fantasy Football Calculator API (https://fantasyfootballcalculator.com/api/v1/adp/ppr), 
   replacing a manually maintained static MongoDB collection. ADP data stays 
   current automatically every season with no manual intervention.

2. **Reduced maintenance overhead** — the Express API has been migrated from 
   EC2 to Render (free tier) and MongoDB has been migrated to MongoDB Atlas 
   (free tier), eliminating server maintenance, SSH management, and ~$15/month 
   in hosting costs.

---

## Tech Stack
- **Frontend:** React.js, CSS — deployed on GitHub Pages
- **Backend:** Node.js, Express.js — deployed on Render
- **Database:** MongoDB Atlas (cloud-hosted, free tier)
- **ODM:** Mongoose
- **ADP Data:** Fantasy Football Calculator API (full PPR, auto-updated)
- **Libraries:** react-data-table-component, Axios, CORS

---

## API Endpoints

| Method | Endpoint        | Description                                      |
|--------|-----------------|--------------------------------------------------|
| GET    | /fetchPlayers   | Fetch all available (undrafted) players          |
| GET    | /fetchTeam      | Fetch all players drafted by a specific manager  |
| PUT    | /updatePlayer   | Assign a player to a team, mark as drafted       |
| PUT    | /resetPlayers   | Reset all players to undrafted for a new draft   |
| POST   | /addPlayer      | Add a player (developer/admin use only)          |
| DELETE | /deletePlayer   | Delete a player by ID (developer/admin use only) |

---

## Running Locally
1. Clone the repository
2. Install dependencies in both `/fantasy-draft-api` and `/fantasy-draft-app`:
```bash
   npm install
```
3. Add a `.env` file to `/fantasy-draft-api`:
4. 
