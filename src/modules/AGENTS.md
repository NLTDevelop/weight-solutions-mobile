# Assets

Download icons in format svg, convert to react component (react-native-svg), and add to folder ./src/assets/icons and follow style examples in this folder

# Imports

Use alias @ for imports

# UIKit component

Use NLTEmptyListView (./src/UIKit/NLTEmptyListView) components for empty states. 
Use Typography (./src/UIKit/Typography) for rendering text instead of standard component Text.
Do not add styles to Typography, use props variant instead
Use UIKit instead writing new component

# Components

Use keyExtractor for FlatList in functions renderItem and keyExtractor
Add pull to refresh in FlatList
If FlatList uses pagination need props `onEndReached` to fetch next page

# Localization

**ALWAYS** Add localization and use `t` for texts: `const { t } = useUiContext();`

# Folder structure in module

Each module should follow this structure:

```text
modules/
    Products/ 
        components/
            CompanyListItem/
                index.tsx
                styles.ts
        presenters/
            useProducts.ts
        index.tsx
        styles.ts
    Product/
        ...
    CreateProduct/
        ...
```

- each module have folders with screens
- each screen in module must have index and styles file and folder `presenters`
- screen can contain a `components` folder for reusable components inside the module
- all presentation logic must be moved to presenters