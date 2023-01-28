import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { FC, useState } from "react";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  content: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  title,
  content,
  onCancel,
  onConfirm,
}) => {
  // const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCancel}>
            No
          </Button>
          <Button onClick={onConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
