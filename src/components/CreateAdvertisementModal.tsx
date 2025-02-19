import { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { isAdvertisementNameAvailable } from '../helpers/advertisements';

type Props = {
    open: boolean;
    onClose: () => void;
    onSave: (name: string, content: string, startDate: Date, endDate: Date) => void;
};

export default function NewAdModal({ open, onClose, onSave }: Props) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value);
    const handleStartDateChange = (value: Dayjs | null) => setStartDate(value);
    const handleEndDateChange = (value: Dayjs | null) => setEndDate(value);

    const handleSave = () => {
        if (name.length < 1) return alert('Brak nazwy');
        if (!isAdvertisementNameAvailable(name)) return alert('Nazwa jest juz uzywana');
        if (!startDate) return alert('Niepoprawna data rozpoczęcia');
        if (!endDate) return alert('Niepoprawna data zakończenia');
        if (startDate.isBefore(dayjs(), 'day')) return alert('Data rozpoczęcia nie moze być wcześniejsza niz dzisiaj');
        if (endDate.isBefore(startDate, 'day'))
            return alert('Data zakończenia nie moze być wcześniejsza niz data rozpoczęcia');

        onSave(name, content, startDate.toDate(), endDate.toDate());

        setName('');
        setContent('');
        setStartDate(dayjs());
        setEndDate(dayjs());
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Dodawanie nowej reklamy</DialogTitle>

                <DialogContent>
                    <Stack spacing={3}>
                        <TextField
                            value={name}
                            onChange={handleNameChange}
                            autoFocus
                            id="name"
                            label="Nazwa"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />

                        <TextField
                            value={content}
                            onChange={handleContentChange}
                            id="content"
                            label="Treść"
                            type="text"
                            multiline
                            maxRows={4}
                            fullWidth
                            inputProps={{ maxLength: 500 }}
                            variant="outlined"
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                            <DatePicker
                                label="Data rozpoczęcia"
                                value={startDate}
                                onChange={handleStartDateChange}
                                minDate={dayjs()}
                            />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                            <DatePicker
                                label="Data zakończenia"
                                value={endDate}
                                onChange={handleEndDateChange}
                                minDate={dayjs(startDate)}
                            />
                        </LocalizationProvider>
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Anuluj
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
