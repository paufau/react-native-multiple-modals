#!/bin/bash

PACKAGE_NAME="react-native-multiple-modals"

# Get current dist-tags for the package
TAGS=$(npm dist-tag ls "$PACKAGE_NAME")

# Extract the version associated with the 'nightly' tag
NIGHTLY_VERSION=$(echo "$TAGS" | grep '^nightly:' | awk '{print $2}')

if [ -z "$NIGHTLY_VERSION" ]; then
  echo "❌ 'nightly' tag not found."
  exit 1
fi

echo "🌙 Found version with 'nightly' tag: $NIGHTLY_VERSION"

# Assign the 'latest' tag to the same version
echo "📌 Setting 'latest' tag to this version..."
npm dist-tag add "$PACKAGE_NAME@$NIGHTLY_VERSION" latest

# Remove the 'nightly' tag
echo "🧹 Removing 'nightly' tag..."
npm dist-tag remove "$PACKAGE_NAME" nightly

echo "✅ Done!"