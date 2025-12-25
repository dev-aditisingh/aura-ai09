
const CLIENT_ID = "PASTE_YOUR_CLIENT_ID_HERE";
const API_KEY = "PASTE_YOUR_API_KEY_HERE";

const DISCOVERY_DOC = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Load Google API
function gapiLoaded() {
  gapi.load("client", async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
  });
}

// Load Google Identity Services
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: () => {} // ✅ replaced "" with a dummy function
  });
  gisInited = true;
}

// Add event
function addToCalendar() {
  tokenClient.callback = async () => {
    const event = {
      summary: "Aura AI Wellness Check 🌸",
      description: "Mood or journal logged via Aura AI",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: new Date(Date.now() + 3600000).toISOString(),
        timeZone: "Asia/Kolkata",
      },
    };

    await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    alert("Event added to Google Calendar ✨");
  };

  tokenClient.requestAccessToken({ prompt: "consent" });
}
