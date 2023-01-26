import { FC, ReactElement } from "react";
import { Modal } from "@material-ui/core";

import { GridBox, GridRow } from "components/Layout/Grid";
import { useAuthModalStyles } from "./styles";

type Props = {
  open: boolean;
  onClose: () => void;
  header: ReactElement;
  content: ReactElement;
  actions: ReactElement;
  error?: ReactElement;
};

export const AuthorizationModal: FC<Props> = ({
  open,
  onClose,
  header,
  content,
  actions,
  error,
}) => {
  const classes = useAuthModalStyles();

  return (
    <Modal
      disableEscapeKeyDown
      disableBackdropClick
      disableScrollLock
      onClose={onClose}
      open={open}
    >
      <GridRow className={classes.container} container>
        <GridBox className={classes.box} border="0">
          {header}
          <div className={classes.contentContainer}>{content}</div>
          {actions}
          {error && <div className={classes.errorContainer}>{error}</div>}
        </GridBox>
      </GridRow>
    </Modal>
  );
};
