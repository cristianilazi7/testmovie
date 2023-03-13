import Login from "./Login";
import { render } from "@testing-library/react";

describe('login component test',() => {
    it('render login component',() =>{
        render(<Login/>);
    });
}); 