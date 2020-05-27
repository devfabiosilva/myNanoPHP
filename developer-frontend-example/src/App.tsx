import React from 'react';
import Routes from './route';
/*
//dom 24 mai 2020 15:28
export interface myProps {
  name: string;
  priority?: boolean;
}

//https://www.typescriptlang.org/docs/handbook/variable-declarations.html
const PrintName: React.FC<myProps> = (props) =>
{
  return (
    <div>
       <p style={{ fontWeight: props.priority ? "bold" : "normal" }}>{props.name}</p>
    </div>
  );
}

function PrintName2(props: myProps) {
  return (
    <div>
       <p style={{ fontWeight: props.priority ? "bold" : "normal" }}>{props.name}</p>
    </div>
  );
}
*/
export default function App() {
  return (
    <Routes />
  );
}


