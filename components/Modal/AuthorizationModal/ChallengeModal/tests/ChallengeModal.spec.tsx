import { render, screen, cleanup } from "@testing-library/react";
import { VERIFY_YOUR_IDENTITY, CODE_VALID_TIME } from "../../constants";

import { ChallengeModal } from "../ChallengeModal";

afterEach(cleanup);

const EMPTY_FUNC = () => {};
const MOCK_PHONE_NUMBER = "+1 XXXX 2699";
const MOCK_LOGO_URL =
  "https://s3.amazonaws.com/public.xxx.com/assets/images/communitybank.png";

describe("Challenge MFA modal error component", () => {
  it("Should render the modal", () => {
    render(
      <ChallengeModal
        open
        handleContinue={EMPTY_FUNC}
        onClose={EMPTY_FUNC}
        handleResend={EMPTY_FUNC}
        onEditPhoneNumber={EMPTY_FUNC}
        maskedPhoneNumber={MOCK_PHONE_NUMBER}
        logoUrl={MOCK_LOGO_URL}
        comesFromEnrollment={false}
        setMFACode={() => {}}
        isLoading={false}
      />
    );
    expect(screen.queryByText(VERIFY_YOUR_IDENTITY)).not.toBeNull();
    expect(screen.queryByText(CODE_VALID_TIME)).not.toBeNull();
  });
});
