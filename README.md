# Wedding Invitation Website

A stunning single-page wedding invitation built with React, Vite, Bun, Tailwind CSS, and Framer Motion.

## Features
- **Hero Section**: Romantic full-viewport background with elegant typography.
- **Our Story**: Animated scroll-triggered storytelling section.
- **Event Details**: Interactive cards for Ceremony and Reception with Google Maps integration.
- **RSVP Form**: Functional form submitting directly to Google Sheets via Google Apps Script.
- **Responsive Design**: Fully mobile-first design with a soft ivory, blush, sage, and gold palette.

## Tech Stack
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Google Sheets & Apps Script Setup

To handle RSVP submissions without a backend, follow these steps:

1. **Create a Google Sheet**:
   - Create a new Google Sheet and name it (e.g., "Wedding RSVPs").
   - Label the first row with columns: `Date`, `Name`, `Email`, `Guests`, `Message`.

2. **Open Apps Script**:
   - In your Google Sheet, go to **Extensions > Apps Script**.

3. **Paste the Script**:
   - Delete any existing code and paste the following:

   ```javascript
   function doPost(e) {
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       const data = JSON.parse(e.postData.contents);
       sheet.appendRow([new Date(), data.name, data.email, data.guests, data.message]);
       
       return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.message }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

4. **Deploy as Web App**:
   - Click **Deploy > New Deployment**.
   - Select type: **Web App**.
   - Description: "Wedding RSVP API".
   - Execute as: **Me**.
   - Who has access: **Anyone** (this is necessary for the form to submit).
   - Click **Deploy** and authorize the permissions.

5. **Get the URL**:
   - Copy the **Web App URL** provided after deployment.

---

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd wedding-invitation
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your Google Apps Script URL:
     ```env
     VITE_GOOGLE_SCRIPT_URL=your_web_app_url_here
     ```

4. **Run the development server**:
   ```bash
   bun dev
   ```

5. **Build for production**:
   ```bash
   bun run build
   ```

## Development
This project was developed with a focus on elegance and performance. 
- Colors and fonts are configured in `src/index.css` via Tailwind 4's `@theme` directive.
- Animations are handled by Framer Motion's `whileInView` and `staggerChildren` props for a smooth experience.

---

Made with ❤️ for Sarah & James.
