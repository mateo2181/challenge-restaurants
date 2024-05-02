## Description

This is a challenge where we show restaurants consuming and API Rest. It was implemented with:
- Next 14
- TailwindCSS
- React Context
- Google Maps API

## Setup

1. Create a `.env` file using the `.env.example` and update the NEXT_PUBLIC_GOOGLE_MAP_API.

2. Install the dependencies: ```npm install```

3. Run the development server: ```npm run dev```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Pending
- Use refresh token when the token expires. Do it with an axios interceptor.
- Unit and end to end tests.
- Pagination in restaurants list using infinite scrolling.
- Edit and Delete restaurants.
- Update cards in `/restaurants` page to match the design.