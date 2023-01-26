import { cleanup, render, screen } from "@testing-library/react";

import { ModalContext } from "context";

import { PhoneAuthorizationForm } from "../PhoneAuthorizationForm";
import { CONTINUE } from "Common/constants";
import {
  ENTER_PHONE_NUMBER,
  SECURE_YOUR_ACCOUNT,
} from "Common/Modal/AuthorizationModal/constants";

afterEach(cleanup);

describe("Phone Authorization Form Renders", () => {
  const Test = () => {
    return (
      <ModalContext.Provider
        value={{
          setModalContext: () => {},
          recoveryCodeModalOpen: false,
          phoneModalOpen: true,
          challengeModalOpen: false,
        }}
      >
        <PhoneAuthorizationForm />
      </ModalContext.Provider>
    );
  };

  it("Should render the modal", () => {
    render(<Test />);
    expect(screen.queryByText(ENTER_PHONE_NUMBER)).not.toBeNull();
    expect(screen.queryByText(SECURE_YOUR_ACCOUNT)).not.toBeNull();
    expect(screen.queryByText(CONTINUE)).not.toBeNull();
  });
});
