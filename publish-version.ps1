param([string]$version)

node ./update-version.cjs $version
git add .
git commit -m "$version"
git push
git checkout release
git merge dev
pnpm publish-all
git push
git checkout dev
