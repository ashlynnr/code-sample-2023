import { cleanup, render, screen } from "@testing-library/react";
import { Form } from "react-final-form";

import { ModalContext } from "context/Modal";

import { RecoveryCodeModal } from "../RecoveryCodeModal";
import { CONTINUE } from "Common/constants";
import {
  COPY_CODE,
  COPY_THIS_CODE,
  RECORDED_CONFIRMATION,
} from "../../constants";

afterEach(cleanup);

const MOCK_LOGO_URL =
  "https://s3.amazonaws.com/public.xxx.com/assets/images/communitybank.png";

describe("Recovery Code modal error component", () => {
  it("Should render the modal", () => {
    render(
      <ModalContext.Provider
        value={{
          setModalContext: () => {},
          recoveryCodeModalOpen: true,
          phoneModalOpen: false,
          challengeModalOpen: false,
        }}
      >
        <Form initialValues={{}} onSubmit={() => {}} subscription={{}}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <RecoveryCodeModal
                open
                handleContinue={() => {}}
                onClose={() => {}}
                logoUrl={MOCK_LOGO_URL}
                recoveryCode="AHK212KSIFDH123KSU2BN42ISNDO"
                checked={false}
                setChecked={() => {}}
              />
            </form>
          )}
        </Form>
      </ModalContext.Provider>
    );
    expect(screen.queryByText(COPY_THIS_CODE)).not.toBeNull();
    expect(screen.queryByText(CONTINUE)).not.toBeNull();
    expect(screen.queryByText(RECORDED_CONFIRMATION)).not.toBeNull();
    expect(screen.queryByText(COPY_CODE)).not.toBeNull();
  });
});
