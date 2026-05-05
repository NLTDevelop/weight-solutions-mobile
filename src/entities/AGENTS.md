# AGENTS.md

## Scope

These rules apply to everything inside `src/entities`.

This folder contains domain-level data structures and data access code.
Entities must stay UI-independent and must not contain screen behavior.

If existing legacy entity code conflicts with these rules, all new code and refactoring should follow this file.

---

## 1. Folder structure

Each entity should follow this structure:

```text
src/entities/
    Product/
        dto/
            product-create.dto.ts
            product-list.dto.ts
            product-update.dto.ts
        IProduct.ts
        IProductMeta.ts
        ProductModel.ts
        ProductService.ts
```

**Required:**
- one folder per entity
- dto files inside `dto/`
- entity interfaces in separate `I*.ts` files
- model in `<Entity>Model.ts`
- service in `<Entity>Service.ts`

**Allowed:**
- importing shared entity interfaces from neighbor entity folders when domain relation requires that

**Forbidden:**
- placing presenter logic inside entities
- placing UI components or styles inside entities
- deep unnecessary nesting beyond entity folder and `dto/`

---

## 2. Responsibility split

### Interface files

Interface files such as `IProduct.ts`, `IOrder.ts`, `IUserMeta.ts` are for data shape only.

**Required:**
- keep them as plain interfaces or types
- describe server/domain data structure only

**Forbidden:**
- functions
- calculations
- formatting logic
- UI-related fields added only for rendering convenience

### DTO files

DTO files are request payload/query shape definitions.

**Required:**
- keep request params and request body types in `dto/`
- use file names like `product-create.dto.ts`, `product-list.dto.ts`, `product-update.dto.ts`
- export one clearly named dto per file

**Forbidden:**
- response mapping logic in dto files
- business logic in dto files

### Models

Models are data containers only.

**Required:**
- keep entity state in model
- use repository-backed getters and setters
- expose clear state reset method when needed

**Allowed:**
- `clear`
- pagination append method with exact name `appened`

**Forbidden:**
- business logic
- request logic
- navigation logic
- handlers
- formatting
- validation scenarios
- custom business methods beyond state container needs

### Services

Services are responsible for requests and writing response data to models.

**Required:**
- all network requests must stay in service
- service may update related model after successful response
- service methods must return typed `IResponse<...>`
- keep error handling inside service

**Forbidden:**
- screen logic
- navigation
- UI text
- theme access
- component event handlers

---

## 3. Naming rules

**Required:**
- entity interfaces must use `I` prefix
- meta interfaces must use `I` prefix
- model interface must use `I<Entity>Model`
- dto names must describe the operation, for example `ProductCreateDto`
- service instance name must be camelCase, for example `productService`
- model instance name must be camelCase, for example `productModel`

**Preferred:**
- singular entity folder for single-object domain like `Product`, `Order`, `Company`, `User`
- if legacy plural folder already exists, keep consistency inside that folder instead of mixing styles

---

## 4. Model style rules

Use models as MobX-backed state containers.

**Required:**
- keep private repositories inside the model
- expose data through public getters and setters
- initialize repository values explicitly
- keep return values predictable, for example `[]` instead of nullable array when that is the chosen model contract

**Preferred pattern:**
```ts
export interface IProductModel {
    products: IProduct[];
    current: IProduct | null;
    meta: IProductMeta | null;
}

class ProductModel implements IProductModel {
    private productsRepository = new MobXRepository<IProduct[]>([]);

    public get products() {
        return this.productsRepository.data || [];
    }

    public set products(products: IProduct[]) {
        this.productsRepository.save(products);
    }
}
```

**Forbidden:**
- storing derived UI flags in model
- mutating model state directly from presenters
- mixing request execution code into model

**Important:**
- top-level root `AGENTS.md` says the only allowed pagination append method name is `appened`
- existing entity code currently contains `append`
- for new code and refactoring in this area, use `appened`

---

## 5. Service style rules

Services should encapsulate request configuration and response persistence.

**Required:**
- inject requester and links through constructor
- create exported singleton instance at file bottom
- keep local response interfaces near the top of the service file if they are used only there
- use alias imports like `@/...` for shared app modules

**Preferred pattern:**
```ts
interface IProductResponse {
    data: IProduct;
}

class ProductService {
    constructor(
        private requester: IRequester,
        private links: ILinks,
    ) { }
}
```

**Allowed:**
- local response interfaces inside service file when they are not shared outside
- writing response data to current entity model
- reading another entity service only when domain flow really requires it

**Forbidden:**
- presenter-like orchestration
- screen-specific conditions
- transforming data into UI item shape

---

## 6. Branching and logic rules

**Required:**
- use `if / else`

**Forbidden:**
- `switch case`

**Required:**
- keep logic linear and explicit
- keep service conditions limited to request/result flow

---

## 7. Types location rules

**Required:**
- shared entity interfaces must live in standalone files
- shared exported types must not be hidden inside model or service files
- local service-only response interfaces may stay inside service file

**Forbidden:**
- mixing reusable shared entity types with request logic in the same file
- exporting shared domain types from service files

---

## 8. Import rules

**Required:**
- use alias `@` for app-level imports
- use relative imports for same-entity neighbor files when it keeps the file short and readable

**Preferred examples:**
- `@/libs/requester`
- `@/repository/MobXRepository`
- `./IProduct`
- `./dto/product-create.dto`

---

## 9. What entities must not know

Entities must not know anything about:
- `useUiContext`
- colors
- styles
- translation `t`
- screen navigation concerns
- component props
- render functions
- `FlatList`
- UI formatting for display

If a value is needed only for display, prepare it in module presenters or `use...Ui` hooks, not in `src/entities`.

---

## 10. Recommended creation order

When adding a new entity:

1. Create entity folder
2. Create core interfaces
3. Create dto files
4. Create model as state container only
5. Create service with typed responses
6. Connect successful responses to model updates
7. Verify no UI logic leaked into entity layer

---

## 11. Violations

Architecture violations in `src/entities` include:
- UI logic in entity files
- business scenarios implemented in model methods
- request execution inside model
- shared entity types declared inside service without reason
- `switch case`
- presenter handlers inside service or model
- data formatted for UI inside entity layer
