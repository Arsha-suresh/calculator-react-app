
import { Box, Input, Stack } from '@mui/material';
import './App.css'
import ButtonComp from './Components/ButtonComp';
import { useState } from 'react';
import { evaluate } from 'mathjs';


function App() {

  const [input, SetInput] = useState<string>('');
  const [result, SetResult] = useState<number | string>(0);
  const [bracketStack, setBracketStack] = useState<string[]>([]);
  const reset = () => {
    SetInput('');
    SetResult(0);

  }
  const equalto = () => {
    try {
      SetResult(eval(input));
    }
    catch (e) {
      SetResult('Format Error');
    }
  }
  const brackletHandler = () => {
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ')'].includes(input.charAt(input.length - 1)) && bracketStack.length > 0) {
      const str = input + ')';
      SetInput(str);
      const dummy = [...bracketStack];
      dummy.pop();

      setBracketStack(dummy);
      console.log(bracketStack);

      return;
    }
    const str = input + '(';
    SetInput(str);
    setBracketStack([...bracketStack, '(']);
    console.log(bracketStack);


  }
  const printOperator = (val: string) => {
    if (val == 'X') {
      val = '*';
    }
    processInput(val.toString());
  }
  const printNumber = (val: number) => { processInput(val.toString()) };
  const printDot = () => { processInput('.') };
  const del = () => {
    const str = input.substring(0, input.length - 1);
    const result = evaluate(str.toString());
    SetResult(result);
    SetInput(str);


  }
  const operators = ['+', '-', 'X', '/', '*']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const InputChangeHandler = (e:any) => {
    try {
      console.log(e);
      if (e.code === "Backspace") {
        del();
        return;
      }
      console.log("process input value")
      const inputVal = e.key;
      processInput(inputVal);



    } catch (e) {
      console.log(e);
      SetResult("Format Error");
    }

  }
  const processInput = (inputVal: string) => {
    console.log("inputVal", inputVal);
    const str = input + inputVal;
    SetInput(str);
    if (!operators.includes(inputVal)) {

      const result = evaluate(str.toString());
      SetResult(result);
    }
  }
  return (
    <>
      <Box component="section" sx={{
        p: 2,
        alignItems: 'center', 
      }}>
        <h1>Calculator</h1>
        <div>
          <Input placeholder="Type in here…" value={input} onKeyUpCapture={(e) => InputChangeHandler(e)} />
          <div>{result}</div>
        </div>
        <Stack direction="row" spacing={2} marginTop={2}>
          <ButtonComp text='AC' clickHandler={reset} />
          <ButtonComp text='()' clickHandler={brackletHandler} />
          <ButtonComp text='%' clickHandler={() => printOperator('%')} />
          <ButtonComp text='/' clickHandler={() => printOperator('/')} />


        </Stack>
        <Stack direction="row" spacing={2} marginTop={2}>
          <ButtonComp text='7' clickHandler={() => printNumber(7)} />
          <ButtonComp text='8' clickHandler={() => printNumber(8)} />
          <ButtonComp text='9' clickHandler={() => printNumber(9)} />
          <ButtonComp text='X' clickHandler={() => printOperator('X')} />

        </Stack>
        <Stack direction="row" spacing={2} marginTop={2}>
          <ButtonComp text='4' clickHandler={() => printNumber(4)} />
          <ButtonComp text='5' clickHandler={() => printNumber(5)} />
          <ButtonComp text='6' clickHandler={() => printNumber(6)} />
          <ButtonComp text='-' clickHandler={() => printOperator('-')} />

        </Stack>
        <Stack direction="row" spacing={2} marginTop={2}>
          <ButtonComp text='1' clickHandler={() => printNumber(1)} />
          <ButtonComp text='2' clickHandler={() => printNumber(2)} />
          <ButtonComp text='3' clickHandler={() => printNumber(3)} />
          <ButtonComp text='+' clickHandler={() => printOperator('+')} />

        </Stack>

        <Stack direction="row" spacing={2} marginTop={2}>
          <ButtonComp text='0' clickHandler={() => printNumber(0)} />
          <ButtonComp text='.' clickHandler={() => printDot()} />
          <ButtonComp text='del' clickHandler={() => del()} />
          <ButtonComp text='=' clickHandler={() => equalto()} />

        </Stack>
      </Box>
    </>
  )
}

export default App
