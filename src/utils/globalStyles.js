import { secondaryGreenShades } from "anker-colors"
import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  html {
    height: 100%;
    width: 100%;
    min-height: 100vh;
  }

  body, #___gatsby {
    height: 100%;
    width: 100%;
  }

  a {
    color: ${secondaryGreenShades["500"]};
    text-decoration: none;
    &:hover, &:focus {
      color: ${secondaryGreenShades["900"]};
      text-decoration: underline;
    }
  }
`
