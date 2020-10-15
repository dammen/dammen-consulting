import React, { FunctionComponent } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

interface Props {}
export const Layout: FunctionComponent<Props> = (props) => {

    return (
      <div>
        <NavMenu />
        <Container>
          {props.children}
        </Container>
      </div>
    );
}
