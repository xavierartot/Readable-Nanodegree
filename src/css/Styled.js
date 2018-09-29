import styled from 'styled-components'
import { palette, font } from './variables'

export const NavLi = styled.li`
`
export const NavLinkTop = styled.div`
    border-left: solid 1px ${palette.border};
    max-height: 56px;
    line-height: inherit;
    margin-left: 1.5em;
    overflow: hidden;
    padding-left: 0;
    li {
      border-left: solid 1px ${palette.border};
      line-height: 1;
      margin-left: 1em;
      padding-left: 1em;
      > a {
        border-bottom: 0;
        font-family: ${font.familyHeading};
        font-size: 0.7em;
        font-weight: 400;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: ${palette.fg};
      }
    }
    li:first-child {
      border-left: solid 0px;
      }
`
export const NavBrand = styled.div`
    padding: 0;
    margin: 0;
    background: transparent;
    letter-spacing: 0.25em;
    a {
      font-weight: ${font.weightHeadingBold};
      color: ${palette.fgBold};
      font-size: .7em !important;
      text-transform: uppercase;
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
