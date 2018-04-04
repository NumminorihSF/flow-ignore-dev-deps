#flow-ignore-dev-deps

This package update .flowconfig's ignore section with actual development dependencies.
It allows to start flow server a bit faster and ignore flow issues in dev deps
(incompatible flow's version for example).

To use it, you need `.flowconfig` and `package-lock.json` files to be exist in your project.

If these files already presents, run next:
```bash
npx flow-ignore-dev-deps
```
