import { cleanup, render, screen } from "@testing-library/react";

import { ModalContext } from "context";

import { ChallengeForm } from "../ChallengeForm";
import { CONTINUE, RESEND } from "Common/constants";
import { DID_NOT_RECEIVE_CODE } from "Common/Modal/AuthorizationModal/constants";

afterEach(cleanup);

describe("Challenge Form Renders", () => {
  const Test = () => {
    return (
      <ModalContext.Provider
        value={{
          setModalContext: () => {},
          recoveryCodeModalOpen: false,
          phoneModalOpen: false,
          challengeModalOpen: true,
        }}
      >
        <ChallengeForm getLoginInformation={() => {}} />
      </ModalContext.Provider>
    );
  };

  it("Should render the modal", () => {
    render(<Test />);
    expect(screen.queryByText(CONTINUE)).not.toBeNull();
    expect(screen.queryByText(DID_NOT_RECEIVE_CODE)).not.toBeNull();
    expect(screen.queryByText(RESEND)).not.toBeNull();
  });
});
