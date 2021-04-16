export const trmrkCssClasses = {
  item: {
    selected: "trmrk-selected",
    current: "trmrk-current",
  },
  toggle: {
    base: "trmrk-toggle",
    collapsed: "trmrk-toggle-collapsed",
    expanded: "trmrk-toggle-expanded",
  },
  validation: {
    inputDomElError: "trmrk-input-error",
    errorDomEl: "trmrk-validation-error",
  },
  bootstrap: {
    row: "trmrk-btstrp-row",
    col: "trmrk-btstrp-col",
    formGroup: "trmrk-btstrp-form-group",
    label: "trmrk-btstrp-label",
    input: "trmrk-btstrp-input",
    modal: "trmrk-app-modal",
  },
};

export const getCssClass = (classes: (string | null | undefined)[]) => {
  const cssClass = classes
    .filter((cls) => typeof cls === "string" && cls.length > 0)
    .join(" ");

  return cssClass;
};
