import { render, screen, cleanup } from "@testing-library/react";

import { AuthorizationModal } from "..";

afterEach(cleanup);

describe("Submission modal error component", () => {
  it("Should render the modal", () => {
    const content = <div>Content</div>;
    const actions = <div>Actions</div>;
    const header = <div>Header</div>;

    render(
      <AuthorizationModal
        open
        content={content}
        onClose={() => {}}
        actions={actions}
        header={header}
      />
    );

    expect(screen.queryByText("Content")).not.toBeNull();
    expect(screen.queryByText("Actions")).not.toBeNull();
    expect(screen.queryByText("Header")).not.toBeNull();
  });
});
