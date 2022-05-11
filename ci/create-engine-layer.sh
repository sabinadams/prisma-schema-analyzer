echo "Clearing out old layer..."
rm -rf .engine-layer

echo "Creating Engine Layer..."
mkdir -p .engine-layer/nodejs/@prisma

echo "Installing openssl Engine..."
rm -R node_modules/@prisma
PRISMA_CLI_BINARY_TARGETS=darwin,rhel-openssl-1.0.x npm install -f 

echo "Copying over @prisma and .prisma to the layer"
cp -r node_modules/@prisma .engine-layer/nodejs

echo "Layer Built"