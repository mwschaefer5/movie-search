# MovieSearch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.

## Development Notes
I initially planned to do this as a more common client/server project with the remote api calls passing through the server but ended up running out of time so I ended up only doing a client implementation. This saved time in not having to set up CORs or other server side settings.

This was the first time I used Angular's new control flows. While the pattern is familiar to me, the syntax was certainly new and took a little bit of getting used to. It doesn't help that my IDE really doesn't understand what's going on there in the html files and this impeded the syntax aware coloring and the like.

Before starting, I did intend to use signals as well but during my implementation this didn't even cross my mind and by the time I realized I was using observables everywhere, I again didn't feel like I had enough time to fully convert and test using signals in some places.

The part I'm most proud about in this application would be the way I'm preventing movie details from being fetched multiple times in a session by storing them in service. I think this shows the mindset I on preventing making unnecessary calls back and forth which provides a better experience for the user and helps the load on the API server itself.

If I had more time... I'd do a lot of things. First I'd add defer control logic to the main search page as it's not fully functional until the genres load in remotely. Secondly, I'd probably do call to get details on each of the individual movies returned from the search results in order to populate more of their information on the search results themselves such as duration, which doesn't come back from the search call. I believe this is a restriction from using the REST API instead of GraphQL as I'm limited in what the REST endpoint will return. Additionally, there's quite a bit of code cleanup and maintenance tasks, such as unsubscribing from observables or using async pipe in some places and unit tests.  I think search is getting called multiple times due to the paginator implementation and so on.

## Running the Application
Website: https://sea-turtle-app-jrnkm.ondigitalocean.app/


