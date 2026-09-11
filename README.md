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
You can test the website here: https://stb-logger-admin-site.onrender.com

Please be patient, it's pretty slow. GPX processing takes about 1.5 mins.

You have some demo zip fies that contain real lines' GPX files which you can use to create new lines. They are located in the /demo folder.

## AI Usage
I used AI for debugging and sometimes for giving me ideas on how to implement something.

## Screenshots
<img width="1507" height="826" alt="Screenshot 2026-09-11 at 22 06 17" src="https://github.com/user-attachments/assets/57052e19-00f3-4c9c-8366-eaee914df68b" />
<img width="1510" height="826" alt="Screenshot 2026-09-11 at 22 06 29" src="https://github.com/user-attachments/assets/5bd62c5d-8091-4240-97c8-c2a988cadd8c" />
<img width="1512" height="824" alt="Screenshot 2026-09-11 at 22 06 39" src="https://github.com/user-attachments/assets/e81af966-5eed-40c9-864f-1dc5df569357" />
<img width="1512" height="823" alt="Screenshot 2026-09-11 at 22 07 22" src="https://github.com/user-attachments/assets/0c6bc7af-55b8-4e43-b352-bec343f17b6d" />
