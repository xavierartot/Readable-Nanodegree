import styled from 'styled-components'
import { palette, font } from './variables'

export const NavBrand = styled.div`
    padding: 0;
    margin: 0;
    background: transparent;
    font-family: ${font.familyHeading};
    letter-spacing: 0.25em;
    font-weight: ${font.weightHeadingBold};
    text-transform: uppercase;
    /*font-size: 0.4em !important;*/
    a {
      color: ${palette.fgBold};
      font-size: .7em !important;
    }
  `
export const HeaderNav = styled.div`
    background-color: ${palette.bg};
    border-bottom: solid 1px rgba(160, 160, 160, 0.3);
    height: 3.5em;
    left: 0;
    line-height: 3.5em;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10000;
`
