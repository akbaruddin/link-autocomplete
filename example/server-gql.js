const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    search(searchString: String): [SearchItem]
  }

  type SearchItem {
    id: ID
    href: String
    name: String
    description: String
  }
`);

const root = {
  search: ({ searchString = '' }) => {
    return [
      {
        href:
          `https://codex.so/` +
          `${searchString} first search item`.replace(/([^a-zA-Z0-9])/g, '-'),
        name: `${searchString} first search item`,
        description: 'Desc for the first item',
        id: '873acc61-73de-40cb-b430-e20da97a6b2e',
      },
      {
        href:
          `https://codex.so/` +
          `${searchString} another one search item`.replace(
            /([^a-zA-Z0-9])/g,
            '-'
          ),
        name: `${searchString} another one search item`,
        description: 'Desc for the second item',
        id: '873acc61-73de-40cb-b430-e20da97a6b2e',
      },
      {
        href:
          `https://codex.so/` +
          `${searchString} third item`.replace(/([^a-zA-Z0-9])/g, '-'),
        name: `${searchString} third item`,
        description: 'Desc for the third item',
        id: '873acc61-73de-40cb-b430-e20da97a6b2e',
      },
    ];
  },
};

const app = express();

app.use('/graphql', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});
