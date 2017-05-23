#!/bin/bash

EXTENSION_NAME="dpi-switcher@alexei.ivanovski.gmail.com"
EXTENSIONS_DIRECTORY_PATH="$HOME/.local/share/gnome-shell/extensions"

current_direcotry_name=${PWD##*/}
if [ ! -d "$EXTENSION_NAME" ]; then
	echo "ERROR: script is running not from extension direcotry."
	echo "Please make 'cd' to extension directory and than launch this script."
	exit 1
fi

# check if extensions directory exists
if [ ! -d "$EXTENSIONS_DIRECTORY_PATH" ]; then
	echo "ERROR: cant find extensions directory"
	exit 1
fi

# compile schemas
# rm -f "$EXTENSION_NAME/schemas/*.compiled"
glib-compile-schemas "$EXTENSION_NAME/schemas"

# copy extension files to extensions directory
destination="$EXTENSIONS_DIRECTORY_PATH/$EXTENSION_NAME"
schema_directory="$destination/schemas"
icons_directory="$destination/icons"

rm -rf "$destination"

mkdir -p "$destination"
mkdir -p "$schema_directory"
mkdir -p "$icons_directory"

find "$EXTENSION_NAME" -name "*.js" -exec cp {} "$destination/" \;
find "$EXTENSION_NAME" -name "*.css" -exec cp {} "$destination/" \;

cp "$EXTENSION_NAME/metadata.json" "$destination/metadata.json"
cp "$EXTENSION_NAME/schemas/gschemas.compiled" "$destination/schemas/gschemas.compiled"
cp -r "$EXTENSION_NAME/icons" "$destination"