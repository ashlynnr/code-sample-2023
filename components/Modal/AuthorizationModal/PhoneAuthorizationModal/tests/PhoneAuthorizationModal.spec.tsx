import { cleanup, render, screen } from "@testing-library/react";

import { PhoneAuthorizationModal } from "..";
import { CONTINUE } from "Common/constants";
import { ENTER_PHONE_NUMBER, SECURE_YOUR_ACCOUNT } from "../../constants";

afterEach(cleanup);

const MOCK_LOGO_URL =
  "https://s3.amazonaws.com/public.xxx.com/assets/images/communitybank.png";

describe("Submission modal error component", () => {
  const Test = () => {
    return (
      <PhoneAuthorizationModal
        input={{ name: "verification_phone", value: "", setValue: () => {} }}
        open
        logo={MOCK_LOGO_URL}
        handleContinue={() => {}}
        isLoading={false}
      />
    );
  };

  it("Should render the modal", () => {
    render(<Test />);
    expect(screen.queryByText(ENTER_PHONE_NUMBER)).not.toBeNull();
    expect(screen.queryByText(SECURE_YOUR_ACCOUNT)).not.toBeNull();
    expect(screen.queryByText(CONTINUE)).not.toBeNull();
  });
});
