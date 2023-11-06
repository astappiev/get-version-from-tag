# Get version from tag

Get version number from GitHub release tag which can
be used for e.g., versioning packages of your solution.

## Usage

Here's example full Release YAML you can use:

Inputs:

| Param name | Description                                                                                                                                    | Default value |
|------------|------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `format`   | Format to apply to the version tag.<br/>Possible values:<br/>- **tomcat**: adds paddings to each section of a tag, e.g. `1.2.3 => 001.002.003` | *empty*       |

```yml
name: Release

on:
  release:
    types:
      - edited
      - released

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - id: get_version
        name: Get version
        uses: astappiev/get-version-from-tag@v1

      - name: Display version
        run: |
          VERSION=$(echo "${{ steps.get_version.outputs.version }}")
          echo $VERSION
```

If you then create new GitHub Release with tag `v0.0.1-demo.1`
then above `get_version` will provide output value in `version`
which you can use in follow-up actions. Task will remove prefix `v`
if one is provided in the tag name.

Examples tag names and outputs:

| Tag name         | Version output  |
|------------------|-----------------|
| v1.2.3           | 1.2.3           |
| 2.3.4            | 2.3.4           |
| v0.0.1-preview.1 | 0.0.1-preview.1 |
