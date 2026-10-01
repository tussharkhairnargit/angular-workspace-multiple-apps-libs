In this code, a selector is the right choice because the totals are **derived from NgRx state**, not independent data. The list is the source of truth; item count, selected count, starred count, disabled count, and active count can all be calculated from it. Keeping those totals in the reducer would duplicate state and could let the numbers drift out of sync.

A useful decision rule:

- **Use a selector** when a value is calculated from store state, especially when it may be reused or has non-trivial calculation. That’s what `selectListStats` does in `list.selectors.ts`.
- **Use a selector** to give a component only the data it needs, such as `selectList` for the item list and `selectListStats` for its totals. The board consumes those through `store.select(...)` and `AsyncPipe`.
- **Keep it in the store as real state** when it is independently changed or persisted, rather than calculated. For example, a user-entered setting is state; a count of matching items is derived state.
- **Don’t put side effects in selectors.** They should just calculate and return values. Logging, API calls, and dispatching belong elsewhere.

NgRx memoizes `createSelector` results based on its input references. In your case, the reducer creates a new list when an item is toggled, so the stats selector recalculates. Mutating an item directly could keep the same list reference and leave memoized results stale, which is why the board now dispatches toggle actions in `item-board.ts`.

One separate note: `viewState()` is just one-off debug logging, not derived UI data. The immediate `subscribe(...).unsubscribe()` is an awkward fit there; use `take(1)` if you keep it, or remove the debug handler when it’s no longer needed.


## How selectores will work, real time execution ?

Selectors don’t poll the store. They run as part of NgRx’s state-update flow.

For example, when `toggleSelected` dispatches an action:

1. **The reducer handles the action.** It creates a new list and a new item object with the updated `selected` value.
2. **The store publishes the new state.**
3. **`selectList` reads the list** from that state. `selectListStats` uses it as its input.
4. **NgRx checks the input reference.** If the list is new, it recalculates the totals. If the list reference is unchanged, it reuses the previous result.
5. **The selected observable emits** the updated list or stats. `AsyncPipe` receives the emission and updates the `OnPush` component.

So, if one item changes from unselected to selected, `totalSelected` increments as part of that dispatch cycle. There’s no separate call to `getState()` and no timer involved.

The same flow happens for adding or removing items. An unrelated action that leaves the list reference unchanged won’t make the stats calculation run again.