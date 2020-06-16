/*
 Custom notification using React Spring (https://www.react-spring.io/)
 Many thanks to https://codesandbox.io/embed/7mqy09jyq for amazing example
 Adapted in TypeScript and React Redux by me
*/
import styled from 'styled-components';
import { animated } from 'react-spring';
import { NOTIFY_TYPE } from '../../utils';

export const Container = styled<any>('div')`
  background-color: transparent;
  position: fixed;
  z-index: 5;
  width: 0 auto;
  top: ${props => (props.top ? '30px' : 'unset')};
  bottom: ${props => (props.top ? 'unset' : '30px')};
  margin: 0 auto;
  left: 30px;
  right: 30px;
  display: flex;
  flex-direction: ${props => (props.top ? 'column-reverse' : 'column')};
  pointer-events: none;
  align-items: ${props => (props.position === 'center' ? 'center' : `flex-${props.position || 'end'}`)};
`;
//  display: ${props => (props.key)?"block":"none"};
export const Message = styled(animated.div)`
  position: relative;
  overflow: hidden;
  width: 60ch;
  @media (max-width: 680px) {
    width: 100%;
  }
`;

export const Content = styled<any>('div')`
  color: white;
  /*background: #445159; */
  background-color: ${props => (props.notf === NOTIFY_TYPE.NOTIFY_TYPE_ALERT)?"var(--notification-background-alert)":(props.notf === NOTIFY_TYPE.NOTIFY_TYPE_ERROR)?"var(--notification-background-error)":"var(--notification-background)"};
  color: var(--color);
  opacity: 0.9;
  padding: 12px 22px;
  font-size: 1em;
  display: grid;
  grid-template-columns: ${props => (props.canClose === false ? '1fr' : '1fr auto')};
  grid-gap: 10px;
  overflow: hidden;
  height: 160px;
  border-radius: 3px;
  margin-top: ${props => (props.top ? '0' : '10px')};
  margin-bottom: ${props => (props.top ? '10px' : '0')};
`;

