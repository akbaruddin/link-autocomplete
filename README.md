# Link Autocomplete

An upgraded version of base inline link tool with your server's search.

![sample](example/assets/example.png)

## Installation

### Install via NPM

Get the package

```shell
npm i --save link-autocomplete-gql
```

```shell
yarn add link-autocomplete-gql
```

### Load from CDN

You can use package from jsDelivr CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/link-autocomplete-gql/dist/link-autocomplete.js"></script>
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
 
  /**
   * Tools list
   */
  tools: {
    link: {
      class: LinkAutocomplete,
      config: {
        endpoint: 'http://localhost:4000/graphql',
        graphQL: true,
        graphQLQuery: `query Search($searchString: String){ search(searchString: $searchString) { id name href description } }`,
        graphQLVariables: (search) => ({ searchString: search }),
        graphQLItems: ({ data }) => data.search
      }
    }
  },
  
  ...
});
```

## Config Params

Search requests will be sent to the server by `GET` requests with a search string as a query param. 

List of server connection params which may be configured.

`endpoint` — URL of the server's endpoint for getting suggestions.

`queryParam` — param name to be sent with the search string.

If there is no `endpoint` then tool will work only for pasted links.

## Server response data format

For endpoint requests server **should** answer with a JSON containing following properties:

- `success` (`boolean`) — state of processing: `true` or `false`  
- `items` (`{name: string, href: string, description?: string}`) — an array of found items. Each item *must* contain `name` and `href` params. The `description`
param is optional. You can also return any other fields which will be stored in a link dataset.

Content-Type: `application/json`.

```json
{
  "items": [
    {
      "href": "https://codex.so/editor",
      "name": "The first item",
      "description": ""
    },
    {
      "href": "https://codex.so/media",
      "name": "The second item",
      "description": ""
    }
  ]
}
```

## Output data

Marked text will be wrapped with a `a` tag as a usual link.

Additional data will be store in element's dataset: `data-name`, `data-description` and other custom fields.

```json
{
    "type" : "text",
    "data" : {
        "text" : "Create a directory for your module, enter it and run <a href=\"https://codex.so/\" data-name=\"CodeX Site\">npm init</a> command."
    }
}
```

## Shortcut

By default, shortcut `CMD (CTRL) + K` is used for pasting links as usual.

## Support maintenance 🎖

If you're using this tool and editor.js in your business, please consider supporting their maintenance and evolution.

[http://opencollective.com/editorjs](http://opencollective.com/editorjs)
