# STB Logger Admin Site

## What is this?
A website to more easily input and manage public transport lines' routes and map representations for use in my Android app, STB Logger. Users can create lines by uploading a zip with GPX files representing the route the bus takes between every two stops.

# Why?
The old method of doing this was painful and time-consuming (using a console application I wrote, LineJSONFormatter) and I was tired of doing it like that. Also, it was very hard to make small changes if, for example, a line was temporarily deviated.

##Hosting it locally

To host the website yourself, clone the repo. Then, create a file named ".env.local" in the project's root folder and assign values to the following variables:
```
FIREBASE_API_KEY,
FIREBASE_AUTH_DOMAIN,
FIREBASE_DATABASE_URL,
FIREBASE_PROJECT_ID,
FIREBASE_STORAGE_BUCKET,
FIREBASE_MESSAGING_SENDER_ID,
FIREBASE_APP_ID,
FIREBASE_MEASUREMENT_ID,
NEXT_PUBLIC_MAPBOX_TOKEN
```
After that, install pnpm and run the following command to install all dependencies:
```
pnpm install
```
To start the server, run:
```
pnpm dev
```

## Demo
You can test the website here: https://stb-logger-admin-site.vercel.app

## AI Usage
I used AI for debugging and sometimes for giving me ideas on how to implement something.

## Screenshots
