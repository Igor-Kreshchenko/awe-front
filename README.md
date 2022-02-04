# Client

Online Banking App created with React and Redux.

## Project structure

Follow [Ducks project structure](https://github.com/erikras/ducks-modular-redux)

### Component folder structure

Contains:

/components - used only for this component

/sagas - for component sagas

### Slice file rules

1. MUST export default a function called reducer()
2. MUST export its action creators as functions
3. MUST have action types in the form reducer/ACTION_TYPE
4. MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library

Example:

```
// widgets.js

// Actions
const LOAD   = 'widgets/LOAD';
const CREATE = 'widgets/CREATE';
const UPDATE = 'widgets/UPDATE';
const REMOVE = 'widgets/REMOVE';

// Reducer
export default function reducer(state = {}, action = {}) {
switch (action.type) {
// do reducer stuff
default: return state;
}
}

// Action Creators
export function loadWidgets() {
return { type: LOAD };
}

export function createWidget(widget) {
return { type: CREATE, widget };
}

export function updateWidget(widget) {
return { type: UPDATE, widget };
}

export function removeWidget(widget) {
return { type: REMOVE, widget };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export function getWidget () {
return dispatch => get('/widget').then(widget => dispatch(updateWidget(widget)))
}
```


