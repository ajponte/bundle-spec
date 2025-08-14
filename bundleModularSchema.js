const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

// Your spec file. This path is a best-practice suggestion but can be modified.
const SCHEMA_API_SOURCE_PATH = 'example/spec/schema/src/main/swagger';
// Spec file main file.
const SCHEMA_API_SOURCE_FILE = '_api.yml';
const SCHEMA_BUNDLE_PATH = 'spec/.bundle'
const SCHEMA_NAME = 'YOUR-SPEC-NAME';
const YAML_EXTENSION = '.yml';
const JSON_EXTENSION = '.json';

/**
 * Bundles the modularized schema into a single YAML and JSON file asynchronously.
 */
async function bundleModularSchema() {
    const schemaRoot = path.join(SCHEMA_API_SOURCE_PATH, SCHEMA_API_SOURCE_FILE);
    const bundleYamlFile = path.join(SCHEMA_BUNDLE_PATH, SCHEMA_NAME.concat(YAML_EXTENSION));
    const bundleJsonFile = path.join(SCHEMA_BUNDLE_PATH, SCHEMA_NAME.concat(JSON_EXTENSION));

    try {
        console.log(`Bundling API schema at: ${schemaRoot}`);

        // Lint the schema before bundling (Async)
        console.log(`Linting API schema at: ${schemaRoot}`);
        await execPromise(`redocly lint ${schemaRoot}`);

        // Bundle the schema into YAML format (Async)
        console.log('Bundling schema into YAML format...');
        await execPromise(`redocly bundle ${schemaRoot} --output ${bundleYamlFile}`);

        // Bundle the schema into JSON format (Async)
        console.log('Bundling schema into JSON format...');
        await execPromise(`redocly bundle ${schemaRoot} --output ${bundleJsonFile}`);

        console.log(`Bundling complete. Output files: ${bundleYamlFile} and ${bundleJsonFile}`);
    } catch (error) {
        console.error('Error running Redocly CLI:', error.message);
        process.exit(1);
    }
}

// Invoking the async function
bundleModularSchema();
