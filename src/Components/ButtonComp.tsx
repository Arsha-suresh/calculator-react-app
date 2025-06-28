import * as React from 'react';
import Button from '@mui/material/Button';

interface ButtonProp extends React.PropsWithChildren{
    text:string;
    clickHandler:(data?:string |undefined)=>void;

}

function ButtonComp({text, clickHandler}:ButtonProp) {
  return (
    <Button variant='contained' onClick={()=>clickHandler()}> {text}</Button>
    
  )
}

export default ButtonComp