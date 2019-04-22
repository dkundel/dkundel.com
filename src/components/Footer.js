import { purple } from "anker-colors"
import React from "react"
import styled from "styled-components"
import Anchor from "./Anchor"

const Container = styled.footer`
  font-size: 0.8em;
  text-align: center;
  margin-top: 10px;
  svg {
    height: 2em;
    width: auto;
  }
`

const AnchorContainer = styled.p`
  margin-bottom: 0;
`

const Footer = () => (
  <Container>
    <AnchorContainer>
      <Anchor color={purple} />
    </AnchorContainer>
    <p>
      Made by{" "}
      <a
        href="https://github.com/dkundel/dkundel.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Dominik Kundel
      </a>{" "}
      with{" "}
      <a href="https://gatsbyjs.org" target="_blank" rel="noopener noreferrer">
        Gatsby
      </a>
    </p>
  </Container>
)

export default Footer
