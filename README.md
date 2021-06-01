# snoopchat-backend

BDD

`cd docker`
`sudo docker-compose up`
`npx prisma migrate dev`

START

`yarn` || `nodemon`

ARCHITECTURE

* contain:
 
`/backend/prisma :~` -> migrations, prisma.schema

`/backend/src :~` -> helpers, middlewares, routes, main.ts, server.ts

`/backend/src/helpers :~` -> buisiness logic

`/backend/src/helpers :~` -> all middlewares 

`/backend/src/helpers :~` -> all routing system

`/backend/src/main.ts :~` -> middlewares init
