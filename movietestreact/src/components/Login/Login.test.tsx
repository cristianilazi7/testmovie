import Login from "./Login";
import { render, screen, fireEvent } from "@testing-library/react";


describe('login component test',() => {


    it('render login component',() => {
        render(<Login />);
        const inputEmail = screen.getByTestId('EmailInput');
        expect(inputEmail).toBeInTheDocument();
    });

}); 