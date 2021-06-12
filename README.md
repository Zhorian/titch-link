titch-link

Swagger documentation can be found [here](http://localhost:4774/docs) on a locally running instance of the application

To get a titched link simply post to http://localhost:4774/api with a json body containing the url eg :-

```
{
  "url":"google.com"
}
```

A url will be returned that can be used to retrieve the original url
