# Weather & Allergy App
 
A responsive React dashboard that combines real-time weather data with pollen / allergy forecasting. Users can search for any city or grant browser location access, and the app shows a 7-day weather forecast, hourly breakdown, pollen levels by type (tree, grass, weed), a symptom tracker, and a medication reminder. All in a minimalistic light/dark UI.
 
**Live demo:** https://weather-allergy-app-six.vercel.app/
 
---
 
## Features
 
- Current weather: temperature, feels like, high/low, humidity, wind, UV index
- 7-day daily forecast (using Open-Meteo, free/no key required)
- Hourly forecast for the next 18 hours
- Pollen levels by type (tree, grass, weed) with a 7-day trend
- Medication reminder based on current pollen level
- Symptom tracker linked to weather and pollen data
- Sunrise/sunset widget with local time display
- Light/dark mode toggle with custom background support
- Fully responsive desktop three-column layout and a mobile UI
 
---
 
## Prerequisites
 
Requirements:
- [Node.js](https://nodejs.org/) - **18 or higher** recommended 
- npm comes with Node.js
 
Check your versions:
```bash
node -v
npm -v
```
 
---
 
## API Keys
 
The app uses **two data sources**:
 
| API | Key | Used for |
|---|---|---|
| [OpenWeatherMap](https://openweathermap.org/api) | **Yes** (free tier) | Current weather, hourly forecast, city geolocation |
| [Open-Meteo](https://open-meteo.com/) | No | 7-day daily forecast, pollen/air-quality data |
 
### Getting an OpenWeatherMap key
 
1. Sign up at https://openweathermap.org/appid 
2. After registration, go to **API keys** in your account dashboard.
3. Copy your default key (or create a new one).
4. Keys become active within a few minutes to an hour after creation.
 
---
 
## Installation & Setup

### Quick Setup from Submitted Files

If you are receiving only the `src` folder, follow these steps to run the project on your local PC:

#### 1. Install Node.js
First, ensure you have **Node.js 18 or higher** installed on your machine. Download it from [nodejs.org](https://nodejs.org/). Node.js comes with npm, which you'll need for this setup.

Verify installation:
```bash
node -v
npm -v
```

#### 2. Create a new React app
Use Create React App to generate a new project:
```bash
npx create-react-app name-your-app
cd name-your-app
```
Replace `name-your-app` with your desired project name.

#### 3. Replace the src folder
Delete the default `src` folder that was created, then extract and replace it with the `src` folder from the submitted zip file.

#### 4. Install axios
Install the axios package, which is required for API calls:
```bash
npm install axios
```

#### 5. Add environment variable
Create a `.env` file in your project root directory:
```bash
# .env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
```

#### 6. Run the app
Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

---

### Clone the Repository

If you have access to the full repository:

```bash
git clone https://github.com/sukiraex/weather-allergy-app.git
cd weather-allergy-app/weather-app
```
 
### Install dependencies
 
```bash
npm install
```
 
This installs everything listed in `package.json`, including:
- `react` & `react-dom` - UI framework
- `axios` - HTTP client for API calls
- `react-scripts` - Create React App build tool
 
### 3. Create your environment file
 
Create a file called `.env` in the `weather-app/` directory (the same folder as `package.json`):
 
```bash
# weather-app/.env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
```
 
Replace `your_openweathermap_api_key_here` with the key you copied from OpenWeatherMap.
 
> **Never commit your `.env` file.** It is already listed in `.gitignore` by Create React App.
 
---
 
## Running the App
 
### Development server
 
```bash
npm start
```
 
Opens the app at [http://localhost:3000](http://localhost:3000). The browser reloads automatically when you save changes (if enabled in IDE settings).
 
---
 
## Deploying to Vercel
 
The live demo is hosted on Vercel (accessed at https://weather-allergy-app-six.vercel.app/) To deploy your own copy:
 
1. Push your code to a GitHub repository.
2. Go to https://vercel.com and import the repo.
3. Set the **Root Directory** to `weather-app` in the Vercel project settings.
4. Add your environment variable in **Settings > Environment Variables**:
   - Name: `REACT_APP_WEATHER_API_KEY`
   - Value: your OpenWeatherMap key
5. Click **Deploy**.
 
---
 
## Project Structure
 
```
weather-app/
├── public/                  # Static assets (index.html, manifest, robots.txt)
├── build/                   # Production build (generated after npm run build)
├── src/
│   ├── api/
│   │   ├── weatherapi.js    # OpenWeatherMap + Open-Meteo fetch helpers
│   │   └── pollenapi.js     # Open-Meteo air-quality/pollen fetch helpers
│   ├── components/
│   │   ├── header/
│   │   │   ├── LocationBox.jsx      # City search + geolocation
│   │   │   ├── LocalTime.jsx        # Local time for selected city
│   │   │   └── ThemeToggle.jsx      # Light/dark mode toggle
│   │   ├── icons/
│   │   │   ├── PinIcon.jsx          # Location pin icon
│   │   │   └── ThemeIcons.jsx       # Theme toggle icons
│   │   ├── widgets/
│   │   │   ├── WeatherWidget.jsx    # Main weather card display
│   │   │   ├── PollenCard.jsx       # Pollen level card with type breakdown
│   │   │   ├── MedicationReminder.jsx # Medication reminder widget
│   │   │   ├── HumidityWidget.jsx   # Humidity display widget
│   │   │   ├── WindWidget.jsx       # Wind data widget
│   │   │   ├── UVWidget.jsx         # UV index widget
│   │   │   └── SunsetWidget.jsx     # Sunrise/sunset widget
│   │   └── symptomsTracker/
│   │       ├── Symptoms.jsx         # Symptom tracker component
│   │       ├── LogSymptoms.jsx      # Log symptoms form
│   │       └── icons/              # Symptom-related icons
│   ├── hooks/
│   │   ├── useLocation.js   # Geolocation + city search + suggestions
│   │   ├── useWeather.js    # Weather data state management
│   │   ├── usePollen.js     # Pollen data state management
│   │   ├── useLocalTime.js  # Local time for a given timezone offset
│   │   └── useTheme.js      # Light/dark/custom background theme
│   ├── theme/
│   │   ├── colours.js       # CSS variable definitions
│   │   └── symptomtheme.js  # Symptom-to-colour mappings
│   ├── App.js               # Root component — layout and component orchestration
│   ├── App.css              # Main app stylesheet
│   ├── index.js             # React entry point
│   └── index.css            # Global styles
├── .env             # Your local API key (add to .gitignore)
├── package.json
└── README.md                    
 
```
---
 
## Troubleshooting
 
**The app loads but shows no weather data**
- Check that `.env` exists in `weather-app/` and the key name is exactly `REACT_APP_WEATHER_API_KEY`.
- Make sure to restart the development server (npm start) after any changes to .env are made.
- New OpenWeatherMap keys can take up to 1 hour to activate.
 
**"City not found" or geolocation errors**
- Browser geolocation requires HTTPS or `localhost`. It will not work on an `http://` LAN address.
- Allow location permissions if prompted by the browser.
 
**`npm install` fails**
- Make sure you are inside the `weather-app/` subdirectory, not the repo root.
- Try deleting `node_modules/` and `package-lock.json`, then re-running `npm install`.
 
---