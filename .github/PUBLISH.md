Build

```bash
npm run build
```

Update version

```bash
npm version patch --no-git-tag-version
```

or

```bash
npm version minor
```

```bash
git --no-replace-objects commit -m 1.1.0
```

Publish

```bash
npm publish --access public
```