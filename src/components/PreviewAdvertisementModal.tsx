import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Advertisement from '../types/Advertisement';

type Props = {
    open: boolean;
    advertisement: Advertisement;
    onClose: () => void;
};

export default function PreviewAdvertisementModal({ open, advertisement, onClose }: Props) {
    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Podgląd reklamy</DialogTitle>

                <DialogContent>
                    <Stack spacing={3}>
                        <TextField
                            value={advertisement.name}
                            aria-readonly
                            id="name"
                            label="Nazwa"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            value={advertisement.content}
                            aria-readonly
                            id="content"
                            label="Treść"
                            type="text"
                            multiline
                            maxRows={4}
                            fullWidth
                            variant="outlined"
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                            <DatePicker label="Data rozpoczęcia" value={dayjs(advertisement.startDate)} readOnly />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                            <DatePicker label="Data zakończenia" value={dayjs(advertisement.endDate)} readOnly />
                        </LocalizationProvider>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
