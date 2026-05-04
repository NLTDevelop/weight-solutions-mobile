# Skill: create-new-module

Goal:
Create new module for mobile application, for example Products

# Folder structure in module

Each module should follow this structure:

```text
src/                                # root folder
    entities/                       # folder with all domains (entities)
        Products/
            dto/
                product-list.dto.ts # dto for request
            IProduct.ts             # domain interface
            IProductsMeta.ts        # interface for list
            IProductsModel.ts       # domain model, use mobX, class for creating fields ```./src/repository/MobXRepository.ts```
            IProductsService.ts     # business logic and requests
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

Steps:

1) You need interface or request api for getting all fields for new entity
   - ask about it
2) Create ***entity***
    - create interface for entity
    - create model for entity
    - create service for entity, put business logic and requests
    - add dto folder
3) Create page, components and presenters
4) Rules for UI part
    - use base components from ./src/UIKit/
    - use alias @ for imports
    - use keyExtractor for FlatList in functions renderItem and keyExtractor
    - use NLTEmptyListView components for empty states
    - aad translate localization and use t for texts: const { t } = useUiContext();
    - aad pull to refresh in FlatList





