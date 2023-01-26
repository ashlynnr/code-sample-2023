import { cleanup, render, screen } from "@testing-library/react";

import { ModalContext } from "context";
import {
  COPY_CODE,
  RECORDED_CONFIRMATION,
  CONTINUE,
} from "Common/Modal/AuthorizationModal/constants";

import { RecoveryCodeForm } from "../RecoveryCodeForm";

afterEach(cleanup);

describe("Recovery Cody Form Renders", () => {
  const Test = () => {
    return (
      <ModalContext.Provider
        value={{
          setModalContext: () => {},
          recoveryCodeModalOpen: true,
          phoneModalOpen: false,
          challengeModalOpen: false,
        }}
      >
        <RecoveryCodeForm />
      </ModalContext.Provider>
    );
  };

  it("Should render the modal", () => {
    render(<Test />);
    expect(screen.queryByText(CONTINUE)).not.toBeNull();
    expect(screen.queryByText(RECORDED_CONFIRMATION)).not.toBeNull();
    expect(screen.queryByText(COPY_CODE)).not.toBeNull();
  });
});
