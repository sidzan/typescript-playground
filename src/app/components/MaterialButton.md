Default Button is primary
```
  <MaterialButton>
    Primary
  </MaterialButton>
```

Secondary Button
```
  <MaterialButton type="secondary">
    Secondary
  </MaterialButton>
```

Disabled Button
```
  <MaterialButton disabled={true}>
    Disabled
  </MaterialButton>
```

Styled Button
```
  const style = {
    border: 0,
    borderRadius: 5,
    backgroundColor: Constants.Color.BLACK,
    color: Constants.Color.BLUE
  };
  <MaterialButton style={style}>
    Styled
  </MaterialButton>
```

No Ripple Effect
```
  <MaterialButton disableRipple>
    No Ripple Effect
  </MaterialButton>
```


