# bundle-spec
A nodejs utility to bundle a modular OpenAPI spec into a single file.

## Modular spec
Any spec can be maintained in a modular way.
What this means in practice is that all API routes can be declared in `_api.yml` and parts can be referenced via anchors.
e.g.
```
spec/schema/src/main/swagger
├── _api.yml
└── paths
    └── v1
        ├── ApiRequestGet.yml
        ├── ApiRequestOtherPut.yml
        ├── ...
```

To visualize the schema, you can build the bundle (see `./bundle.sh`),
and copied the compiled output to https://editor.swagger.io/

### Redocly
This project uses Redocly's NVM package as a utility for bundling the spec.
For more information on Redocly, see https://redocly.com/

### OperationId
Every path corresponds with an `operationId`
e.g.
```
operationId: "<src.method>"
```
where `<src.method>` is the method to bind to the API such that `src.method` is a valid path.


## API SPEC TOOLS

### Requirements
* `Node > v23.7.0`

### Bundle API Spec
#### NVM
This project uses `nvm` package management. The following commands will assume a node environment
whose node verision is defined from values in `.nvmrc`

```shell
    nvm install
    nvm use
```

##### Building the Example
By default, the spec will be placed in `spec/.bundle/` with default artifact names.
See the following to track a better way at handling the parameters: https://github.com/ajponte/bundle-spec/issues/1

when `bundle.sh` is invoked, a `<EXAMPLE>.yml` and `<EXAMPLE>.json` will be built.

#### Importing into a Python backend
  * This single file can be consumed by connexion `3`.

Example
```
# Initialize the Connexion app
connexion_app = connexion.FlaskApp(SERVICE_NAME, specification_dir=os.path.dirname('packagename.json'))
```

#### Importing into a TS frontend
To be compatible with a JS/TS API Client, you may have to update `operationId` in the API Spec and regenerate the bundleModularSchema.
  * the spec can be consumed by `openapi-generator-cli `

Example: 
```
npx @openapitools/openapi-generator-cli generate -i packagename.json -g typescript-axios -o ./api-client
```
