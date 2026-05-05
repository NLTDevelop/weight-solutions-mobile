# Skill: create-new-module

Goal:
Create a new module for the mobile application according to this project architecture rules.

This skill must follow `AGENTS.md` and the local module conventions already used in `src/modules`.
If legacy code conflicts with `AGENTS.md`, new code should follow `AGENTS.md`.

## 1. First check before generation

Before creating files:

1. Check existing module structure near the target feature in `src/modules`
2. Define screen names and reusable local components
3. Define which logic belongs to presenters

If API contract is unclear:
- ask for request and response fields first

## 2. Preferred module structure

For new modules, use this target structure:

```text
src/
    entities/
        Product/
            dto/
            IProduct.ts
            IProductsMeta.ts
            IProductsModel.ts
            IProductsService.ts
    modules/
        components/
        Products/
            presenters/
            components/
            index.tsx
            styles.ts
        Product/
            presenters/
            components/
            index.tsx
            styles.ts
        CreateProduct/
            presenters/
            components/
            index.tsx
            styles.ts
```

Notes:
- shared reusable module components go to `./src/<ModuleName>/components`
- components used only by one screen go to that screen `components/` folder
- do not create `components/.../components/...`

## 3. Entity layer rules

When a new business entity is needed:

1. Create request dto files in `src/entities/<Entity>/dto/`
2. Create entity interfaces
3. Create model as data container only
4. Create service for requests and business operations

Rules:
- models must not contain business logic
- models must not contain handlers
- models must not contain transformation logic
- only pagination append method `append` and clean `clean` is allowed in models

## 4. Presenter rules

All logic must live in presenters.

Presenter responsibilities:
- navigation
- handlers
- loading and refresh logic
- data preparation for UI
- derived business logic
- animation logic

Recommended split:
- `use<ScreenName>.ts` for screen behavior and actions

Rules:
- use naming with `on`, not `handle`
- shared exported types must not stay inside presenter files
- local props interface inside presenter must be named `IProps`
- do not use `switch`
- use `if / else`

## 5. UI component rules

Component responsibility is rendering only.

A component must:
- receive prepared data
- receive prepared handlers
- render UI
- call `useUiContext()` inside the component only
- create themed styles with `useMemo(() => getStyles(colors), [colors])`

A component must not:
- contain business logic
- contain data transformation
- contain calculations for prepared UI values
- contain animation logic
- contain inline handlers in JSX
- contain extra wrapper arrow functions for events
- contain `useCallback`
- contain `useMemo` for anything except styles

Correct examples:

```tsx
<Button onPress={onPressCreate} />
<Input onChangeText={onChangeName} />
```

Incorrect examples:

```tsx
<Button onPress={() => onPressCreate()} />
<Input onChangeText={(value) => onChangeName(value)} />
```

## 6. Render function rules

Render functions are exceptions only.

Allowed:
- `renderItem`
- `renderLeftActions`
- `renderRightActions`
- other render callbacks only when required by library API

Rules:
- render functions must stay inside component
- do not move render functions to presenter
- do not use `renderHeader`, `renderFooter`, `renderContent` as default decomposition pattern
- prefer regular JSX and separate local components

## 6. Styles rules

Use project style helpers and the mandatory `getStyles` template.

Template:

```ts
export const getStyles = (colors: IColors) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
    });

    return styles;
};
```

Rules:
- do not return `StyleSheet.create(...)` directly
- all non-zero size and spacing values must use a `scale*` function
- do not use raw non-zero numbers for margin, padding, width, height, top, bottom, left, right, gap, borderRadius and similar size values
- value `0` is allowed without scaling
- if a component already scales `size`, `width`, `height`, `radius`, do not scale it again outside

## 8. UIKit and text rules

UI rules for this project:
- use alias `@` for imports
- prefer UIKit components from `./src/UIKit/`
- use `Typography` from `./src/UIKit/Typography` instead of raw `Text` when possible
- do not add custom styles to `Typography` if variant props already solve the task
- use `NLTEmptyListView` or `EmptyListView` for empty states according to the local screen pattern

## 9. Localization rules

For screen texts:
- use `const { t } = useUiContext();`
- add localization keys instead of hardcoded user-facing strings when the screen already follows localization

## 10. FlatList rules

Rules:
- keep `keyExtractor` inside the component
- do not move `keyExtractor` to presenter
- add pull to refresh when list screen supports reload
- keep `renderItem` inside component only when required by FlatList API

## 11. Recommended implementation order

1. Define folder structure
2. Define entity and dto files if needed
3. Move shared types to `types/` and `enums/`
4. Implement presenter logic
5. Implement UI-calculation hook
6. Build dumb UI component
7. Add styles with scaling
8. Check localization
9. Check there are no inline arrow functions in JSX
10. Check render functions are used only where required

## 13. What must be avoided

Architecture violations:
- logic inside component
- shared exported types inside presenter
- shared exported types inside UI file
- inline arrow functions in JSX
- handlers created in component for UI events
- unnecessary render helpers
- calculations in component
- animations in component
- `switch case`
- raw non-zero size values in styles without `scale*`
- incorrect nesting with repeated `components` folders
