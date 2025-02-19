import { ChangeEvent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pl';
import { createAdvertisement, isAdvertisementNameAvailable } from '../helpers/advertisements';

export default function CreateAdvertisementPage() {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    const [redirectToPanel, setRedirectToPanel] = useState(false);

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

        createAdvertisement(name, content, startDate.toDate(), endDate.toDate());

        setRedirectToPanel(true);

        setName('');
        setContent('');
        setStartDate(dayjs());
        setEndDate(dayjs());
    };

    if (redirectToPanel) return <Redirect to="/advertisements" />;

    return (
        <section className="w-screen h-screen flex justify-center items-center">
            <form className="flex flex-col max-w-[300px] w-full gap-5">
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

                <div className="w-full flex flex-col gap-5 justify-center mt-10">
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Dodaj
                    </Button>
                    <Button component={Link} to="/advertisements" variant="contained">
                        Wróć do panelu
                    </Button>
                </div>
            </form>
        </section>
    );
}
