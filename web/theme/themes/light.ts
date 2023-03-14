import _ from "lodash";

import { commonTheme } from "../common";

export default _.merge({}, commonTheme, {
  name: "light",
  colors: {
    background: "#FFFFFF",
    // buttons
    primary: "#26B0DC",
    disabled: commonTheme.colors.gray[7],
    off: commonTheme.colors.gray[7],
    // common
    strongest: commonTheme.colors.gray[12],
    main: commonTheme.colors.gray[10],
    weak: commonTheme.colors.gray[8],
    weakest: commonTheme.colors.gray[7],
  },
  fontColors: {
    // buttons
    primary: commonTheme.colors.gray[2],
    disabled: commonTheme.colors.gray[2],
    off: commonTheme.colors.gray[2],
  },
});
