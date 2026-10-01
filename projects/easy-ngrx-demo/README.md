# Application Setup

## UI Library - Angular Material

``` ng add @angular/material ```

## NGRX manual setup
Note: v21 compatible with this application @angular/core module.

### Packages Installations

#### Required Packages
```
npm install @ngrx/store@21 
npm install @ngrx/store-devtools@21
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),

ng add @ngrx/schematics
```ng add @ngrx/store-devtools


#### Optional, while needed specifically, for example - API calling
@ngrx/effects@21  

### Register the Global Store

 use `provideStore()` to register your global store.
 To register store add it into `app.config.ts`

```
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducer } from './store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(appReducer),
    provideStoreDevtools({ maxAge: 25, logOnly:isDevMode() })
  ],
};
```

Folder Structure --
app
|---store
|---actions
|---reducers

important APIs from Store package -
```import { ActionReducerMap, createAction, createActionGroup, createReducer, on, props} from '@ngrx/store';```

### Create reducer  ```ng generate reducer list --group```

* To define reducer 'createReducer()` function is used.

### Create action ```ng generate create list --group```

* To define action `crateAction()` function is used.
    example: const AddItemAction = createAction('[LIST ]ADD_ITEM', props<{ payload: ItemModel }>());

* Related actions can be group together using `createActionGroup()` instead of defining indipendaant action using `createAction()`.  
  