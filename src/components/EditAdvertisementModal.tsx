import { ChangeEvent, useEffect, useState } from 'react';
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
import Advertisement from '../types/Advertisement';
import { isAdvertisementNameAvailable } from '../helpers/advertisements';

type Props = {
    open: boolean;
    advertisement: Advertisement;
    onClose: () => void;
    onSave: (advertisement: Advertisement) => void;
};

export default function EditAdvertisementModal({ open, advertisement, onClose, onSave }: Props) {
    const [name, setName] = useState(advertisement.name);
    const [content, setContent] = useState(advertisement.content);
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(advertisement.startDate));
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(advertisement.endDate));

    useEffect(() => {
        setName(advertisement.name);
        setContent(advertisement.content);
        setStartDate(dayjs(advertisement.startDate));
        setEndDate(dayjs(advertisement.endDate));
    }, [advertisement]);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value);
    const handleStartDateChange = (value: Dayjs | null) => setStartDate(value);
    const handleEndDateChange = (value: Dayjs | null) => setEndDate(value);

    const handleSave = () => {
        if (name.length < 1) return alert('Brak nazwy');
        if (!isAdvertisementNameAvailable(name, advertisement.id)) return alert('Nazwa jest juz uzywana');
        if (!startDate) return alert('Niepoprawna data rozpoczęcia');
        if (!endDate) return alert('Niepoprawna data zakończenia');
        if (startDate.isBefore(dayjs(), 'day')) return alert('Data rozpoczęcia nie moze być wcześniejsza niz dzisiaj');
        if (endDate.isBefore(startDate, 'day'))
            return alert('Data zakończenia nie moze być wcześniejsza niz data rozpoczęcia');

        onSave({ id: advertisement.id, name, content, startDate: startDate.toDate(), endDate: endDate.toDate() });

        setName('');
        setContent('');
        setStartDate(dayjs());
        setEndDate(dayjs());
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
                <DialogTitle id="form-dialog-title">Edycja reklamy</DialogTitle>

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
                        Zapisz
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
